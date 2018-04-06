# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

def jsonnet_docs_srcs_zip(name, srcs=[], visibility=None):
  filegroup_name = "%s_files" % name
  native.filegroup(
      name = filegroup_name,
      srcs = srcs,
  )

  native.genrule(
      name = name,
      srcs = [":%s" % filegroup_name],
      outs = ["%s.zip" % name],
      cmd = ("$(location //tools/build_defs/jsonnet_dev:build_jsonnet_srcs_zip)"
             + " $@ $(locations :%s)" % filegroup_name),
      tools = ["//tools/build_defs/jsonnet_dev:build_jsonnet_srcs_zip"],
  )
