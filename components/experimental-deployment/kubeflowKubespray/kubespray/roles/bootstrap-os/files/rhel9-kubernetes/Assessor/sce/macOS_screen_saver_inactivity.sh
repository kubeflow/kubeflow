#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  		  09/15/20   Set an inactivity interval of 20 minutes or less for the screen saver
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/06/23	 Update to echo why it failed and removed the individual user check
#

screensaverinterval=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let timeout = ObjC.unwrap($.NSUserDefaults.alloc.initWithSuiteName('com.apple.screensaver')\
.objectForKey('idleTime'))
  if ( timeout <= 1200 ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)



if [ "$screensaverinterval" == "true" ]; then
  output=True
else
  output=False
fi


# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: A profile is installed that sets the screen saver to have an inactivity interval of 20 minutes or less"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Install a profile that sets the screen saver interval to 20 minutes or less"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi





