#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         11/08/22   Check that firewall logging is enabled
# Edward Byrd		  07/07/23	 Updated the output
#

firewalllogging=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
  let pref1 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.security.firewall')\
  .objectForKey('EnableLogging').js
  let pref2 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.security.firewall')\
  .objectForKey('LoggingOption').js
  let pref3 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.alf')\
  .objectForKey('loggingenabled').js
  let pref4 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.alf')\
  .objectForKey('loggingoption').js
  if ( ( pref1 == true && pref2 == "detail" ) || ( pref3 == 1 && pref4 == 2 ) ) {
    return("true")
  } else {
    return("false")
  }
}
EOS
)

if [ "$firewalllogging" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Firewall logging and the detail log option are enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Firewall logging or the deteil log option is not enabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


