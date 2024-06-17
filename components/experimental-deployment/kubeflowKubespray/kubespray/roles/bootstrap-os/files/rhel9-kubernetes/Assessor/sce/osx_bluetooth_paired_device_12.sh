#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         11/19/21   Forked from osx_bluetooth_paired_device.sh to work with 12.0 Monterey
#

bluetoothstatus=$(
defaults read /Library/Preferences/com.apple.Bluetooth 2>/dev/null | grep -c ControllerPowerState
)

paireddevices=$(
system_profiler SPBluetoothDataType 2>/dev/null | grep -m1 'Connected: Yes' | grep -c 'Connected: Yes'
)


if [ $bluetoothstatus == 0 ]; then
  output=True
elif [ $bluetoothstatus == 1 ] && [ $paireddevices == 1 ]; then
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

