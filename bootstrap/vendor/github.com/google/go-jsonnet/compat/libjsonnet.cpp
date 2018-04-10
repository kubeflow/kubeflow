#include <stdio.h>
#include <stdlib.h>

extern "C" {
    #include "libjsonnet.h"
}

#include "json.h"

struct JsonnetVm {
    int id;
};

JsonnetVm *jsonnet_make(void) {
    JsonnetVm *vm = new JsonnetVm();
    vm->id = 42; // TODO(sbarzowski) real ids
    return vm;
}

inline static void not_supported() {
    fputs("FATAL ERROR: Not supported by Go implementation.\n", stderr);
    abort();
}

inline static void todo() {
    fputs("TODO, NOT IMPLEMENTED YET\n", stderr);
    abort();
}

void jsonnet_max_stack(struct JsonnetVm *vm, unsigned v) {
    todo();
}

void jsonnet_gc_min_objects(struct JsonnetVm *vm, unsigned v) {
    not_supported();
}

void jsonnet_gc_growth_trigger(struct JsonnetVm *vm, double v) {
    not_supported();
}

void jsonnet_string_output(struct JsonnetVm *vm, int v) {
    todo();
}

static void memory_panic(void)
{
    fputs("FATAL ERROR: A memory allocation error occurred.\n", stderr);
    abort();
}

char *jsonnet_realloc(JsonnetVm *vm, char *str, size_t sz)
{
    (void)vm;
    if (str == nullptr) {
        if (sz == 0)
            return nullptr;
        auto *r = static_cast<char *>(::malloc(sz));
        if (r == nullptr)
            memory_panic();
        return r;
    } else {
        if (sz == 0) {
            ::free(str);
            return nullptr;
        } else {
            auto *r = static_cast<char *>(::realloc(str, sz));
            if (r == nullptr)
                memory_panic();
            return r;
        }
    }
}

const char *jsonnet_version(void)
{
    return LIB_JSONNET_VERSION;
}

void jsonnet_native_callback(struct JsonnetVm *vm, const char *name, JsonnetNativeCallback *cb,
    void *ctx, const char *const *params)
{
    todo();
}

void jsonnet_ext_var(JsonnetVm *vm, const char *key, const char *val)
{
    todo();
}

void jsonnet_ext_code(JsonnetVm *vm, const char *key, const char *val)
{
    todo();
}

void jsonnet_tla_var(JsonnetVm *vm, const char *key, const char *val)
{
    todo();
}

void jsonnet_tla_code(JsonnetVm *vm, const char *key, const char *val)
{
    todo();
}

void jsonnet_fmt_debug_desugaring(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_indent(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_max_blank_lines(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_string(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_comment(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_pad_arrays(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_pad_objects(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_pretty_field_names(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_fmt_sort_imports(JsonnetVm *vm, int v)
{
    not_supported();
}

void jsonnet_max_trace(JsonnetVm *vm, unsigned v)
{
    todo();
}

void jsonnet_jpath_add(JsonnetVm *vm, const char *path_)
{
    todo();
}

char *jsonnet_fmt_file(JsonnetVm *vm, const char *filename, int *error)
{
    not_supported();
    return nullptr;
}

char *jsonnet_fmt_snippet(JsonnetVm *vm, const char *filename, const char *snippet, int *error)
{
    not_supported();
    return nullptr;
}

char *jsonnet_evaluate_file(JsonnetVm *vm, const char *filename, int *error)
{
    todo();
    return nullptr;
}

char *jsonnet_evaluate_file_multi(JsonnetVm *vm, const char *filename, int *error)
{
    todo();
    return nullptr;
}

char *jsonnet_evaluate_file_stream(JsonnetVm *vm, const char *filename, int *error)
{
    todo();
    return nullptr;
}

char *jsonnet_evaluate_snippet(JsonnetVm *vm, const char *filename, const char *snippet, int *error)
{
    todo();
    return nullptr;
}

char *jsonnet_evaluate_snippet_multi(JsonnetVm *vm, const char *filename, const char *snippet,
                                     int *error)
{
    todo();
    return nullptr;
}

char *jsonnet_evaluate_snippet_stream(JsonnetVm *vm, const char *filename, const char *snippet,
                                      int *error)
{
    todo();
    return nullptr;
}
