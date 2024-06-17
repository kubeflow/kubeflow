#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/20/21   Check that users home directory dot files don't contain permissive umask (less than 077)

passing="" output="" output2="" user="" dir=""

awk -F: '($1!~/(halt|sync|shutdown|nfsnobody)/ && $7!~/^(\/usr)?\/sbin\/nologin(\/)?$/ && $7!~/(\/usr)?\/bin\/false(\/)?$/) {print $1 " " $6}' /etc/passwd | (while read -r user dir; do
	if [ ! -d "$dir" ]; then
		[ -z "$output2" ] && output2="The following users' home directories don't exist: \"$user\"" || output2="$output2, \"$user\""
	else
		for file in $(find "$dir"/ -maxdepth 1 -xdev -type f -name '.*'); do
			if [ -e "$file" ]; then
				if grep -Pq '(?i)^\h*([^#\n\r]+\h+)?umask\h+([0-7][^7\n\r][0-7]|[0-7][0-7][^7\n\r]|(u=[rwx]{1,3},)?g=[wrx]{1,3}(,o=[rwx]{0,3})?|(u=[rwx]{1,3},)?(g=[wrx]{1,3})?,?o=[rwx]{0,3})\h*(\h+.*)?$' "$file"; then
					[ -z "$output" ] && output="Permissive UMASK exists in the following file(s): \"$file\"" || output="$output, \"$file\""
				fi
			fi
		done
	fi
done

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "PASSED: No permissive UMASK in users' initialization files"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ -n "$output" ] && echo "$output"
	[ -n "$output2" ] && echo "WARNING: $output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)