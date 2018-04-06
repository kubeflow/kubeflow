package(default_visibility = ["//visibility:public"])

cc_library(
    name = "libjsonnet++",
    srcs = ["libjsonnet++.cpp"],
    deps = [
        "//core:libjsonnet",
        "//include:libjsonnet++",
    ],
)

cc_test(
    name = "libjsonnet++_test",
    srcs = ["libjsonnet++_test.cpp"],
    data = ["//cpp/testdata"],
    deps = [
        ":libjsonnet++",
        "//external:googletest_main",
    ],
)
