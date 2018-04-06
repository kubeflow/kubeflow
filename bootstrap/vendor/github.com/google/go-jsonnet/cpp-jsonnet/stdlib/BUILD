package(default_visibility = ["//visibility:public"])

filegroup(
    name = "stdlib",
    srcs = ["std.jsonnet"],
)

cc_library(
    name = "std",
    hdrs = ["std.jsonnet.h"],
    srcs = [":gen-std-jsonnet-h"],
    includes = ["."],
    linkstatic = 1,
)

genrule(
    name = "gen-std-jsonnet-h",
    srcs = ["std.jsonnet"],
    outs = ["std.jsonnet.h"],
    cmd = "((od -v -Anone -t u1 $< | tr \" \" \"\n\" | grep -v \"^$$\" " +
          "| tr \"\n\" \",\" ) && echo \"0\") > $@; " +
          "echo >> $@",
)
