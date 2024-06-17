#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/01/21   Ensure inactive password lock

passing="" output=""

awk -F : '/^[^:]+:[^\!*]/{print $1 " " $7}' /etc/shadow | (while read -r usr days; do
	if [ "$days" -le "$XCCDF_VALUE_REGEX" ] && [ "$days" -gt 0 ]; then
		[ -z "$output" ] && passing=true
	else
		passing=""
		[ -z "$output" ] && output="FAILED: User: \"$usr\" inactive password lock is: \"$days\" days" || output="$output, User: \"$usr\" inactive password lock is: \"$days\" days"
	fi
done

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASSED: All uses inactive password lock is 30 days or less"
	exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "$output"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)