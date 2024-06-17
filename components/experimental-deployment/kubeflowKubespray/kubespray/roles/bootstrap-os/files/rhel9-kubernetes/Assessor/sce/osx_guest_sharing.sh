#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         06/16/22   Guest Sharing Disabled
# 

guestapfs=$(
defaults read /Library/Preferences/com.apple.AppleFileServer | grep -A 0 guestAccess | grep -c "guestAccess = 1;"
)

guestsmb=$(
defaults read /Library/Preferences/SystemConfiguration/com.apple.smb.server | grep -A 0 AllowGuestAccess | grep -c "AllowGuestAccess = 1"
)


if [ $guestapfs == 0 ] && [ $guestsmb == 0 ]; then 
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



