#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/21/20   Enable Security Audit
# Edward Byrd         10/22/21   Update Check
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  06/27/23	 Updated the output
#

securityaudit=$(
launchctl list | grep -c auditd
)

if [ $securityaudit == 1 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Security auditing is enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    echo "FAILED: Security auditing is disabled and the service needs to be loaded"    
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


