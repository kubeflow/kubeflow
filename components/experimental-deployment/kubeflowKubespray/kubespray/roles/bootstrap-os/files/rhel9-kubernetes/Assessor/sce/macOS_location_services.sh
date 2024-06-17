#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/08/20   Ensure Location Services is enabled
# Edward Byrd         10/22/21   Update Check
# Edward Byrd         06/22/22   Update for plist check
# Edward Byrd         06/22/22   Update script name and plist check
# Edward Byrd		  06/27/23	 Update to echo why it failed
# 

locationservice=$(
launchctl list | grep -c com.apple.locationd
)

locationplist=$(
defaults read /var/db/locationd/Library/Preferences/ByHost/com.apple.locationd LocationServicesEnabled
)


if [ $locationservice == 1 ] && [ "$locationplist" == "1" ] ; then
  output=True
else
  output=False
fi

# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Location services are enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Location services are disabled and need to be started"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi



