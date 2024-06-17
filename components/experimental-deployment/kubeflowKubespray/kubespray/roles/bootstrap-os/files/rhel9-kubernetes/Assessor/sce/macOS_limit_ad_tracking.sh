#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name		       Date       Description
# -------------------------------------------------------------------
# Edward Byrd 	 	  11/08/22   Check if Limit Ad Tracking is enabled
# Edward Byrd		  06/27/23	 Update to echo why it failed and removed the individual user check
#

adprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.applicationaccess')\
.objectForKey('allowApplePersonalizedAdvertising').js
EOS)

if [ "$adprofile" = false ]; then
  output=True
else
  output=False
fi

# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: A profile is installed that limits ad tracking"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: FAILED: A profile needs to be installed that limits ad tracking"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
fi


