#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/08/20   Ensure Location Services is enabled
# Edward Byrd         10/22/21   Update Check
# Edward Byrd         06/22/22   Update for plist check
# 

locationservice=$(
launchctl list | grep -c com.apple.locationd
)

locationplist=$(
defaults read /var/db/locationd/Library/Preferences/ByHost/com.apple.locationd LocationServicesEnabled
)


if [ $locationservice == 1 ] && [ $locationplist == 1 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

