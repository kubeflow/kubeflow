#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/18/22   Check that audit log files are not read or write-accessible by unauthorized users
# E. Pinnell   02/13/23   Modified to improve output and ignore lost and found directory

l_output2=""
if [ -e /etc/audit/auditd.conf ]; then
	l_mask='0137'
	l_maxperm="$( printf '%o' $(( 0777 & ~$l_mask)) )"
	l_fpath="$(dirname "$(awk -F "=" '/^\s*log_file/ {print $2}' /etc/audit/auditd.conf | xargs)")"
	while IFS= read -r -d $'\0' l_file; do
		l_output2="$l_output2\n  - File: \"$l_file\" is Mode: \"$(stat -Lc '%#a' "$l_file")\" should be mode: \"$l_maxperm\" or more restrictive"
	done < <(find -L "$l_fpath" -not -path "$l_fpath"/lost+found -type f -perm /$l_mask -print0)
fi
# If all files passed, then we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n- All audit log files are mode $l_maxperm or less permissive"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi