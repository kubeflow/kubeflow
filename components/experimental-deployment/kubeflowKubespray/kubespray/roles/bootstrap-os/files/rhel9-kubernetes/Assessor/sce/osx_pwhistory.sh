#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require 5 or lower failed logins
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# 

pwhistoryexist=$(
pwpolicy -getaccountpolicies | grep -c policyAttributeDaysUntilExpiration 
)

pwhistory=$(
pwpolicy -getaccountpolicies | grep -A1 policyAttributePasswordHistoryDepth | tail -1 | cut -d'>' -f2 | cut -d '<' -f1
)


if [ $pwhistory == 0 ]; then
  output=False
elif [ $pwhistory -ge 15 ]; then
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

