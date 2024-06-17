#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/29/20   Check dot files don't exist in users home directory
# E. Pinnell   12/01/21   Modified to also look at the root account

passing=""
output=""
output2=""
user=""
dir=""

for i in $(awk -F: '($1!~/(halt|sync|shutdown)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1":"$6}' /etc/passwd); do
	user=$(echo "$i" | cut -d: -f1)
	dir=$(echo "$i" | cut -d: -f2)
	if [ ! -d "$dir" ]; then
		[ -z "$output" ] && output="The following users' home directories don't exist: \"$user\"" || output="$output, \"$user\""
	else
		file="$dir/$XCCDF_VALUE_REGEX"
		if [ ! -h "$file" ] && [ -f "$file" ]; then 
			[ -z "$output2" ] && output2="User: \"$user\" file: \"$file\" exists" || output2="$output2; User: \"$user\" file: \"$file\" exists"
		fi
	fi
done

[ -z "$output2" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed: No \"$XCCDF_VALUE_REGEX\" file exist in users' home directories"
	[ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: $output2"
    [ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi