#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/10/20   Check that Uncomplicated Firewall (UFW) is enabled (active)


passing=""
output=""

if dpkg-query -s ufw 2>/dev/null | grep -q 'Status: install ok installed';then
	output=$(ufw status | grep 'Status')
	ufw status | grep 'Status: active' && passing=true
else
	output="UFW is not installed"
fi

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed. UFW status is: \"$output\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed. UFW status is: \"$output\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi