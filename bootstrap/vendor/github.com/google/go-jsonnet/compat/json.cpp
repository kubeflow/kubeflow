extern "C" {
    #include "libjsonnet.h"
}

#include "json.h"

#include <cassert>

const char *jsonnet_json_extract_string(JsonnetVm *vm, const struct JsonnetJsonValue *v)
{
    (void)vm;
    if (v->kind != JsonnetJsonValue::STRING)
        return nullptr;
    return v->string.c_str();
}

int jsonnet_json_extract_number(struct JsonnetVm *vm, const struct JsonnetJsonValue *v, double *out)
{
    (void)vm;
    if (v->kind != JsonnetJsonValue::NUMBER)
        return 0;
    *out = v->number;
    return 1;
}

int jsonnet_json_extract_bool(struct JsonnetVm *vm, const struct JsonnetJsonValue *v)
{
    (void)vm;
    if (v->kind != JsonnetJsonValue::BOOL)
        return 2;
    return v->number != 0;
}

int jsonnet_json_extract_null(struct JsonnetVm *vm, const struct JsonnetJsonValue *v)
{
    (void)vm;
    return v->kind == JsonnetJsonValue::NULL_KIND;
}

JsonnetJsonValue *jsonnet_json_make_string(JsonnetVm *vm, const char *v)
{
    (void)vm;
    JsonnetJsonValue *r = new JsonnetJsonValue();
    r->kind = JsonnetJsonValue::STRING;
    r->string = v;
    return r;
}

JsonnetJsonValue *jsonnet_json_make_number(struct JsonnetVm *vm, double v)
{
    (void)vm;
    JsonnetJsonValue *r = new JsonnetJsonValue();
    r->kind = JsonnetJsonValue::NUMBER;
    r->number = v;
    return r;
}

JsonnetJsonValue *jsonnet_json_make_bool(struct JsonnetVm *vm, int v)
{
    (void)vm;
    JsonnetJsonValue *r = new JsonnetJsonValue();
    r->kind = JsonnetJsonValue::BOOL;
    r->number = v != 0;
    return r;
}

JsonnetJsonValue *jsonnet_json_make_null(struct JsonnetVm *vm)
{
    (void)vm;
    JsonnetJsonValue *r = new JsonnetJsonValue();
    r->kind = JsonnetJsonValue::NULL_KIND;
    return r;
}

JsonnetJsonValue *jsonnet_json_make_array(JsonnetVm *vm)
{
    (void)vm;
    JsonnetJsonValue *r = new JsonnetJsonValue();
    r->kind = JsonnetJsonValue::ARRAY;
    return r;
}

void jsonnet_json_array_append(JsonnetVm *vm, JsonnetJsonValue *arr, JsonnetJsonValue *v)
{
    (void)vm;
    assert(arr->kind == JsonnetJsonValue::ARRAY);
    arr->elements.emplace_back(v);
}

JsonnetJsonValue *jsonnet_json_make_object(JsonnetVm *vm)
{
    (void)vm;
    JsonnetJsonValue *r = new JsonnetJsonValue();
    r->kind = JsonnetJsonValue::OBJECT;
    return r;
}

void jsonnet_json_object_append(JsonnetVm *vm, JsonnetJsonValue *obj, const char *f,
                                JsonnetJsonValue *v)
{
    (void)vm;
    assert(obj->kind == JsonnetJsonValue::OBJECT);
    obj->fields[std::string(f)] = std::unique_ptr<JsonnetJsonValue>(v);
}

void jsonnet_json_destroy(JsonnetVm *vm, JsonnetJsonValue *v)
{
    (void)vm;
    delete v;
}
