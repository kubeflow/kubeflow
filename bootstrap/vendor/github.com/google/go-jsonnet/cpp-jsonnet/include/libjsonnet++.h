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

#ifndef CPP_JSONNET_H_
#define CPP_JSONNET_H_

#include <cstring>
#include <functional>
#include <map>
#include <string>

extern "C" {
#include "libjsonnet.h"
}

namespace jsonnet {
class Jsonnet {
   public:
    Jsonnet();
    ~Jsonnet();

    /// Return the version string of the Jsonnet interpreter.  Conforms to
    /// semantic versioning http://semver.org/. If this does not match
    /// LIB_JSONNET_VERSION then there is a mismatch between header and compiled
    /// library.
    static std::string version();

    /// Initializes the Jsonnet VM. This method must be called before calling any
    /// of the other methods.
    ///
    /// @return true if the Jsonnet VM was successfully initialized, false
    ///         otherwise.
    bool init();

    /// Sets the maximum stack depth.
    void setMaxStack(uint32_t depth);

    /// Sets the number of objects required before a carbage collection cycle is
    /// allowed.
    void setGcMinObjects(uint32_t objects);

    /// Run the garbage collector after this amount of growth in the number of
    /// objects.
    void setGcGrowthTrigger(double growth);

    /// Set whether to expect a string as output and don't JSON encode it.
    void setStringOutput(bool string_output);

    /// Set the number of lines of stack trace to display (0 to display all).
    void setMaxTrace(uint32_t lines);

    /// Add to the default import callback's library search path.
    void addImportPath(const std::string& path);

    /// Bind a Jsonnet external variable to the given value.
    ///
    /// Argument values are copied so memory should be managed by caller.
    void bindExtVar(const std::string& key, const std::string& value);

    /// Bind a Jsonnet external code variable to the given value.
    ///
    /// Argument values are copied so memory should be managed by caller.
    void bindExtCodeVar(const std::string& key, const std::string& value);

    /// Evaluate a file containing Jsonnet code to return a JSON string.
    ///
    /// This method returns true if the Jsonnet code is successfully evaluated.
    /// Otherwise, it returns false, and the error output can be returned by
    /// calling LastError();
    ///
    /// @param filename Path to a file containing Jsonnet code.
    /// @param output Pointer to string to contain the output.
    /// @return true if the Jsonnet code was successfully evaluated, false
    ///         otherwise.
    bool evaluateFile(const std::string& filename, std::string* output);

    /// Evaluate a string containing Jsonnet code to return a JSON string.
    ///
    /// This method returns true if the Jsonnet code is successfully evaluated.
    /// Otherwise, it returns false, and the error output can be returned by
    /// calling LastError();
    ///
    /// @param filename Path to a file (used in error message).
    /// @param snippet Jsonnet code to execute.
    /// @param output Pointer to string to contain the output.
    /// @return true if the Jsonnet code was successfully evaluated, false
    ///         otherwise.
    bool evaluateSnippet(const std::string& filename, const std::string& snippet,
                         std::string* output);

    /// Evaluate a file containing Jsonnet code, return a number of JSON files.
    ///
    /// This method returns true if the Jsonnet code is successfully evaluated.
    /// Otherwise, it returns false, and the error output can be returned by
    /// calling LastError();
    ///
    /// @param filename Path to a file containing Jsonnet code.
    /// @param outputs Pointer to map which will store the output map of filename
    ///        to JSON string.
    bool evaluateFileMulti(const std::string& filename,
                           std::map<std::string, std::string>* outputs);

    /// Evaluate a string containing Jsonnet code, return a number of JSON files.
    ///
    /// This method returns true if the Jsonnet code is successfully evaluated.
    /// Otherwise, it returns false, and the error output can be returned by
    /// calling LastError();
    ///
    /// @param filename Path to a file containing Jsonnet code.
    /// @param snippet Jsonnet code to execute.
    /// @param outputs Pointer to map which will store the output map of filename
    ///        to JSON string.
    /// @return true if the Jsonnet code was successfully evaluated, false
    ///         otherwise.
    bool evaluateSnippetMulti(const std::string& filename, const std::string& snippet,
                              std::map<std::string, std::string>* outputs);

    /// Returns the last error raised by Jsonnet.
    std::string lastError() const;

   private:
    struct JsonnetVm* vm_;
    std::string last_error_;
};

}  // namespace jsonnet

#endif  // CPP_JSONNET_H_
