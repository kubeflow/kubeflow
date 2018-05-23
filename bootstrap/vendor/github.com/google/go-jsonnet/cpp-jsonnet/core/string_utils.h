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

#ifndef JSONNET_STRING_H
#define JSONNET_STRING_H

#include "lexer.h"

/** Unparse the string. */
UString jsonnet_string_unparse(const UString &str, bool single);

// Note that the following two functions do not handle the quoting of ' and "
// inside verbatim strings because that quoting is reversible.  Thus, that
// quoting is done at lexing time and undone again at pretty-printing time.

/** Escape special characters. */
UString jsonnet_string_escape(const UString &str, bool single);

/** Resolve escape chracters in the string. */
UString jsonnet_string_unescape(const LocationRange &loc, const UString &s);

#endif
