#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         05/13/20   Disable Guest Login
# Edward Byrd         11/08/22   Updated for the new naming and new audit
# Edward Byrd		  06/27/23	 Updated the output
#

guestlogin=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.MCX')\
  .objectForKey('DisableGuestAccount'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.loginwindow')\
  .objectForKey('GuestEnabled'))
  if ( pref1 == 1 || pref2 == 0 ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)

if [ "$guestlogin" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The guest login is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The gues login is enabled and needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

