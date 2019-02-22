{

  // Convert non-boolean types like string,number to a boolean.
  // This is primarily intended for dealing with parameters that should be booleans.
  local toBool = function(x) {
    result::
      if std.type(x) == "boolean" then
        x
      else if std.type(x) == "string" then
        std.asciiUpper(x) == "TRUE"
      else if std.type(x) == "number" then
        x != 0
      else
        false,
  }.result,

  // A tempalte for defining the steps for building each image.
  local subGraphTemplate = {
    // following variables must be set
    name: null,

    dockerFile: null,
    buildArg: null,
    contextDir: ".",
    useImageCache: false,
    image: "",
    imageLatest: "",
    gitVersion: "",

    local template = self,
    local useImageCache = template.useImageCache,

    local pullStep = if useImageCache then [
      {
        id: "pull-" + template.name,
        name: "gcr.io/cloud-builders/docker",
        args: ["pull", template.imageLatest],
        waitFor: ["-"],
      },
    ] else [],

    images: [template.image, template.imageLatest],
    steps: pullStep +
           [
             {
               local buildArgList = if template.buildArg != null then ["--build-arg", template.buildArg] else [],
               local cacheList = if useImageCache then ["--cache-from=" + template.imageLatest] else [],

               id: "build-" + template.name,
               name: "gcr.io/cloud-builders/docker",
               args: [
                       "build",
                       "-t",
                       template.image,
                       "--label=git-versions=" + template.gitVersion,
                     ]
                     + buildArgList
                     + [
                       "--file=" + template.dockerFile,
                     ]
                     + cacheList + [template.contextDir],
               waitFor: if useImageCache then ["pull-" + template.name] else ["-"],
             },
             {
               id: "tag-" + template.name,
               name: "gcr.io/cloud-builders/docker",
               args: ["tag", template.image, template.imageLatest],
               waitFor: ["build-" + template.name],
             },
           ],
  },
  subGraphTemplate: subGraphTemplate,
  toBool: toBool,
}
