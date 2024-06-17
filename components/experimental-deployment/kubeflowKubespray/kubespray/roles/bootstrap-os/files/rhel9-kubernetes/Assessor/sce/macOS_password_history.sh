#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require 5 or lower failed logins
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# Edward Byrd		  07/12/23	 Update to output and audit
# 

pwhistory=$(
pref1=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -A1 policyAttributePasswordHistoryDepth | /usr/bin/tail -1 | /usr/bin/cut -d'>' -f2 | /usr/bin/cut -d '<' -f1) && pref2=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -A1 policyAttributePasswordHistoryDepth | /usr/bin/tail -1 | /usr/bin/cut -d'>' -f2 | /usr/bin/cut -d '<' -f1) && if [[ "$pref1" != "" && pref1 -ge 15 ]]; then echo "true" && pwhistoryvalue=$pref1; elif [[ "$pref2" != "" && pref2 -ge 15 ]]; then echo "true" && pwhistoryvalue=$pref2; else echo "false"; fi
)


if [ "$pwhistory" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The password policy keeps at least the last 15 passwords"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The password policy keeps passwords for \"$pwhistoryvalue\" which is lass than the minimum allowable of the last 15 passwords"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

