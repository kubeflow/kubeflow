#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/08/22	 Check that the login window shows as name and password
# Edward Byrd		  07/06/23	 Update to echo why it failed
#

loginshowname=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.loginwindow')\
.objectForKey('SHOWFULLNAME').js
EOS
)


if [ "$loginshowname" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The login window dispalys name and password"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The login windows needs to display name and password, not the individual user icons"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

