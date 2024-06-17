#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/08/22	 Check that the password hints aren't shown on the login window
# Edward Byrd		  07/06/23	 Update to echo why it failed
#

showpasswordhints=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.loginwindow')\
.objectForKey('RetriesUntilHint').js
EOS
)


if [ $showpasswordhints == 0 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Password hints are disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Password hints are being displayed and need to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
