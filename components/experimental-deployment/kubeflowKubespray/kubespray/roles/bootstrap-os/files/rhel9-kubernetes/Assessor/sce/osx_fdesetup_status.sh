#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure FireVault is enabled
# Edward Byrd		  06/14/22	 Updated for profile check
#

output=$(
fdesetup status
)

filevaultprofile=$(
profiles -P -o stdout | grep -c "dontAllowFDEDisable = 1"
)

# If result returns it is enabled pass, otherwise fail.
if [ "$output" == "FileVault is On." ] && [ $filevaultprofile == 1 ]; then
	echo "FileVault is enabled and cannot be disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FileVault is disabled or can be disabled"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
