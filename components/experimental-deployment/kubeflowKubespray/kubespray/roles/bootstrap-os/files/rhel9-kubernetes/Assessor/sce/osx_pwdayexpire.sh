#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/03/20   Ensure system is set to require passwords to change at least every 365 days
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# 


pwexpireexist=$(
pwpolicy -getaccountpolicies | grep -c policyAttributeDaysUntilExpiration 
)


pwdayexpire=$(
pwpolicy -getaccountpolicies | grep -A1 policyAttributeDaysUntilExpiration | tail -1 | cut -d'>' -f2 | cut -d '<' -f1
)


if [ $pwexpireexist == 0 ]; then
  output=False
elif [ $pwdayexpire -le 365 ]; then
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

