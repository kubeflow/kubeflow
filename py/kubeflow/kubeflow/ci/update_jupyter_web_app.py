"""Script to build and update the Jupyter WebApp image."""

import fire
import git
import httplib2
import json
import logging
import os
import re
import tempfile
import yaml

from kubeflow.testing import util

from containerregistry.client import docker_creds
from containerregistry.client import docker_name
from containerregistry.client.v2_2 import docker_digest
from containerregistry.client.v2_2 import docker_http
from containerregistry.client.v2_2 import docker_image as v2_2_image
from containerregistry.transport import transport_pool
from containerregistry.transform.v2_2 import metadata

class WebAppUpdater(object):
  def __init__(self):
    self._last_commit = None

  def build_image(self, project):
    """Build the image."""
    env = dict()
    env.update(os.environ)
    env["PROJECT"] = project

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
    for param, value in values.iteritems():
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
      for param in regexps.keys():
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
    logging.info("Successfully made %d replacements" % replacements)

    return prototype_file

  @property
  def last_commit(self):
    if not self._last_commit:
      """Get the last commit of a change to the source for the jupyter-web-app."""
      # Get the hash of the last commit to modify the source for the Jupyter web
      # app image
      self._last_commit = util.run(["git", "log", "-n", "1", "--pretty=format:\"%h\"",
                                    "components/jupyter-web-app"], cwd=self._root_dir())

    return self._last_commit

  def all(self, project, remote):
    """Build the latest image and update the prototype.

    Args:
      project: GCP project to push the image to
      remote: Name of the remote to push to
    """
    last_commit = self._last_commit()
    logging.info("Last change to components-jupyter-web-app was %s", last_commit)
    # TODO(jlewi): Get the latest image and compare the sha against the
    # current sha and if it isn't the same then rebuild the image.
    # TODO(jlewi): We might actually want to use git diff to see the
    # the last commit the relevant code actually changed.
    base = "gcr.io/{0}/jupyter-web-app".format(project)
    base_image = base + ":latest"
    transport = transport_pool.Http(httplib2.Http)
    src = docker_name.from_string(base_image)
    creds = docker_creds.DefaultKeychain.Resolve(src)
    try:
      with v2_2_image.FromRegistry(src, creds, transport) as src_image:
        config = json.loads(src_image.config_file())
    except docker_http.V2DiagnosticException as e:
      if e.status == 404:
        logging.info("%s doesn't exist", base_image)
      else:
        raise
    git_version = config.get("container_config").get("Labels").get("git-version")
    logging.info("Most recent image has git-version %s", git_version)

    last_hash = None
    if git_version:
      last_hash = git_version.rsplit("g", 1)[-1]

    if last_hash == last_commit:
      logging.info("Existing docker image is already built from commit: %s",
                   last_commit)

      found_tag = None
      for t in src_image.tags():
        if t.endswith(last_commit):
          found_tag = t
          break

      if not found_tag:
        raise ValueError("Could not find an image with tag that matches the "
                         "commit.")

      image = base + ":" + found_tag
    else:
      image = self.build_image(project)

    # TODO(jlewi):We should check what the current image and not update it
    # if its the existing image
    prototype_file = self.update_prototype(image)

    repo = git.Repo(self._root_dir())
    logging.info("Add file %s to repo", prototype_file)
    repo.index.add([prototype_file])
    repo.index.commit("Update the jupyter web app image to {0}".format(image))

    remote_repo = None
    for r in repo.remotes:
      if remote == r.name:
        remote_repo = r
        break

    remote_repo.push()

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
    # The GitHub repository is determined automatically based on the forks.
    output = util.run(["hub", "pr", "list", "--format=%U;%t\n"])
    lines = output.splitlines()

    prs = {}
    for l in lines:
      n, t = l.split(";", 1)
      prs[t] = n

    if pr_title in prs:
      logging.info("PR %s already exists to update the Jupyter web app image "
                   "to %s", prs[pr_title], commit)

    with tempfile.NamedTemporaryFile(delete=False) as hf:
      hf.write(pr_title)
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