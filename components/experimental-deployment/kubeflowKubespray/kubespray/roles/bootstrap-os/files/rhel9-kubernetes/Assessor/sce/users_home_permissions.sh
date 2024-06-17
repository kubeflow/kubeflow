#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/23/20   Check that All users' home permissions are 750 or more restrictive

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
		dirperm=$(stat -L -c "%A" "$dir")
		if [ "$(echo "$dirperm" | cut -c6)" != "-" ] || [ "$(echo "$dirperm" | cut -c8)" != "-" ] || [ "$(echo "$dirperm" | cut -c9)" != "-" ] || [ "$(echo "$dirperm" | cut -c10)" != "-" ]; then
			[ -z "$output2" ] && output2="User: \"$user\" home directory: \"$dir\" has permissions: \"$(stat -L -c "%a" "$dir")\"" || output2="$output2; User: \"$user\" home directory: \"$dir\" has permissions: \"$(stat -L -c "%a" "$dir")\""
		fi
	fi
done

[ -z "$output2" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  All users' home directory permissions are \"750\" or more restrictive"
	[ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$output2" ] && echo "$output2"
    [ -n "$output" ] && echo "WARNING: $output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi