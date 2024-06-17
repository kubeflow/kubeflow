#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/22/19   Check if wireless is disabled

nmcli radio all | grep -Eq "^\s*\S+\s+disabled\s+\S+\s+disabled\s*$" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "Wireless is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Wireless is not disabled"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi