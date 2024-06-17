#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/21/23   Check audit log files mode. requires XCCDF_VALUE_REGEX set to mask e.g. 0177

# XCCDF_VALUE_REGEX="0177" <- Example variable

l_output="" l_output2=""
l_directory="$(dirname "$(awk -F "=" '/^\s*log_file\s*/ {print $2}' /etc/audit/auditd.conf | xargs)")"
l_perm_mask="$XCCDF_VALUE_REGEX"

l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask )) )"
while IFS= read -r -d $'\0' l_fname; do
   l_mode=$(stat -Lc '%#a' "$l_fname")
   if [ $(( "$l_mode" & "$l_perm_mask" )) -gt 0 ]; then
      l_output2="$l_output2\n - file: \"$l_fname\" is mode: \"$l_mode\" (should be mode: \"$l_maxperm\" or more restrictive)"
   fi
done < <(find "$l_directory" -type f -print0)
[ -z "$l_output2" ] && l_output=" - All files in: \"$l_directory\" are mode: \"$l_maxperm\" or more restrictive"

# If the tests produce no failing output, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
