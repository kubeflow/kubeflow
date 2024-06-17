#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/08/22	 Check if diagnostic data is being sent to Apple
# Edward Byrd		  06/27/23	 Update to echo why it failed and remove individual user check
#

diagnosticprofile=$(
/usr/bin/osascript -l JavaScript << EOS
function run() {
let pref1 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.SubmitDiagInfo')\
.objectForKey('AutoSubmit').js
let pref2 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.applicationaccess')\
.objectForKey('allowDiagnosticSubmission').js
let pref3 = $.NSUserDefaults.alloc.initWithSuiteName('com.apple.assistant.support')\
.objectForKey('Siri Data Sharing Opt-In Status').js

if ( pref1 == false && pref2 == false && pref3 == 2){
    return("true")
} else {
    return("false")
}
}
EOS
)

if [ "$diagnosticprofile" = true ]; then
  output=True
else
  output=False
fi

	# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Profile installed to disable sending diagnostic data to Apple"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Data and diagnostic data is being sent to Apple"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


