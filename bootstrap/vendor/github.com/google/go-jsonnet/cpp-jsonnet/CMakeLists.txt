# Travis CI runs CMake 2.8.7 so we are pinned to that verison.
cmake_minimum_required(VERSION 2.8.7)
include(ExternalProject)

# User-configurable options.
option(BUILD_JSONNET "Build jsonnet command-line tool." ON)
option(BUILD_TESTS "Build and run jsonnet tests." ON)
set(GLOBAL_OUTPUT_PATH_SUFFIX "" CACHE STRING
    "Output artifacts directory.")

project(jsonnet C CXX)

# Discourage in-source builds because they overwrite the hand-written Makefile.
# Use `cmake . -B<dir>` or the CMake GUI to do an out-of-source build.
if (${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR} AND
        ${CMAKE_GENERATOR} MATCHES "Makefile")
    message(WARNING "In-source builds with the a makefile generator overwrite the handwritten Makefile. Out-of-source builds are recommended for this project.")
endif()

# Disable CMake >3.0 warnings on Mac OS.
set(CMAKE_MACOSX_RPATH 1)

# Set output paths.
set(GLOBAL_OUTPUT_PATH "${PROJECT_BINARY_DIR}/${GLOBAL_OUTPUT_PATH_SUFFIX}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})

# Include external googletest project. This runs a CMake sub-script
# (CMakeLists.txt.in) that downloads googletest source. It's then built as part
# of the jsonnet project. The conventional way of handling CMake dependencies is
# to use a find_package script, which finds and installs the library from
# known locations on the local machine. Downloading the library ourselves
# allows us to pin to a specific version and makes things easier for users
# who don't have package managers.
if (BUILD_TESTS)
    enable_testing()

    # Generate and download googletest project.
    set(GOOGLETEST_DIR ${GLOBAL_OUTPUT_PATH}/googletest-download)
    configure_file(CMakeLists.txt.in ${GOOGLETEST_DIR}/CMakeLists.txt)
    execute_process(COMMAND ${CMAKE_COMMAND} -G "${CMAKE_GENERATOR}" .
            RESULT_VARIABLE result
            WORKING_DIRECTORY ${GOOGLETEST_DIR}
    )
    if(result)
        message(FATAL_ERROR "googletest download failed: ${result}")
    endif()

    # Build googletest.
    execute_process(COMMAND ${CMAKE_COMMAND} --build .
        RESULT_VARIABLE result
        WORKING_DIRECTORY ${GOOGLETEST_DIR})
    if(result)
        message(FATAL_ERROR "Build step for googletest failed: ${result}")
    endif()

    # Prevent overriding the parent project's compiler/linker
    # settings on Windows
    set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

    # Add googletest directly to our build. This defines
    # the gtest and gtest_main targets.
    add_subdirectory(${GLOBAL_OUTPUT_PATH}/googletest-src
                                     ${GLOBAL_OUTPUT_PATH}/googletest-build)

    # Include googletest headers.
    include_directories("${gtest_SOURCE_DIR}/include")
endif()

# Compiler flags.
if (${CMAKE_CXX_COMPILER_ID} MATCHES "Clang" OR
        ${CMAKE_CXX_COMPILER_ID} STREQUAL "GNU")
    set(OPT "-O3")
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -g -Wall -Wextra -pedantic -std=c99 -O3 ${OPT}")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g -Wall -Wextra -Woverloaded-virtual -pedantic -std=c++0x -fPIC ${OPT}")
else()
    # TODO: Windows support.
    message(FATAL_ERROR "Compiler ${CMAKE_CXX_COMPILER_ID} not supported")
endif()

# Look for libraries in global output path.
link_directories(${GLOBAL_OUTPUT_PATH})

# Targets

include_directories(
    include
    third_party/md5
    core)

install(DIRECTORY include DESTINATION include)

add_subdirectory(stdlib)
add_subdirectory(third_party/md5)
add_subdirectory(core)
add_subdirectory(cmd)
add_subdirectory(test_suite)

if (BUILD_TESTS)
    # Set JSONNET_CMD variable required for regression tests.
    file(TO_NATIVE_PATH ${GLOBAL_OUTPUT_PATH}/jsonnet JSONNET_CMD)
    set(CTEST_ENVIRONMENT
        "JSONNET_CMD=${JSONNET_CMD}")

    # s`run_tests` target builds and runs all tests. The cmake-generated `test`
    # target runs tests without building them.
    add_custom_target(run_tests COMMAND ${CMAKE_CTEST_COMMAND}
        DEPENDS libjsonnet_test libjsonnet_test_file libjsonnet_test_snippet
                jsonnet parser_test lexer_test
    )

endif()
