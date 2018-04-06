workspace(name = "jsonnet")

# This local_repository looks silly but it makes io_bazel_rules_jsonnet use
# _this_ jsonnet, not another downloaded copy.
local_repository(
    name = "jsonnet",
    path = ".",
)

git_repository(
    name = "io_bazel_rules_jsonnet",
    commit = "09ec18db5b9ad3129810f5f0ccc86363a8bfb6be",
    remote = "https://github.com/bazelbuild/rules_jsonnet.git",
)

new_git_repository(
    name = "com_google_googletest",
    remote = "https://github.com/google/googletest.git",

    # If updating googletest version, also update CMakeLists.txt.in.
    tag = "release-1.8.0",
    build_file = "gmock.BUILD",
)

bind(
    name = "googletest",
    actual = "@com_google_googletest//:googletest_no_main",
)

bind(
    name = "googletest_main",
    actual = "@com_google_googletest//:googletest",
)

load("//tools/build_defs:python_repo.bzl", "python_interpreter")

python_interpreter(name = "default_python")
