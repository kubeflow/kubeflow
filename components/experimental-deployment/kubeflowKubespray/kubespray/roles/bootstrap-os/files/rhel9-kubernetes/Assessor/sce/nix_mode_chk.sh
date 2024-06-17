#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   09/15/22   Check file or directory permissions (mode) follow symlinks ("complex" variable {file_path}:{mask} example: /etc/passwd:0133 verifies /etc/passwd is 0644 or more restrictive)
# E. Pinnell   08/02/23   Modified to improve performance of splitting XCCDF_VALUE_REGEX variable.

l_output="" l_output2=""

while IFS=":" read -r l_fname l_perm_mask; do
	l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask )) )"
	if [ -e "$l_fname" ]; then
		l_mode=$(stat -Lc '%#a' "$l_fname")
		# Gather information for more verbose output
		l_slname="$(readlink -e "$l_fname")"
		[ -d "$l_slname" ] && l_ftype="directory"
		[ -f "$l_slname" ] && l_ftype="file"
		if [ $(( "$l_mode" & "$l_perm_mask" )) -gt 0 ]; then
			l_output2=" - $l_ftype: \"$l_fname\" is mode: \"$l_mode\" (should be mode: \"$l_maxperm\" or more restrictive)"
		else
			l_output=" - $l_ftype: \"$l_fname\" is mode: \"$l_mode\" (should be mode: \"$l_maxperm\" or more restrictive)"
		fi
	else
		l_output=" - \"$l_fname\" doesn't exist"
	fi
done <<< "$XCCDF_VALUE_REGEX"

# If the tests produce no failing output, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi