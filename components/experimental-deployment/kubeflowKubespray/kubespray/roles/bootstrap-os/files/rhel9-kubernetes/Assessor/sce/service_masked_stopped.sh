#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/23/20   Check that service is stopped and masked
# E. Pinnell   03/12/21   Modified to accept service doesn't exist
# E. Pinnell   10/20/21   Modified to use more reliable tests

passing=""

tst1="$(systemctl show "$XCCDF_VALUE_REGEX" | awk -F '=' '/UnitFileState=/ {print $2}')"
[ -z "$tst1" ] && tst1="$(systemctl show "$XCCDF_VALUE_REGEX" | awk -F '=' '/LoadState=/ {print $2}')"
tst2="$(systemctl show "$XCCDF_VALUE_REGEX" | awk -F '=' '/ActiveState=/ {print $2}')"
output="Service $XCCDF_VALUE_REGEX is $tst1 and $tst2"

if [ "$tst1" = "masked" ] || [ "$tst1" = "not-found" ]; then
	[ "$tst2" = "inactive" ] && passing="true"
fi

if [ "$passing" = "true" ]; then
	# print the reason why we are passing
	echo "PASSED:"
	echo "$output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED:"
	echo "$output"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi