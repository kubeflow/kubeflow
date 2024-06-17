#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/03/22	 Check file extensions are shown
#

for DIR in $(find /Users -type d -maxdepth 1); do
	PREF=$DIR/Library/Preferences/.GlobalPreferences
	if [ -e $PREF.plist ]; then
		fileextension=$(defaults read $PREF.plist 2>&1 | grep AppleShowAllExtensions | grep -c "AppleShowAllExtensions = 1;")
		if [ $fileextension == 1 ]; then
			[ -z "$output" ]
		else
			[ -z "$output" ] && output="User: \"$DIR\" does not have filename extensions enabled" 
		fi
	fi
done

	# If test passed, then no output would be generated. If so, we pass
if [ -z "$output" ] ; then
	echo "PASSED: All users have Finder showing all filename extensions"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following user(s) do not have filename extensions showing:"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
fi
