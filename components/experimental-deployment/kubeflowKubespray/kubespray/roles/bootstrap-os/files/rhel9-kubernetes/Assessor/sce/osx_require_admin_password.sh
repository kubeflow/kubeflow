#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/22/20   Require Admin Password to Access System Preferences
# 

adminpword=$(
security authorizationdb read system.preferences 2> /dev/null | grep -A1 shared | grep false
)

if [ $adminpword -n ] ; then
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
