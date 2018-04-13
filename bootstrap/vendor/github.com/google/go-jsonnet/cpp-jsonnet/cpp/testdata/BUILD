package(default_visibility = ["//visibility:public"])

load(
    "@io_bazel_rules_jsonnet//jsonnet:jsonnet.bzl",
    "jsonnet_to_json_test",
    "jsonnet_library",
)

jsonnet_to_json_test(
    name = "example_test",
    src = "example.jsonnet",
    golden = "example_golden.json",
)

jsonnet_to_json_test(
    name = "importing_test",
    src = "importing.jsonnet",
    golden = "importing_golden.json",
    imports = ["."],
    deps = [":testlib"],
)

jsonnet_to_json_test(
    name = "invalid_test",
    src = "invalid.jsonnet",
    error = 1,
    golden = "invalid.out",
)

jsonnet_library(
    name = "testlib",
    srcs = [
        "example.jsonnet",
        "importing.jsonnet",
    ],
)

filegroup(
    name = "testdata",
    srcs = [
        "example.jsonnet",
        "example_golden.json",
        "importing.jsonnet",
        "importing_golden.json",
        "invalid.jsonnet",
        "invalid.out",
    ],
)
