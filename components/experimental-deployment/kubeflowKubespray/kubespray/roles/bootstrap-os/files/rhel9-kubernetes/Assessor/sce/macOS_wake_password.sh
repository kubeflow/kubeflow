#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/08/22	 Check that a password is required to wake the computer
# Edward Byrd		  07/06/23	 Update to echo why it failed 
#

adminpasswordprofile=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.screensaver')\
  .objectForKey('askForPassword'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.screensaver')\
  .objectForKey('askForPasswordDelay'))
  if ( pref1 == 1 && pref2 <= 5 ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)

if [ "$adminpasswordprofile" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: A password is required to wake the OS from sleep or screen saver either immediately or after 5 seconds"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A password is not required to wake the OS from sleep or screen saver, or it is greater than 5 seconds, and it needs to be set to the correct value"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

