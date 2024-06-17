#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   05/12/22   Check that only authorized groups are assigned ownership of audit log files
# E. Pinnell   02/27/23   Modified to improve method used to assess and improve output

l_output="" l_output2="" l_output3=""

if [ -e /etc/audit/auditd.conf ]; then
	l_fpath="$(dirname "$(awk -F "=" '/^\s*log_file/ {print $2}' /etc/audit/auditd.conf | xargs)")"
   l_cgroup="$(grep -Piws -- '^\h*log_group\h*=\h*\H+\b' /etc/audit/auditd.conf)"
   if ! grep -Piqs '(root|adm)' <<< "$l_cgroup"; then
      l_output2="$l_output2\n  - The \"log_group\" parameter is set to: \"$l_cgroup\" and should be set to \"root or adm \" in \"/etc/audit/auditd.conf\""
   else
      l_output="$l_output\n  - The \"log_group\" parameter is correctly set to \"$l_cgroup\" in \"/etc/audit/auditd.conf\""
   fi
	while IFS= read -r -d $'\0' l_file; do
		l_output3="$l_output3\n  - File: \"$l_file\" is group owned by: \"$(stat -Lc '%G' "$l_file")\" should be group owned by: \"root or adm\""
	done < <(find -L "$l_fpath" -not -path "$l_fpath"/lost+found -type f \( ! -group root -a ! -group adm \) -print0)
   if [ -n "$l_output3" ]; then
      l_output2="$l_output2\n$l_output3"
   else
      l_output="$l_output\n  - All audit log files are group owned by: \"root or adm\""
   fi
fi
[ -n "$l_output" ] && l_output=" - * Correctly configured * :\n$l_output"
# If all files passed, then we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :$l_output2"
   echo -e "\n$l_output"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
