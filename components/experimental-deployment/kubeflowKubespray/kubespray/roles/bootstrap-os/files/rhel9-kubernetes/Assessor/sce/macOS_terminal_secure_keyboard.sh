#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd 		  11/08/22   Enable Secure Keyboard in Terminal
# Edward Byrd		  07/12/23	 Update to output and removed individual user audit
#

terminalprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.Terminal')\
.objectForKey('SecureKeyboardEntry').js
EOS
)

if [ "$terminalprofile" == "true" ]; then
  output=True
else
  output=False
fi

# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Profile installed to secure keyboard entries in Terminal"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that enables secure keyboard enteries in Terminal"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi














