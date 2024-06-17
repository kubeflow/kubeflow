#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/24/20   Check that All users' .netrc files are 600 or more restrictive

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
		file="$dir/.netrc"
		if [ ! -h "$file" ] && [ -f "$file" ]; then
			if stat -L -c "%A" "$file" | cut -c4-10 |  grep -E '[^-]+'; then
				[ -z "$output2" ] && output2="User: \"$user\" file: \"$file\" has permissions: \"$(stat -L -c "%a" "$file")\"" || output2="$output2; User: \"$user\" file: \"$file\" has permissions: \"$(stat -L -c "%a" "$file")\""
			fi
		fi
	fi
done

[ -z "$output2" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed: All users' .netrc files are \"600\" or more restrictive"
	[ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$output2" ] && echo "$output2"
    [ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi