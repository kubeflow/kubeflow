#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/05/22   Check user home directory existence

output=""
valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
awk -v pat="$valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | (while read -r user home; do
	[ ! -d "$home" ] && output="$output\n  - User \"$user\" home directory \"$home\" doesn't exist"
done

# If the tests produce no output, we pass
if [ -z "$output" ]; then
	echo -e "\n-PASSED: - All local interactive users have a home directory"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- FAILED:\n$output\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)