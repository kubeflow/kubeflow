#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# Edward Byrd 11/08/22   Ensure Screen Saver Corners Are Secure
#


for DIR in $(find /Users -type d -maxdepth 1); do
	PREF=$DIR/Library/Preferences/com.apple.dock
	if [ -e $PREF.plist ]; then
		hotcorner=$(defaults read $PREF.plist 2>&1 | grep corner | cut -b 25-26 | grep -c "6;")
		if [ $hotcorner -ne 0 ]; then
			[ -z "$output" ] && output="User: \"$DIR\" can disable the screen saver with a hot corner"
		fi
	fi
done

# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
	echo "PASSED: All users' hot corners are secure"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following users' need their hot corners secured"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
