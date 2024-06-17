#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# B. Munyan  11/21/17   Ensure there is a config in auditd matching the regex
# B. Munyan  02/04/19   Unix line endings
# 

interim=$(
	defaults read /Library/Preferences/com.apple.Bluetooth ControllerPowerState | grep '1' && 
		for i in $(find /Users -type d -maxdepth 1); 
			do PREF=$i/Library/Preferences/com.apple.systemuiserver; 
				if [ -e $PREF.plist ]; 
				then /bin/echo -n "Checking User: '$i': "; defaults read $PREF menuExtras 2>&1 | grep Bluetooth.menu || echo 'Not Set'; 
				fi; 
		done
)
output=$(
	echo "$interim" | egrep "Not Set$"
)

# If the regex matched, output would be generated.  If so, we fail
if [ "$output" != "" ] ; then
    # print the reason why we are failing
    echo "Fail: $output"
    exit "${XCCDF_RESULT_FAIL:-102}"
else
    exit "${XCCDF_RESULT_PASS:-101}"
fi

