#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Do not enable the "root" account
# 

output=$(
dscl . -read /Users/root AuthenticationAuthority 2>&1
)

# If result returns it should pass, otherwise fail.
if [ "$output" == "No such key: AuthenticationAuthority" ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
