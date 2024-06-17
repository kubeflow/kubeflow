#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/03/22	 Check that if Time Machine is enabled then auto back is enabled
# Edward Byrd		  06/27/23	 Update to echo why it failed
#

autotimemachine=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.TimeMachine')\
  .objectForKey('AutoBackup'))
  let pref2 = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.TimeMachine')\
  .objectForKey('LastDestinationID'))
  if ( pref2  == null ) {
    return("Preference Not Set")
  }  else if ( pref1 == 1 ) {
    return("true")
  }  else {
    return("false")
  }
}
EOS
)


if [ "$autotimemachine" == "Preference Not Set" ]; then
	echo "Time Machine is not enabled so the computer is compliant"
    exit "${XCCDF_RESULT_PASS:-101}"
else if [ "$autotimemachine" == "true" ]; then
  output=True
else
  output=False
fi
fi

	# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Time Machine is either disabled or if it is enabled has automatic backups enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Time Machine is enabled but does not have auto backup enabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

