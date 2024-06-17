#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/19/21   Check that users own all files and directories in their home directory

passing="" output="" output2="" user="" dir=""

awk -F: '($1!~/(halt|sync|shutdown|nfsnobody)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1 " " $6}' /etc/passwd | (while read -r user dir; do
	if [ ! -d "$dir" ]; then
		[ -z "$output2" ] && output2="The following users' home directories don't exist: \"$user\"" || output2="$output2, \"$user\""
	else
		if [ -n "$(find "$dir" ! -user "$user")" ]; then
			[ -z "$output" ] && output="User: \"$user\" has files they don't own it their home directory: \"$dir\"" || output="$output, User: \"$user\" has files they don't own it their home directory: \"$dir\""
		fi
	fi
done

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  All files in users home directorys belong to the user"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	[ -n "$output" ] && echo "$output"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)