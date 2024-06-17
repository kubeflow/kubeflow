#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name		       Date       Description
# -------------------------------------------------------------------
# Edward Byrd 	 10/28/21   Check AirPlay Receiver
#

UUID=$(ioreg -rd1 -c IOPlatformExpertDevice | grep "IOPlatformUUID" | sed -e 's/^.* "\(.*\)"$/\1/')

for DIR in $(find /Users -type d -maxdepth 1); do
	PREF=$DIR/Library/Preferences/ByHost/com.apple.controlcenter.$UUID
	if [ -e $PREF.plist ]; then
		AirPlayDisabled=$(defaults read $PREF.plist AirplayRecieverEnabled 2>&1)
		if [ $AirPlayDisabled -ne 0 ]&& echo $AirPlayDisabled; then
			[ -z "$output" ] && output="User: \"$DIR\" has the AirPlay Receiver disabled" 
		fi
	fi
done

# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
	echo "PASSED: All users have the AirPlay Receiver disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following users' do not have the AirPlay Receiver disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

