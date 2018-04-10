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

#ifndef JSONNET_JSON_H
#define JSONNET_JSON_H

#include <memory>
#include <string>
#include <vector>

#include <libjsonnet.h>

struct JsonnetJsonValue {
    enum Kind {
        ARRAY,
        BOOL,
        NULL_KIND,
        NUMBER,
        OBJECT,
        STRING,
    };

    JsonnetJsonValue() = default;
    JsonnetJsonValue(JsonnetJsonValue&) = delete;
    JsonnetJsonValue(JsonnetJsonValue&&) = default;

    JsonnetJsonValue(Kind kind, std::string string, double number)
        : kind(kind), string(string), number(number)
    {
    }

    Kind kind;
    std::string string;
    double number;  // Also used for bool (0.0 and 1.0)
    std::vector<std::unique_ptr<JsonnetJsonValue>> elements;
    std::map<std::string, std::unique_ptr<JsonnetJsonValue>> fields;
};

#endif
