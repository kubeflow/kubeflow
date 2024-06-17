#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/01/21   Ensure password expiration is 365 days or less

passing="" output=""

awk -F : '/^[^:]+:[^!*]/{print $1 " " $5}' /etc/shadow | (while read -r usr days; do
	if [ "$days" -le "$XCCDF_VALUE_REGEX" ] && [ "$days" -gt 0 ]; then
		[ -z "$output" ] && passing=true
	else
		passing=""
		[ -z "$output" ] && output="FAILED: User: \"$usr\" password expires in: \"$days\" days" || output="$output, User: \"$usr\" password expires in: \"$days\" days"
	fi
done

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASSED: All uses password expiration is 365 days or less"
	exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "$output"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)