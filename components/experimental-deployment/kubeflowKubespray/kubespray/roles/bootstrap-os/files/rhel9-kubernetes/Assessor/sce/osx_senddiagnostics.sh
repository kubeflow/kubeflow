#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/01/20   Ensure diagnostics and usage data is not sent to Apple
# 

senddiag=$(
defaults read /Library/Application\ Support/CrashReporter/DiagnosticMessagesHistory.plist | grep 'AutoSubmit =' | awk '{print $3}' | cut -d';' -f1
)

if [ $senddiag == 0 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

