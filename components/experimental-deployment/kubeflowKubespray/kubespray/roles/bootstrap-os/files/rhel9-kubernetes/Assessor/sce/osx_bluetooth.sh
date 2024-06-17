#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# B. Munyan  11/21/17   Ensure there is a config in auditd matching the regex
# B. Munyan  02/04/19   Unix line endings
# 

STATE=$(defaults read /Library/Preferences/com.apple.Bluetooth ControllerPowerState)
PAIRED=$(system_profiler SPBluetoothDataType | grep "Connectable" | awk '{print $2}')

output=$(
	echo "Enabled=$STATE;Paired=$PAIRED" | egrep "Enabled=(0|1);Paired=Yes" #"$XCCDF_VALUE_REGEX"
)

# If the regex matched, output would be generated.  If so, we pass
if [ "$output" != "" ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Fail: Enabled=$STATE;Paired=$PAIRED"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
