#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  09/15/20   Set an inactivity interval of 20 minutes or less for the screen saver
#

UUID=$(ioreg -rd1 -c IOPlatformExpertDevice | grep "IOPlatformUUID" | sed -e 's/^.* "\(.*\)"$/\1/')

for DIR in $(find /Users -type d -maxdepth 1); do
	PREF=$DIR/Library/Preferences/ByHost/com.apple.screensaver.$UUID
	if [ -e $PREF.plist ]; then
		ITIME=$(defaults read $PREF.plist idleTime 2>&1)
		if [ "$ITIME" -gt "1200" ] || [ "$ITIME" = "0" ]; then
			[ -z "$output" ] && output="User: \"$DIR\" idle timeout is \"$ITIME\"" || output="$output, User: \"$DIR\" idle timeout is \"$ITIME\""
		fi
	fi
done

# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
	echo "PASSED: All users' screen saver has an inactivity interval of 20 minutes or less"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following users' screen saver has an inactivity interval greater than 20 minutes"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi