package(default_visibility = ["//visibility:public"])

filegroup(
    name = "jekyll_files",
    srcs = glob(
        ["**/*"],
        exclude = [
            "BUILD",
            "production/**/*",  # Exclude Jekyll output.
            "*.swp",  # Exclude vim temp files.
        ],
    ),
)

genrule(
    name = "jekyll_files_zip",
    srcs = [":jekyll_files"],
    outs = ["jekyll_files.zip"],
    cmd = "zip -qR $@ $(locations :jekyll_files)"
)

genrule(
    name = "jekyll_tree",
    srcs = [
        ":jekyll_files_zip",
        "//examples:jsonnet_docs_srcs",
        "//benchmarks:jsonnet_docs_srcs",
    ],
    outs = ["jekyll_tree.zip"],
    cmd = ("$(location //tools/build_defs/jsonnet_dev:build_jekyll_tree)" +
           " $(location :jekyll_files_zip)" +
           " $(location //examples:jsonnet_docs_srcs)" +
           " $(location //benchmarks:jsonnet_docs_srcs)" +
           " $(location jekyll_tree.zip)"),
    tools = ["//tools/build_defs/jsonnet_dev:build_jekyll_tree"],
)
