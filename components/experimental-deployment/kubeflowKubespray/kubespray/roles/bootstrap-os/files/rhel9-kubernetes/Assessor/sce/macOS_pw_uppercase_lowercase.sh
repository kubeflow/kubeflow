#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/03/20   Ensure system is set to require at least one uppercase and one lowercase character in passwords
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# Edward Byrd		  07/12/23	 Update to output
# 

pwmcomplex=$(
pref1=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -A1 minimumMixedCaseCharacters | /usr/bin/tail -1 | /usr/bin/cut -d'>' -f2 | /usr/bin/cut -d '<' -f1) && if [[ "$pref2" != "" && pref2 -ge 1 ]]; then echo "true"; else echo "false"; fi
)


if [ "$pwmcomplex" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The password policy requires at least 1 uppercase and lowercase character"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "PASSED: The password policy requires at least 1 uppercase and lowercase character"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

