#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/19/21   Check that users dot files are 0740 or more restrictive

passing="" output="" output2="" user="" dir=""

awk -F: '($1!~/(halt|sync|shutdown|nfsnobody)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1 " " $6}' /etc/passwd | (while read -r user dir; do
  if [ ! -d "$dir" ]; then
		[ -z "$output2" ] && output2="The following users' home directories don't exist: \"$user\"" || output2="$output2, \"$user\""
	else
		for file in $(find "$dir"/ -maxdepth 1 -xdev -type f -name '.*'); do
			if [ -f "$file" ]; then
				if [ -z "$(stat -L -c "%a" "$file" | grep -E '[0-7][0,4]0')" ]; then
					[ -z "$output" ] && output="User: \"$user\" File: \"$file\" has permissions: \"$(stat -L -c "%a" "$file")\"" || output="$output,\n User: \"$user\" File: \"$file\" has permissions: \"$(stat -L -c "%a" "$file")\""
				fi
			fi
		done
	fi
done

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  All dot files in users home directory belong to a users' primary group or group root"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "Failed"
	[ -n "$output" ] && echo -e "$output"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)