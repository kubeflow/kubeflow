#!/bin/bash

NUM_TESTS=0
NUM_FILES=0
for TEST in *.jsonnet ; do
    NUM_FILES=$((NUM_FILES + 1))
    if [ -r "$TEST.golden" ] ; then 
        NUM_TESTS=$((NUM_TESTS + 1))
    else
        NUM_TESTS=$((NUM_TESTS + $(grep "std.assertEqual" $TEST | wc -l)))
    fi
done

echo "There are $NUM_TESTS individual tests split across $NUM_FILES scripts."
