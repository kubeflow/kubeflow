#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/01/20   Disable Passwords Hints
# Edward Byrd         11/08/22   Updated for the new naming
# Edward Byrd		  06/27/23	 Update audit and output
# 

pwhint=$(
dscl . -list /Users hint | wc -l
)

pwhintuserslist=$(
dscl . -list /Users hint | awk '{print$1}'
)


if [ $pwhint -eq 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: All users do not have a password hint"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following users have a password hint set"
    echo "$pwhintuserslist"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi






