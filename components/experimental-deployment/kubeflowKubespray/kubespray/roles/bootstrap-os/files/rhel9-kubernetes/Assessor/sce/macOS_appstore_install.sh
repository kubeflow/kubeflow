#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  10/31/22	 Check that App Store applications install automatically
# Edward Byrd		  06/19/23	 Update to echo why it failed
#

appstoreupdate=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.commerce')\
  .objectForKey('AutoUpdate'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.SoftwareUpdate')\
  .objectForKey('AutomaticallyInstallAppUpdates'))
  if ( pref1 == 1 || pref2 == 1 ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)


if [ "$appstoreupdate" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: App Store updates are being automatically installed"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: App Store updates are not being installed automatically"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
