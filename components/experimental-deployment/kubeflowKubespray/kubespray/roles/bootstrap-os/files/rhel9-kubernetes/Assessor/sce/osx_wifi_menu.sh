#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name		       Date       Description
# -------------------------------------------------------------------
# Edward Byrd 	 02/25/21   Check WiFi in the Menu Bar
# Edward Byrd 	 11/10/22   Updated Audit
#

UUID=$(ioreg -rd1 -c IOPlatformExpertDevice | grep "IOPlatformUUID" | sed -e 's/^.* "\(.*\)"$/\1/')

wifiprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.controlcenter')\
.objectForKey('WiFi').js
EOS
)

if [ "$wifiprofile" == "18" ]; then
	echo "PASSED: Profile installed to enable the WiFi status in the menu bar"
    exit "${XCCDF_RESULT_PASS:-101}"
else
	for DIR in $(find /Users -type d -maxdepth 1); do
	PREF=$DIR/Library/Preferences/ByHost/com.apple.controlcenter.$UUID
	if [ -e $PREF.plist ]; then
		WiFiMenu=$(defaults read $PREF.plist WiFi 2>&1)
		if [ "$WiFiMenu" -ne "18" ]; then
			[ -z "$output" ] && output="User: \"$DIR\" does not have WiFi status in their menu bar" 
		fi
	fi
done

# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
	echo "PASSED: All users have the WiFi status in the Menu Bar"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following user(s) do not have the WiFi status in their Menu Bar"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
fi
