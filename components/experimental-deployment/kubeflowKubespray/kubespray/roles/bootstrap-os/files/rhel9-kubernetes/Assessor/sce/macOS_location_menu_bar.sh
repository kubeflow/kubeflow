#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/08/22	 Verify location services in menu bar
# Edward Byrd		  06/27/23	 Update to echo why it failed
#

locationmenubar=$(
/usr/bin/defaults read /Library/Preferences/com.apple.locationmenu.plist ShowSystemServices
)


if [ $locationmenubar = 1 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
		echo "PASSED: Location services are displayed in the Menu Bar"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Location services are not disaplyed in the Menu Bar"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

