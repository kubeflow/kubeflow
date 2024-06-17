#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/19/21   Check that users home directory files and directories belong to group user is a member of

passing="" output="" output2="" user="" dir=""

awk -F: '($1!~/(halt|sync|shutdown|nfsnobody)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1 " " $6}' /etc/passwd | (while read -r user dir; do
  if [ ! -d "$dir" ]; then
		[ -z "$output2" ] && output2="The following users' home directories don't exist: \"$user\"" || output2="$output2, \"$user\""
	else
		for i in $(find "$dir"/* -maxdepth 0 -xdev); do
			fgrp=$(stat -L -c "%G" "$i")
			if ! groups "$user" | cut -d: -f2 | grep -Eq "\b$fgrp\b"; then
				if [ -z "$output" ]; then
					output="User: \"$user\" has files in a group their not a member of it their home directory: \"$dir\""
				else
					[ -z "$(echo "$output" | grep -E "\b$user\b")" ] && output="$output, User: \"$user\" has files in a group their not a member of it their home directory: \"$dir\""
				fi
			fi
		done
	fi
done

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  All files in users home directorys belong to a group the user is a member of"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "Failed"
	[ -n "$output" ] && echo "$output"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)