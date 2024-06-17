#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/15/21   Check that log files are 0640 or more restrictive

output=""

output=$(find -L /var/log -xdev -perm /027 ! -type d)

# If passing is true, we pass
if [ -z "$output" ] ; then
	echo "Passed! All files in /var/log are 0640 or more restrictive"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	for file in $output; do
		echo "File: \"$file\" is mode: \"$(stat -Lc "%a" "$file")\""
	done
	exit "${XCCDF_RESULT_FAIL:-102}"
fi