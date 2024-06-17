#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name		       Date       Description
# -------------------------------------------------------------------
# Edward Byrd 	 	  02/25/21   Check WiFi in the Menu Bar
# Edward Byrd 	 	  11/10/22   Updated Audit and naming convention
# Edward Byrd		  06/27/23	 Removed check for individuals users and just for profiles
#

wifiprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.controlcenter')\
.objectForKey('WiFi').js
EOS
)

if [ "$wifiprofile" == "18" ]; then
  output=True
else
  output=False
fi


	# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: A profile is installed that shows the Wi-Fi staus in the Menu Bar"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that enables Wi-Fi staus to be shown in the Menu Bar"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


