#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  10/31/22	 Check that iCloud Desktop and Documents is disabled
# Edward Byrd		  06/19/23	 Update to echo why it failed
#

iclouddocs=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.applicationaccess')\
  .objectForKey('allowCloudDesktopAndDocuments'))
  if ( pref1  == false ) {
    return("true")
  }  else if ( pref1 == null ) {
    return("false")
  }  else {
    return("false")
  }
}
EOS
)


if [ "$iclouddocs" == "true" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: iCloud is not syncing desktops and documents"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that disables iCloud Drive Desktop and Document syncing"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
