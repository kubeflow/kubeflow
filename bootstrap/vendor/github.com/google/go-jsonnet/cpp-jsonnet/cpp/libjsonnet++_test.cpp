/*
Copyright 2015 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#include "libjsonnet++.h"

#include <fstream>
#include <streambuf>
#include <string>

#include "gtest/gtest.h"

namespace jsonnet {
std::string readFile(const std::string& filename)
{
    std::ifstream in(filename);
    return std::string(std::istreambuf_iterator<char>(in), std::istreambuf_iterator<char>());
}

TEST(JsonnetTest, TestEvaluateSnippet)
{
    const std::string input = readFile("cpp/testdata/example.jsonnet");
    const std::string expected = readFile("cpp/testdata/example_golden.json");

    Jsonnet jsonnet;
    ASSERT_TRUE(jsonnet.init());
    std::string output;
    EXPECT_TRUE(jsonnet.evaluateSnippet("snippet", input, &output));
    EXPECT_EQ(expected, output);
    EXPECT_EQ("", jsonnet.lastError());
}

TEST(JsonnetTest, TestEvaluateInvalidSnippet)
{
    const std::string input = readFile("cpp/testdata/invalid.jsonnet");
    const std::string error = readFile("cpp/testdata/invalid.out");

    Jsonnet jsonnet;
    ASSERT_TRUE(jsonnet.init());
    std::string output;
    EXPECT_FALSE(jsonnet.evaluateSnippet("cpp/testdata/invalid.jsonnet", input, &output));
    EXPECT_EQ("", output);
    EXPECT_EQ(error, jsonnet.lastError());
}

TEST(JsonnetTest, TestEvaluateFile)
{
    const std::string expected = readFile("cpp/testdata/example_golden.json");

    Jsonnet jsonnet;
    ASSERT_TRUE(jsonnet.init());
    std::string output;
    EXPECT_TRUE(jsonnet.evaluateFile("cpp/testdata/example.jsonnet", &output));
    EXPECT_EQ(expected, output);
    EXPECT_EQ("", jsonnet.lastError());
}

TEST(JsonnetTest, TestEvaluateInvalidFile)
{
    const std::string expected = readFile("cpp/testdata/invalid.out");

    Jsonnet jsonnet;
    ASSERT_TRUE(jsonnet.init());
    std::string output;
    EXPECT_FALSE(jsonnet.evaluateFile("cpp/testdata/invalid.jsonnet", &output));
    EXPECT_EQ("", output);
    EXPECT_EQ(expected, jsonnet.lastError());
}

TEST(JsonnetTest, TestAddImportPath)
{
    const std::string expected = readFile("cpp/testdata/importing_golden.json");

    Jsonnet jsonnet;
    ASSERT_TRUE(jsonnet.init());
    jsonnet.addImportPath("cpp/testdata");
    std::string output;
    EXPECT_TRUE(jsonnet.evaluateFile("cpp/testdata/importing.jsonnet", &output));
    EXPECT_EQ(expected, output);
    EXPECT_EQ("", jsonnet.lastError());
}

}  // namespace jsonnet
