#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require at least one numeric character in passwords
# 

pwminnum=$(
pwpolicy -getaccountpolicies | grep -A1 minimumNumericCharacters | tail -1 | cut -d'>' -f2 | cut -d '<' -f1
)


if [ $pwminnum -ge 1 ] ; then
  output=True
else
  output=False
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

