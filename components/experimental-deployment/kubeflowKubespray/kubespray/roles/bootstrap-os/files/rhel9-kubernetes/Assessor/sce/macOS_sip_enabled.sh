#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/04/20   Ensure Integrity Protection is enabled
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Updated the output
# 

sip=$(
csrutil status
)

if [ "$sip" == "System Integrity Protection status: enabled." ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: System Integrity Protection is enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: System Integrity Protection is disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

