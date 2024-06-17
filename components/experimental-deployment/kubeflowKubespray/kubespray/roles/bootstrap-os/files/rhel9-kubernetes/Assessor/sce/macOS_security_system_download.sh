#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  10/31/22	 Check that security and system files automatically download
# Edward Byrd		  06/19/23	 Update to echo why it failed
#

securityupdate=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.SoftwareUpdate')\
  .objectForKey('ConfigDataInstall'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.SoftwareUpdate')\
  .objectForKey('CriticalUpdateInstall'))
  if ( pref1 == 1 && pref2 == 1 ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)


if [ "$securityupdate" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: Security updates are being automatically installed"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Security updates are not being installed automatically"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
