#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/21/20   Disable DVD or CD Sharing
# Edward Byrd         02/25/21   Updated with new commands
# Edward Byrd		  11/02/22	 Updated name of the script to conform to other sce
# Edward Byrd		  06/19/23	 Update to echo why it failed
# 

dvdshare=$(
/bin/launchctl list | grep -c com.apple.ODSAgent
)

if [ $dvdshare -eq 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: DVD and CD sharing is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The DVD and CD sharing daemon needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
