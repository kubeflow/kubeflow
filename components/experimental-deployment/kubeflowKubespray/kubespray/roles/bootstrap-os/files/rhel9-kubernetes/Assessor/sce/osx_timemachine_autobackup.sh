#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Time Machine Auto-Backup
# Eric Pinnell        04/23/20   Corrected test error
# Edward Byrd		  05/12/21	 Added Verification of Time Machine Being Enabled
#

passing=""
output=$(defaults read /Library/Preferences/com.apple.TimeMachine.plist AutoBackup)
timemachineenabled=$(tmutil destinationinfo)

defaults read /Library/Preferences/com.apple.TimeMachine.plist AutoBackup | grep -Eq "[^0]" && passing=true

# If results returns pass, otherwise fail.
if [ "$timemachineenabled" = "tmutil: No destinations configured." ] || [ "$output" == "1" ] ; then
	echo "Passed, AutoBackup is set to: \"$output\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
# print the reason why we are failing
	echo "Failed, AutoBackup is set to: \"$output\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi

#echo "$output"
#exit "${XCCDF_RESULT_PASS:-101}"