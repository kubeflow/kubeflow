/* Created by "go tool cgo" - DO NOT EDIT. */

/* package github.com/google/go-jsonnet/compat */

/* Start of preamble from import "C" comments.  */


#line 6 "/usr/local/google/home/sbarzowski/go/src/github.com/google/go-jsonnet/compat/c_layer.go"

#include "libjsonnet.h"

#line 1 "cgo-generated-wrapper"


/* End of preamble from import "C" comments.  */


/* Start of boilerplate cgo prologue.  */
#line 1 "cgo-gcc-export-header-prolog"

#ifndef GO_CGO_PROLOGUE_H
#define GO_CGO_PROLOGUE_H

typedef signed char GoInt8;
typedef unsigned char GoUint8;
typedef short GoInt16;
typedef unsigned short GoUint16;
typedef int GoInt32;
typedef unsigned int GoUint32;
typedef long long GoInt64;
typedef unsigned long long GoUint64;
typedef GoInt64 GoInt;
typedef GoUint64 GoUint;
typedef __SIZE_TYPE__ GoUintptr;
typedef float GoFloat32;
typedef double GoFloat64;
typedef float _Complex GoComplex64;
typedef double _Complex GoComplex128;

/*
  static assertion to make sure the file is being used on architecture
  at least with matching size of GoInt.
*/
typedef char _check_for_64_bit_pointer_matching_GoInt[sizeof(void*)==64/8 ? 1:-1];

typedef struct { const char *p; GoInt n; } GoString;
typedef void *GoMap;
typedef void *GoChan;
typedef struct { void *t; void *v; } GoInterface;
typedef struct { void *data; GoInt len; GoInt cap; } GoSlice;

#endif

/* End of boilerplate cgo prologue.  */

#ifdef __cplusplus
extern "C" {
#endif


extern void test();

extern void run_jsonnet(char* p0);

extern char* jsonnet_evaluate_snippet2(char* p0, char* p1, int* p2);

extern char* jsonnet_evaluate_snippet3(struct JsonnetVm* p0, char* p1, char* p2, int* p3);

#ifdef __cplusplus
}
#endif
