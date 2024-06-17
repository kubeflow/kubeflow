#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require passwords of at least 15 characters
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# Edward Byrd		  07/12/23	 Update to output
#

pwminlength=$(
/usr/bin/pwpolicy -getaccountpolicies | /usr/bin/grep -e "policyAttributePassword matches" | /usr/bin/cut -b 46-53 | /usr/bin/cut -d',' -f1 | /usr/bin/cut -d'{' -f2 |  head -1
)

if [ $pwminlength -ge 15 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The pasword policy minimum length is set correctly"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The password policy minimum length is \"$pwminlength\" which is less than the minimum allowable of 15"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


