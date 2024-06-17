#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         10/15/20   Ensure that an administrator password is required to access system-wide prefernces
# 

adminpass=$(
security authorizationdb read system.preferences 2> /dev/null | grep -A1 shared | grep false 
)

if [ $adminpass -n ] ; then
  output=False
else
  output=True
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
