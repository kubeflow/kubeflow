#!/usr/bin/env sh
  
#
# CIS-CAT Script Check Engine
#
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         05/12/21   2.4.7 - Disable Bluetooth Sharing
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd		  11/03/22	 Updated the check and updated the name to match new sce name
#


UUID=$(ioreg -rd1 -c IOPlatformExpertDevice | grep "IOPlatformUUID" | sed -e 's/^.* "\(.*\)"$/\1/')

for DIR in $(find /Users -type d -maxdepth 1); do
        PREF=$DIR/Library/Preferences/ByHost/com.apple.Bluetooth.$UUID
        if [ -e $PREF.plist ]; then
                BTSharing=$(defaults read $PREF.plist PrefKeyServicesEnabled 2>&1)
                if [ -n "$BTSharing" ]; then
	                if [ "$BTSharing" -eq "1" ]; then
    	                    [ -z "$output" ] && output="User: \"$DIR\" has Bluetooth Sharing Enabled"
        	        fi
				fi
        fi
done

# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
        echo "PASSED: All users have Bluetooth Sharing Disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following user(s) have Bluetooth Sharing Enabled:"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
