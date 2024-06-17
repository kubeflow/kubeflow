#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         06/16/22   Guest Sharing Disabled
# Edward Byrd 		  11/08/22   Updated for the new naming and removed AFP sharing since it is gone from macOS
# Edward Byrd		  06/27/23	 Updated the output
# 

guestsmb=$(
defaults read /Library/Preferences/SystemConfiguration/com.apple.smb.server | grep -A 0 AllowGuestAccess | grep -c "AllowGuestAccess = 1"
)

if [ $guestsmb == 0 ]; then 
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Guest filing sharing is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Guest file sharing is enabled and needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
