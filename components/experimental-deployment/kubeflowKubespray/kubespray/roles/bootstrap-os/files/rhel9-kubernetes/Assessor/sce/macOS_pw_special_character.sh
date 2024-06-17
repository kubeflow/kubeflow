#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/03/20   Ensure system is set to require at least one special character in passwords
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# 

pwspecialchar=$(
pref1=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -e "policyAttributePassword matches '(.*[^a-zA-Z0-9].*){1,}'" | cut -b 12-67) && pref2=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -A1 minimumSymbols | /usr/bin/tail -1 | /usr/bin/cut -d'>' -f2 | /usr/bin/cut -d '<' -f1) && if [ "$pref1" = "policyAttributePassword matches '(.*[^a-zA-Z0-9].*){1,}'" ]; then echo "true"; elif [[ "$pref2" != "" && pref2 -ge 1 ]]; then echo "true"; else echo "false"; fi
)


if [ "$pwspecialchar" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The password policy requires at least 1 special character"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The password policy does not require at least 1 special character"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

