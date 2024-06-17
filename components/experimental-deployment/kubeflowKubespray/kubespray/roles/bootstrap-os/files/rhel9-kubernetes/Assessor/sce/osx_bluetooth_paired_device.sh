#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         05/12/21   2.1.1 - Turn Off BlueTooth If No Paired Device
# Edward Byrd         07/26/21   Updated the check for a paired device

bluetoothstatus=$(
defaults read /Library/Preferences/com.apple.Bluetooth ControllerPowerState
)

paireddevices=$(
system_profiler SPBluetoothDataType 2>/dev/null | grep -m1 'Paired: Yes' | grep -c 'Paired: Yes'
)


if [ $bluetoothstatus -eq 1 ] && [ "$paireddevices" -eq 1 ]; then
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



