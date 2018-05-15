# Jsonnet command-line tool.

if (BUILD_JSONNET OR BUILD_TESTS)
    add_executable(jsonnet ${LIBJSONNET_SOURCE} jsonnet.cpp)
    add_dependencies(jsonnet libjsonnet_static)
    target_link_libraries(jsonnet libjsonnet_static)

    install(TARGETS jsonnet DESTINATION bin)
endif()