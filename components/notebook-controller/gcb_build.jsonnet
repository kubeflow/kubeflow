local util = import "../../tools/gcb/template.libsonnet";

local useImageCache = util.toBool(std.extVar("useImageCache"));
local image = std.extVar("imageBase") + ":" + std.extVar("tag");
local imageLatest = std.extVar("imageBase") + ":latest";
local gitVersion = std.extVar("gitVersion");

local workerSteps = util.subGraphTemplate {
  name: "notebook-controller-image",
  dockerFile: "./Dockerfile",
  contextDir: ".",
  useImageCache: useImageCache,
  image: image,
  imageLatest: imageLatest,
  gitVersion: gitVersion,
};

{
  steps: workerSteps.steps,
  images: workerSteps.images,
}