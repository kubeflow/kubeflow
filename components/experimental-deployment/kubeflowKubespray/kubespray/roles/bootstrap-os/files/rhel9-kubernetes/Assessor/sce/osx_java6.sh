#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure Java 6 is not the default
# 

output=$(
java -version
)

# If result returns Java 6 fail, otherwise pass.
if [ "$output" == *"1.6.0_x"* ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
fi
