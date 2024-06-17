#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  10/31/22	 Check that firewall is enabled
# Edward Byrd		  06/19/23	 Update to echo why it failed
#

firewallstealth=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.alf')\
  .objectForKey('stealthenabled'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.security.firewall')\
  .objectForKey('EnableStealthMode'))
  if ( ( pref1 == 1 ) || ( pref2 == "true" ) ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)


if [ "$firewallstealth" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: Firewall stealth mode is enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Firewall stealth mode is not enabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

