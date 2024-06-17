#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/15/21   Check that system command files are 0755 or more restrictive

output=""

output=$(find /bin /sbin /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin -perm /022 -type f)

# If passing is true, we pass
if [ -z "$output" ] ; then
	echo "Passed! All system command files are 0755 or more restrictive"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	for file in $output; do
		echo "System command file: \"$file\" is mode: \"$(stat -Lc "%a" "$file")\""
	done
	exit "${XCCDF_RESULT_FAIL:-102}"
fi