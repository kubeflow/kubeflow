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

extern "C" {
#include "libjsonnet.h"
}

#include "gtest/gtest.h"

TEST(JsonnetTest, TestEvaluateSnippet)
{
    const char* snippet = "std.assertEqual(({ x: 1, y: self.x } { x: 2 }).y, 2)";
    struct JsonnetVm* vm = jsonnet_make();
    ASSERT_FALSE(vm == nullptr);
    int error = 0;
    char* output = jsonnet_evaluate_snippet(vm, "snippet", snippet, &error);
    EXPECT_EQ(0, error);
    jsonnet_realloc(vm, output, 0);
    jsonnet_destroy(vm);
}
