#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/22/20   Disable Automatic Login
# Edward Byrd         11/08/22   Updated for the new naming and new audit
# Edward Byrd		  06/27/23	 Updated the output
# 

automaticlogin=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.loginwindow')\
  .objectForKey('com.apple.login.mcx.DisableAutoLoginClient'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.loginwindow')\
  .objectForKey('autoLoginUser'))
  if ( pref1 == 1 || pref2 == null ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)

if [ "$automaticlogin" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Automatic login is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Automatic login is enabled and needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


