#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/19/21   Check that users home directory belongs to user's primary group


passing="" output="" output2="" user="" dir=""

awk -F: '($1!~/(halt|sync|shutdown|nfsnobody)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1 " " $4 " " $6}' /etc/passwd | (while read -r user grp dir; do
	if [ ! -d "$dir" ]; then
		[ -z "$output2" ] && output2="The following users' home directories don't exist: \"$user\"" || output2="$output2, \"$user\""
	else
		hgrp="$(stat -L -c "%g" "$dir")"
		if [ "$hgrp" != "$grp" ]; then
			[ -z "$output" ] && output="The following users' home directory: \"$user\" belongs to group \"$(stat -L -c "%G" "$dir")\"" || output="$output, \"$user\" home directory belongs to group \"$(stat -L -c "%G" "$dir")\""
		fi
	fi
done

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  All users home directorys belong to user's primary group"
	[ -n "$output2" ] && echo "WARNING: $output2"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$output" ] && echo "$output"
    [ -n "$output2" ] && echo "WARNING: $output2"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
)