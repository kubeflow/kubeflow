"""Script to build and update the Jupyter WebApp image.

Requires python3

hub CLI depends on an OAuth token with repo permissions:
https://hub.github.com/hub.1.html
  * It will look for environment variable GITHUB_TOKEN
"""

import logging
import os
import re
import tempfile
import yaml

import fire
import git
import httplib2

from kubeflow.testing import util # pylint: disable=no-name-in-module

from containerregistry.client import docker_creds
from containerregistry.client import docker_name
from containerregistry.client.v2_2 import docker_http
from containerregistry.client.v2_2 import docker_image as v2_2_image
from containerregistry.transport import transport_pool

class WebAppUpdater(object): # pylint: disable=useless-object-inheritance
  def __init__(self):
    self._last_commit = None

  def build_image(self, build_project, registry_project):
    """Build the image.

    Args:
      build_project: GCP project used to build the image.
      registry_project: GCP project used to host the image.
    """
    env = dict()
    env.update(os.environ)
    env["PROJECT"] = build_project
    env["REGISTRY_PROJECT"] = registry_project

    with tempfile.NamedTemporaryFile() as hf:
      name = hf.name
    env["OUTPUT"] = name
    web_dir = self._component_dir()
    util.run(["make", "build-gcb"], env=env, cwd=web_dir)

    with open(name) as hf:
      data = yaml.load(hf)

    return data["image"]

  def update_prototype(self, image):
    values = {"image": image}

    regexps = {}
    for param, value in values.items():
      r = re.compile(r"([ \t]*" + param + ":+ ?\"?)[^\",]+(\"?,?)")
      v = r"\g<1>" + value + r"\2"
      regexps[param] = (r, v, value)

    prototype_file = os.path.join(self._root_dir(),
                                  "kubeflow/jupyter/prototypes",
                                  "jupyter-web-app.jsonnet")
    with open(prototype_file) as f:
      prototype = f.read().split("\n")
    replacements = 0
    for i, line in enumerate(prototype):
      for param, _ in regexps.items():
        if param not in line:
          continue
        if line.startswith("//"):
          prototype[i] = re.sub(
            r"(// @\w+ )" + param + r"( \w+ )[^ ]+(.*)",  # noqa: W605
            r"\g<1>" + param + r"\2" + regexps[param][2] + r"\3",
            line)
          replacements += 1
          continue
        prototype[i] = re.sub(regexps[param][0], regexps[param][1], line)
        if line != prototype[i]:
          replacements += 1
    if replacements == 0:
      raise Exception(
          "No replacements made, are you sure you specified correct param?")
    if replacements < len(regexps):
      raise Warning("Made less replacements then number of params. Typo?")
    temp_file = prototype_file + ".tmp"
    with open(temp_file, "w") as w:
      w.write("\n".join(prototype))
    os.rename(temp_file, prototype_file)
    logging.info("Successfully made %d replacements", replacements)

    return prototype_file

  @property
  def last_commit(self):
    """Get the last commit of a change to the source for the jupyter-web-app."""
    if not self._last_commit:
      # Get the hash of the last commit to modify the source for the Jupyter web
      # app image
      self._last_commit = util.run(["git", "log", "-n", "1", "--pretty=format:\"%h\"",
                                    "components/jupyter-web-app"],
                                   cwd=self._root_dir()).strip("\"")

    return self._last_commit

  def _find_remote_repo(self, repo, remote_url): # pylint: disable=no-self-use
    """Find the remote repo if it has already been added.

    Args:
      repo: The git python repo object.
      remote_url: The URL of the remote repo e.g.
        git@github.com:jlewi/kubeflow.git

    Returns:
      remote: git-python object representing the remote repo or none if it
        isn't present.
    """
    for r in repo.remotes:
      for u in r.urls:
        if remote_url == u:
          return r

    return None

  def all(self, build_project, registry_project, remote_fork,
          add_github_host=False): # pylint: disable=too-many-statements,too-many-branches
    """Build the latest image and update the prototype.

    Args:
      build_project: GCP project used to build the image.
      registry_project: GCP project used to host the image.
      remote_fork: Url of the remote fork.
        The remote fork used to create the PR;
         e.g. git@github.com:jlewi/kubeflow.git. currently only ssh is
         supported.
      add_github_host: If true will add the github ssh host to known ssh hosts.
    """
    repo = git.Repo(self._root_dir())
    util.maybe_activate_service_account()
    last_commit = self.last_commit

    # Ensure github.com is in the known hosts
    if add_github_host:
      output = util.run(["ssh-keyscan", "github.com"])
      with open(os.path.join(os.getenv("HOME"), ".ssh", "known_hosts"),
                mode='a') as hf:
        hf.write(output)

    if not remote_fork.startswith("git@github.com"):
      raise ValueError("Remote fork currently only supports ssh")

    remote_repo = self._find_remote_repo(repo, remote_fork)

    if not remote_repo:
      fork_name = remote_fork.split(":", 1)[-1].split("/", 1)[0]
      logging.info("Adding remote %s=%s", fork_name, remote_fork)
      remote_repo = repo.create_remote(fork_name, remote_fork)

    logging.info("Last change to components-jupyter-web-app was %s", last_commit)

    base = "gcr.io/{0}/jupyter-web-app".format(registry_project)

    # Check if there is already an image tagged with this commit.
    image = base + ":" + self.last_commit
    transport = transport_pool.Http(httplib2.Http)
    src = docker_name.from_string(image)
    creds = docker_creds.DefaultKeychain.Resolve(src)

    image_exists = False
    try:
      with v2_2_image.FromRegistry(src, creds, transport) as src_image:
        logging.info("Image %s exists; digest: %s", image,
                     src_image.digest())
        image_exists = True
    except docker_http.V2DiagnosticException as e:
      if e.status == 404:
        logging.info("%s doesn't exist", image)
      else:
        raise

    if not image_exists:
      logging.info("Building the image")
      image = self.build_image(build_project, registry_project)
    else:
      logging.info("Image %s already exists", image)

    # TODO(jlewi):We should check what the current image and not update it
    # if its the existing image
    prototype_file = self.update_prototype(image)

    branch_name = "update_jupyter_{0}".format(last_commit)

    if repo.active_branch.name != branch_name:
      logging.info("Creating branch %s", branch_name)
      util.run(["git", "checkout", "-b", branch_name], cwd=self._root_dir())

    logging.info("Add file %s to repo", prototype_file)
    repo.index.add([prototype_file])
    repo.index.commit("Update the jupyter web app image to {0}".format(image))

    util.run(["git", "push", "-f", remote_repo.name], cwd=self._root_dir())

    self.create_pull_request(commit=last_commit)

  def create_pull_request(self, base="kubeflow:master", commit=None):
    """Create a pull request.

    Args:
      base: The base to use. Defaults to "kubeflow:master". This should be
        in the form <GitHub OWNER>:<branch>
    """
    # TODO(jlewi): Modeled on
    # https://github.com/kubeflow/examples/blob/master/code_search/docker/ks/update_index.sh
    # TODO(jlewi): We should use the GitHub API and check if there is an
    # existing open pull request. Or potentially just use the hub CLI.

    if not commit:
      commit = self.last_commit
      logging.info("No commit specified defaulting to %s", commit)

    pr_title = "Update the jupyter-web-app image to {0}".format(commit)

    # See hub conventions:
    # https://hub.github.com/hub.1.html
    # The GitHub repository is determined automatically based on the name
    # of remote repositories
    output = util.run(["hub", "pr", "list", "--format=%U;%t\n"],
                      cwd=self._root_dir())


    lines = output.splitlines()

    prs = {}
    for l in lines:
      n, t = l.split(";", 1)
      prs[t] = n

    if pr_title in prs:
      logging.info("PR %s already exists to update the Jupyter web app image "
                   "to %s", prs[pr_title], commit)

    with tempfile.NamedTemporaryFile(delete=False) as hf:
      hf.write(pr_title.encode())
      message_file = hf.name

    # TODO(jlewi): -f creates the pull requests even if there are local changes
    # this was useful during development but we may want to drop it.
    util.run(["hub", "pull-request", "-f", "--base=" + base, "-F",
              message_file],
              cwd=self._root_dir())

  def _root_dir(self):
    this_dir = os.path.dirname(__file__)
    return os.path.abspath(os.path.join(this_dir, "..", "..", "..", ".."))

  def _component_dir(self):
    return os.path.join(self._root_dir(), "components", "jupyter-web-app")

if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  fire.Fire(WebAppUpdater)
