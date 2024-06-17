#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         11/08/22   Check Bonjour Advertising
# Edward Byrd		  07/07/23	 Updated the output
#

bonjourservice=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.mDNSResponder')\
.objectForKey('NoMulticastAdvertisements').js
EOS)

if [ "$bonjourservice" == "true" ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The bonjour service is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The bonjour service needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
