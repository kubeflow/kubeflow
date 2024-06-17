#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         06/14/22   Disable Internet Sharing
# Edward Byrd		  11/02/22	 Updated name of the script and added profile check
# Edward Byrd		  06/27/23	 Update to echo why it failed
#

internetshare=$(
defaults read /Library/Preferences/SystemConfiguration/com.apple.nat 2>&1 | grep -c "Enabled = 1;"
)

internetshareprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.MCX')\
.objectForKey('forceInternetSharingOff').js
EOS
)

if [ "$internetshareprofile" = "true"  ] ; then
	echo "$PASSED: A profile that disables Internet sharing is installed"
    exit "${XCCDF_RESULT_PASS:-101}"	
elif [ $internetshare -eq 0  ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: Internet sharing is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile that disables internet sharing needs to be installed or the internet sharing daemon needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi