#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/12/22   Check that audit log files are not read or write-accessible by unauthorized users
# E. Pinnell   02/13/23   Modified to improve output

l_output2=""
if [ -e /etc/audit/auditd.conf ]; then
	while IFS= read -r -d $'\0' l_file; do
		l_output2="$l_output2\n  - File: \"$l_file\" is owned by: \"$(stat -Lc '%U' "$l_file")\" should be owned by: \"root\""
	done < <(find -L "$(dirname "$(awk -F "=" '/^\s*log_file/ {print $2}' /etc/audit/auditd.conf | xargs)")" -type f ! -user root -print0)
fi
# If all files passed, then we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n- All audit log files are owned by \"root\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi