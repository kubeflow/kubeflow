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

#include <stdlib.h>
#include <stdio.h>

#include <libjsonnet.h>

int main(int argc, const char **argv)
{
    int error;
    char *output;
    struct JsonnetVm *vm;
    if (argc != 2) {
        fprintf(stderr, "libjsonnet_test_file <file>\n");
        return EXIT_FAILURE;
    }
    vm = jsonnet_make();
    output = jsonnet_evaluate_file(vm, argv[1], &error);
    if (error) {
        fprintf(stderr, "%s", output);
        jsonnet_realloc(vm, output, 0);
        jsonnet_destroy(vm);
        return EXIT_FAILURE;
    } 
    printf("%s", output);
    jsonnet_realloc(vm, output, 0);
    jsonnet_destroy(vm);
    return EXIT_SUCCESS;
}
