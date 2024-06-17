#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Disable Remote Management
# Edward Byrd		  09/21/20	 Update to system call
# Edward Byrd		  11/02/22	 Updated name of the script to conform to other sce and more specific check
# Edward Byrd		  06/27/23	 Update to echo why it failed

ardagent=$(
ps -ef | awk '/ARDAgent/ {print $8}' | head -1 | grep -c "/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/MacOS/ARDAgent"

)


if [ $ardagent == 0 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: Remote Management is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The Remote Management daemon needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi