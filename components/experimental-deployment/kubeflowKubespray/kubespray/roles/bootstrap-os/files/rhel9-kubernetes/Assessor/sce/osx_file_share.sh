#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/21/20   Disable File Sharing
# Edward Byrd         01/20/21   Updated for new file sharing check
# 

afpshare=$(
launchctl list | grep -c AppleFileServer
)

smbshare=$(
launchctl print-disabled system | grep -c '"com.apple.smbd" => true'
)

if [ $afpshare -eq 0 ] && [ $smbshare -eq 1 ]; then
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
