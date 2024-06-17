#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/08/22	 Check a login message is set
# Edward Byrd		  07/06/23	 Update to echo why it failed
#

loginmessage=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.loginwindow')\
.objectForKey('LoginwindowText').js
EOS
)


if [ "$loginmessage" == "" ]; then
  output=False
else
  output=True
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: A message is set for the login screen"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A message on the login screen needs to be set and enabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


