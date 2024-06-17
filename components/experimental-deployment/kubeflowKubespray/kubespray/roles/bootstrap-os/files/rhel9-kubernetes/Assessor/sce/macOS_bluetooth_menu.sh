#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name		       Date       Description
# -------------------------------------------------------------------
# Edward Byrd 	 	  11/08/22   Check Bluetooth in the Menu Bar
# Edward Byrd		  06/27/23	 Removed individual user check and only check for a profile
#

UUID=$(ioreg -rd1 -c IOPlatformExpertDevice | grep "IOPlatformUUID" | sed -e 's/^.* "\(.*\)"$/\1/')

btprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.controlcenter')\
.objectForKey('Bluetooth').js
EOS
)

if [ "$btprofile" == "18" ]; then
  output=True
else
  output=False
fi

	# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: A profile is installed that shows Bluetooth staus in the Menu Bar"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that enables Bluetooth staus to be shown in the Menu Bar"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi



