#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/24/20   Check that All users' dot files are not group or world writable
# E. Pinnell   08/04/20   Modified - Corrected error in inner for loop

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
		for file in "$dir"/.*; do
			if [ ! -h "$file" ] && [ -f "$file" ]; then
				fileperm=$(stat -L -c "%A" "$file")
				if [ "$(echo "$fileperm" | cut -c6)" != "-" ] || [ "$(echo "$fileperm" | cut -c9)" != "-" ]; then
					[ -z "$output2" ] && output2="User: \"$user\" file: \"$file\" has permissions: \"$(stat -L -c "%a" "$file")\"" || output2="$output2; User: \"$user\" file: \"$file\" has permissions: \"$(stat -L -c "%a" "$file")\""
				fi
			fi
		done
	fi
done

[ -z "$output2" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed: All users' dot files are not group or world writable"
	[ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$output2" ] && echo "$output2"
    [ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi