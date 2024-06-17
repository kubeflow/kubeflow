#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/23/20   Check that service is running and not disabled or masked
# E. Pinnell   03/03/21   Modified to allow of active service to be is exited state
# E. Pinnell   10/20/21   Modified to use more reliable tests

tst1="$(systemctl show "$XCCDF_VALUE_REGEX" | awk -F '=' '/UnitFileState=/ {print $2}')"
tst2="$(systemctl show "$XCCDF_VALUE_REGEX" | awk -F '=' '/ActiveState=/ {print $2}')"
output="Service $XCCDF_VALUE_REGEX is $tst1 and $tst2"

if [ "$tst1" = "enabled" ] && [ "$tst2" = "active" ]; then
	echo "PASSED:"
	echo "$output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED:"
	echo "$output"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi