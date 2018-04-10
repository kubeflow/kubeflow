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

namespace jsonnet {
Jsonnet::Jsonnet() {}

Jsonnet::~Jsonnet()
{
    if (vm_ != nullptr) {
        ::jsonnet_destroy(vm_);
    }
}

/* static */
std::string Jsonnet::version()
{
    return ::jsonnet_version();
}

bool Jsonnet::init()
{
    vm_ = static_cast<struct JsonnetVm*>(::jsonnet_make());
    return vm_ != nullptr;
}

void Jsonnet::setMaxStack(uint32_t depth)
{
    ::jsonnet_max_stack(vm_, static_cast<unsigned>(depth));
}

void Jsonnet::setGcMinObjects(uint32_t objects)
{
    ::jsonnet_gc_min_objects(vm_, static_cast<unsigned>(objects));
}

void Jsonnet::setGcGrowthTrigger(double growth)
{
    ::jsonnet_gc_growth_trigger(vm_, growth);
}

void Jsonnet::setStringOutput(bool string_output)
{
    ::jsonnet_string_output(vm_, string_output);
}

void Jsonnet::addImportPath(const std::string& path)
{
    ::jsonnet_jpath_add(vm_, path.c_str());
}

void Jsonnet::setMaxTrace(uint32_t lines)
{
    ::jsonnet_max_trace(vm_, static_cast<unsigned>(lines));
}

void Jsonnet::bindExtVar(const std::string& key, const std::string& value)
{
    ::jsonnet_ext_var(vm_, key.c_str(), value.c_str());
}

void Jsonnet::bindExtCodeVar(const std::string& key, const std::string& value)
{
    ::jsonnet_ext_code(vm_, key.c_str(), value.c_str());
}

bool Jsonnet::evaluateFile(const std::string& filename, std::string* output)
{
    if (output == nullptr) {
        return false;
    }
    int error = 0;
    const char* jsonnet_output = ::jsonnet_evaluate_file(vm_, filename.c_str(), &error);
    if (error != 0) {
        last_error_.assign(jsonnet_output);
        return false;
    }
    output->assign(jsonnet_output);
    return true;
}

bool Jsonnet::evaluateSnippet(const std::string& filename, const std::string& snippet,
                              std::string* output)
{
    if (output == nullptr) {
        return false;
    }
    int error = 0;
    const char* jsonnet_output =
        ::jsonnet_evaluate_snippet(vm_, filename.c_str(), snippet.c_str(), &error);
    if (error != 0) {
        last_error_.assign(jsonnet_output);
        return false;
    }
    output->assign(jsonnet_output);
    return true;
}

namespace {
void parseMultiOutput(const char* jsonnet_output, std::map<std::string, std::string>* outputs)
{
    for (const char* c = jsonnet_output; *c != '\0';) {
        const char* filename = c;
        const char* c2 = c;
        while (*c2 != '\0')
            ++c2;
        ++c2;
        const char* json = c2;
        while (*c2 != '\0')
            ++c2;
        ++c2;
        c = c2;
        outputs->insert(std::make_pair(filename, json));
    }
}
}  // namespace

bool Jsonnet::evaluateFileMulti(const std::string& filename,
                                std::map<std::string, std::string>* outputs)
{
    if (outputs == nullptr) {
        return false;
    }
    int error = 0;
    const char* jsonnet_output = ::jsonnet_evaluate_file_multi(vm_, filename.c_str(), &error);
    if (error != 0) {
        last_error_.assign(jsonnet_output);
        return false;
    }
    parseMultiOutput(jsonnet_output, outputs);
    return true;
}

bool Jsonnet::evaluateSnippetMulti(const std::string& filename, const std::string& snippet,
                                   std::map<std::string, std::string>* outputs)
{
    if (outputs == nullptr) {
        return false;
    }
    int error = 0;
    const char* jsonnet_output =
        ::jsonnet_evaluate_snippet_multi(vm_, filename.c_str(), snippet.c_str(), &error);
    if (error != 0) {
        last_error_.assign(jsonnet_output);
        return false;
    }
    parseMultiOutput(jsonnet_output, outputs);
    return true;
}

std::string Jsonnet::lastError() const
{
    return last_error_;
}

}  // namespace jsonnet
