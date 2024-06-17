#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/19/19   Check that users own their home directory
# E. Pinnell   06/16/20   Modified to account for root owning nfsnobody home directory
# E. Pinnell   07/27/20   Modified to enhance output

passing=""
output=""
output2=""
user=""
dir=""

for i in $( awk -F: '($1!~/(halt|sync|shutdown|nfsnobody)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1":"$6}' /etc/passwd); do
	user=$(echo "$i" | cut -d: -f1)
	dir=$(echo "$i" | cut -d: -f2)
	if [ ! -d "$dir" ]; then
		[ -z "$output2" ] && output2="The following users' home directories don't exist: \"$user\"" || output2="$output2, \"$user\""
	else
		owner="$(stat -L -c "%U" "$dir")"
		if [ "$owner" != "$user" ] && [ "$owner" != "root" ]; then
			[ -z "$output" ] && output="The following users' don't own their home directory: \"$user\" home directory is owned by \"$owner\"" || output="$output, \"$user\" home directory is owned by \"$owner\""
		fi
	fi
done

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  All users own their home directory"
	[ -n "$output2" ] && echo "WARNING: $output2"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$output" ] && echo "$output"
    [ -n "$output2" ] && echo "WARNING: $output2"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi