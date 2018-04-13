/*
Copyright 2017 Google Inc. All rights reserved.

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


// The only way to verify that verbatim strings are actually verbatim is to put a \ in them.
// However, we can't make that work on all platforms.  However by importing a file that does
// not exist, we get the same behavior everywhere and can check the correct filename was
// attemted in the error message.
import @'C:\can''t possibly exist~'
