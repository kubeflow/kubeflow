#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         05/12/21   6.3. - Disable Open "Safe" Files Automatically in Safari
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
#


for DIR in $(find /Users -type d -maxdepth 1); do
	PREF=$DIR/Library/Containers/com.apple.Safari/Data/Library/Preferences/com.apple.Safari
	if [ -e $PREF.plist ]; then
		SafariSafeFiles=$(defaults read $PREF.plist AutoOpenSafeDownloads 2>&1)
		 if [ -n "$SafariSafeFiles" ]; then	
			if [ $SafariSafeFiles -ne 0 ] && echo $SafariSafeFiles; then
				[ -z "$output" ] && output="User: \"$DIR\" is allowing 'safe' files to open automatically" 
			fi
		fi
	fi
done

# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
	echo "PASSED: All users have Open 'safe' files after downloading disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following users have Open 'safe' files after downloading enabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi