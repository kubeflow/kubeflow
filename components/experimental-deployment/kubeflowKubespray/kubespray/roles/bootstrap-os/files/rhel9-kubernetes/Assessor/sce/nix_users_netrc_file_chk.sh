#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/01/22   Check user .netrc files existence and permissions (mode)
# E. Pinnell   01/20/23   Modified to improve test and output

l_output="" l_output2="" l_output3=""
perm_mask="$XCCDF_VALUE_REGEX"
maxperm="$( printf '%o' $(( 0777 & ~$perm_mask)) )"
valid_shells="^($( awk -F\/ '$NF != "nologin" {print}' /etc/shells | sed -rn '/^\//{s,/,\\\\/,g;p}' | paste -s -d '|' - ))$"

while l_out="" read -r l_user l_home; do
	if [ -d "$l_home" ]; then
		if [ -f "$l_home/.netrc" ]; then
			l_mode="$( stat -L -c '%#a' "$l_home/.netrc" )"
			if [ $(( $l_mode & $perm_mask )) -gt 0 ]; then
				l_output2="$l_output2\n  - User \"$l_user\" file: \"$l_home/.netrc\" is too permissive: \"$l_mode\" (should be: \"$maxperm\" or more restrictive)"
			else
				l_output="$l_output\n  - User \"$l_user\" file: \"$l_home/.netrc\" exists and has file mode: \"$l_mode\" (should be: \"$maxperm\" or more restrictive)"
			fi
		fi
	else
		l_output3="$l_output3\n - User \"$l_user\" home directory \"$l_home\" doesn't exist\n"
	fi
done <<< "$(awk -v pat="$valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd)"

# Report results. If no failures output in l_output2, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n\n - All existing user \".netrc\" files are \"$maxperm\" or more restrictive\n"
	[ -n "$l_output" ] && echo -e "\n ** WARNING **\n$l_output\n"
	[ -n "$l_output3" ] && echo -e "\n ** NOTICE **\n$l_output3\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
	[ -n "$l_output" ] && echo -e "\n ** WARNING **\n$l_output\n"
	[ -n "$l_output3" ] && echo -e "\n ** NOTICE **\n$l_output3\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi