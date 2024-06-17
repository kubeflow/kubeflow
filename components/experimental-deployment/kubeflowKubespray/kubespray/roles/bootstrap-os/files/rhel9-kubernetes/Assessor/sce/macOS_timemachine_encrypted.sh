#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure Time Machine Volumes Are Encrypted
# Eric Pinnell        04/23/20   Correct test error
# Edward Byrd		  05/12/21	 Added Verification of Time Machine Being Enabled Plus updated Check for Status
# Edward Byrd		  10/21/21   Fixed typo in the command to resolve errors 
# Edward Byrd		  10/21/21   Added Check for FileVault flag 
# Edward Byrd		  11/03/22	 Updated the check the script name
#

timemachineencrypted=$(
defaults read /Library/Preferences/com.apple.TimeMachine.plist | grep -c NotEncrypted
)


# If results returns pass, otherwise fail.
if [ $timemachineencrypted == 0 ] ; then
	echo "Passed: Time Machine Backup is Encrypted or Time Machine is not Enabled"
	exit "${XCCDF_RESULT_PASS:-101}"
else
# print the reason why we are failing
	echo "Failed: Time Machine Backup is Not Encrypted"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
#echo "$output"
#exit "${XCCDF_RESULT_PASS:-101}"
