#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/12/22   Check that audit log files are not read or write-accessible by unauthorized users

{
	echo "- Start check - audit log files are mode 0600 or less permissive"
	output=""
	output="$(stat -Lc "%n %a" "$(dirname $(awk -F"=" '/^\s*log_file\s*=\s*/ {print $2}' /etc/audit/auditd.conf | xargs))"/* | grep -v '[0,2,4,6]00')"
	
	# If all files passed, then we pass
	if [ -z "$output" ]; then
		echo -e "- PASS\n- All audit log files are mode 0600 or less permissive"
		echo -e "- End check - audit log files are mode 0600 or less permissive"
		exit "${XCCDF_RESULT_PASS:-101}"
	else
		# print the reason why we are failing
		echo -e "- FAIL:"
		echo -e "$output" | while read -r filemode; do
			echo "- File: \"$(awk '{print $1}' <<< "$filemode")\" is mode: \"$(awk '{print $2}' <<< "$filemode")\""
		done
		echo -e "- End check - audit log files are mode 0600 or less permissive"
		exit "${XCCDF_RESULT_FAIL:-102}"
	fi
}