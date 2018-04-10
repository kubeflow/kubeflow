import ctypes
lib = ctypes.CDLL('../compat/libgojsonnet.so')
lib.test()
err = ctypes.c_int()
lib.jsonnet_evaluate_snippet2.argtypes = [
    ctypes.c_char_p,
    ctypes.c_char_p,
    ctypes.POINTER(ctypes.c_int),
]
lib.jsonnet_evaluate_snippet2.restype = ctypes.c_char_p
res = lib.jsonnet_evaluate_snippet2(b"my_file", b"2 + 2", ctypes.byref(err))
print(repr(res))


vm = lib.jsonnet_make()
print(repr(vm))
lib.jsonnet_string_output(vm, 1)

json_string = lib.jsonnet_json_make_string(vm, "test test")
lib.jsonnet_json_extract_string.restype = ctypes.c_char_p
string = lib.jsonnet_json_extract_string(vm, json_string)
print(repr(string))
