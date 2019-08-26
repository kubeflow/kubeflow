"""Script to build and update the Jupyter WebApp image.

Requires python3

hub CLI depends on an OAuth token with repo permissions:
https://hub.github.com/hub.1.html
  * It will look for environment variable GITHUB_TOKEN
"""

import logging
import os
import tempfile
import yaml

import fire
import git
import httplib2

from kubeflow.kubeflow.ci import application_util
from kubeflow.testing import util # pylint: disable=no-name-in-module

from containerregistry.client import docker_creds
from containerregistry.client import docker_name
from containerregistry.client.v2_2 import docker_http
from containerregistry.client.v2_2 import docker_image as v2_2_image
from containerregistry.transport import transport_pool

# The image name as defined in the kustomization file
JUPYTER_WEB_APP_IMAGE_NAME = "gcr.io/kubeflow-images-public/jupyter-web-app"

class WebAppUpdater(object): # pylint: disable=useless-object-inheritance
  def __init__(self):
    self._last_commit = None
    self.manifests_repo_dir = None

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
    env["GIT_TAG"] = self._last_commit

    with tempfile.NamedTemporaryFile() as hf:
      name = hf.name
    env["OUTPUT"] = name
    web_dir = self._component_dir()
    util.run(["make", "build-gcb"], env=env, cwd=web_dir)

    # TODO(jlewi): We want to get the actual image produced by GCB. Right
    # now this is a bit brittle because we have multiple layers of substitution
    # e.g. in the Makefile and then the GCB YAML.
    # It might be better to parse the stdout of make-build-gcb to get the
    # GCB job name and then fetch the GCB info specifying the images.
    with open(name) as hf:
      data = yaml.load(hf)

    return data["image"]

  @property
  def last_commit(self):
    """Get the last commit of a change to the source for the jupyter-web-app."""
    if not self._last_commit:
      # Get the hash of the last commit to modify the source for the Jupyter web
      # app image
      self._last_commit = util.run(["git", "log", "-n", "1",
                                    "--pretty=format:\"%h\"",
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

  def all(self, build_project, registry_project, remote_fork, # pylint: disable=too-many-statements,too-many-branches
          kustomize_file, add_github_host=False):
    """Build the latest image and update the prototype.

    Args:
      build_project: GCP project used to build the image.
      registry_project: GCP project used to host the image.
      remote_fork: Url of the remote fork.
        The remote fork used to create the PR;
         e.g. git@github.com:jlewi/kubeflow.git. currently only ssh is
         supported.
      kustomize_file: Path to the kustomize file
      add_github_host: If true will add the github ssh host to known ssh hosts.
    """
    # TODO(jlewi): How can we automatically determine the root of the git
    # repo containing the kustomize_file?
    self.manifests_repo_dir = util.run(["git", "rev-parse", "--show-toplevel"],
                                       cwd=os.path.dirname(kustomize_file))
    repo = git.Repo(self.manifests_repo_dir)
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
      logging.info("Created image: %s", image)
    else:
      logging.info("Image %s already exists", image)

    # TODO(jlewi): What if the file was already modified so we didn't
    # modify it in this run but we still need to commit it?
    image_updated = application_util.set_kustomize_image(
      kustomize_file, JUPYTER_WEB_APP_IMAGE_NAME, image)

    if not image_updated:
      logging.info("kustomization not updated so not creating a PR.")
      return

    application_util.regenerate_manifest_tests(self.manifests_repo_dir)

    branch_name = "update_jupyter_{0}".format(last_commit)

    if repo.active_branch.name != branch_name:
      logging.info("Creating branch %s", branch_name)

      branch_names = [b.name for b in repo.branches]
      if branch_name in branch_names:
        logging.info("Branch %s exists", branch_name)
        util.run(["git", "checkout", branch_name], cwd=self.manifests_repo_dir)
      else:
        util.run(["git", "checkout", "-b", branch_name],
                 cwd=self.manifests_repo_dir)

    if self._check_if_pr_exists(commit=last_commit):
      # Since a PR already exists updating to the specified commit
      # don't create a new one.
      # We don't want to just push -f because if the PR already exists
      # git push -f will retrigger the tests.
      # To force a recreate of the PR someone could close the existing
      # PR and a new PR will be created on the next cron run.
      return

    logging.info("Add file %s to repo", kustomize_file)
    repo.index.add([kustomize_file])
    repo.index.add([os.path.join(self.manifests_repo_dir, "tests/*")])
    repo.index.commit("Update the jupyter web app image to {0}".format(image))

    util.run(["git", "push", "-f", remote_repo.name,
              "{0}:{0}".format(branch_name)],
             cwd=self.manifests_repo_dir)

    self.create_pull_request(commit=last_commit)

  def _pr_title(self, commit):
    pr_title = "[auto PR] Update the jupyter-web-app image to {0}".format(
      commit)
    return pr_title

  def _check_if_pr_exists(self, commit=None):
    """Check if a PR is already open.

    Returns:
      exists: True if a PR updating the image to the specified commit already
       exists and false otherwise.
    """
    # TODO(jlewi): Modeled on
    # https://github.com/kubeflow/examples/blob/master/code_search/docker/ks/update_index.sh
    # TODO(jlewi): We should use the GitHub API and check if there is an
    # existing open pull request. Or potentially just use the hub CLI.

    if not commit:
      commit = self.last_commit
      logging.info("No commit specified defaulting to %s", commit)

    pr_title = self._pr_title(commit)

    # See hub conventions:
    # https://hub.github.com/hub.1.html
    # The GitHub repository is determined automatically based on the name
    # of remote repositories
    output = util.run(["hub", "pr", "list", "--format=%U;%t\n"],
                      cwd=self.manifests_repo_dir)


    lines = output.splitlines()

    prs = {}
    for l in lines:
      n, t = l.split(";", 1)
      prs[t] = n

    if pr_title in prs:
      logging.info("PR %s already exists to update the Jupyter web app image "
                   "to %s", prs[pr_title], commit)
      return True

    return False

  def create_pull_request(self, base="kubeflow:master", commit=None):
    """Create a pull request.

    Args:
      base: The base to use. Defaults to "kubeflow:master". This should be
        in the form <GitHub OWNER>:<branch>
    """
    pr_title = self._pr_title(commit)

    with tempfile.NamedTemporaryFile(delete=False, mode="w") as hf:
      hf.write(pr_title)
      hf.write("\n")
      hf.write("\n")
      hf.write(
        "Image built from commit https://github.com/kubeflow/kubeflow/"
        "commit/{0}".format(self._last_commit))
      message_file = hf.name

    # TODO(jlewi): -f creates the pull requests even if there are local changes
    # this was useful during development but we may want to drop it.
    util.run(["hub", "pull-request", "-f", "--base=" + base, "-F",
              message_file],
              cwd=self.manifests_repo_dir)

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
