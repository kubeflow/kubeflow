#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         01/20/20   Ensure  Sealed System Volume is enabled
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Updated the output
# 

ssv=$(
/usr/bin/csrutil authenticated-root status | grep -c 'Authenticated Root status: enabled'
)

if [ "$ssv" -eq 1 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Sealed System Volume is enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Sealed System Volume is disabled and the system should wiped after backing up and files"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

