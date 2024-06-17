#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require at least one numeric character in passwords
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# Edward Byrd		  07/12/23	 Update to output
# 

pwminnum=$(
pref1=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -e "Contain at least one number and one alphabetic character." | cut -b 13-68) && pref2=$(/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -A1 minimumNumericCharacters | /usr/bin/tail -1 | /usr/bin/cut -d'>' -f2 | /usr/bin/cut -d '<' -f1) && if [ "$pref1" = "Contain at least one number and one alphabetic character" ]; then echo "true"; elif [[ "$pref2" != "" && pref2 -ge 1 ]]; then echo "true"; else echo "false"; fi
)


if [ "$pwminnum" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The password policy requires at least 1 numeric character"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The password policy does not require at least 1 numeric character"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

