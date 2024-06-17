#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  01/19/20   Updated to check versus newest audit
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Updated the output and audit
#

httpd=$(
/bin/launchctl list | /usr/bin/grep -c "org.apache.httpd"
)

if [ $httpd -eq 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The httpd service is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The httpd service is running and needs to be unloaded and disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

