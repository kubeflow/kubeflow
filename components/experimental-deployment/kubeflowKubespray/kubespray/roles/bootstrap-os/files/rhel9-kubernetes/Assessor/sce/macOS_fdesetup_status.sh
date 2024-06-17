#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure FireVault is enabled
# Edward Byrd		  06/14/22	 Updated for profile check
# Edward Byrd		  11/08/22	 Updated to new audit check
#

filevaultstatus=$(
fdesetup status
)

filevaultprofile=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.MCX')\
.objectForKey('dontAllowFDEDisable').js
EOS
)

# If result returns it is enabled pass, otherwise fail.
if [ "$filevaultstatus" == "FileVault is On." ] && [ "$filevaultprofile" == "true" ]; then
	echo "FileVault is enabled and cannot be disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FileVault is disabled or can be disabled"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
