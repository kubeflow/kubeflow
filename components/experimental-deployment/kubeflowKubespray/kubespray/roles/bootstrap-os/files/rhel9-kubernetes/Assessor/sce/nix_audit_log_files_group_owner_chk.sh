#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/21/23   check audit log files group owner check

# XCCDF_VALUE_REGEX="(root|adm)" #<- example XCCDF_VALUE_REGEX variable

l_output="" l_output2="" l_count="0"
l_directory="$(dirname "$(awk -F "=" '/^\s*log_file\s*/ {print $2}' /etc/audit/auditd.conf | xargs)")"
l_group_owner="$XCCDF_VALUE_REGEX"

while IFS= read -r -d $'\0' l_fname; do
   (( l_count++ ))
   l_file_group_owner="$(stat -Lc '%G' "$l_fname")"
   if [[ ! "$l_file_group_owner" =~ $l_group_owner\s*$ ]]; then
      l_output2="$l_output2\n - file: \"$l_fname\" is group owned by: \"$l_file_group_owner\" (should be group owned by: \"${l_group_owner/|/ or }\")"
   fi
done < <(find "$l_directory" -type f -print0)
if [ -z "$l_output2" ]; then
   if [ "$l_count" -gt "0" ]; then
      l_output=" - All files ending in \"$l_ext\" in: \"$l_directory\" are group owned by: \"${l_group_owner/|/ or }\""
   else
      l_output=" - No files ending in \"$l_ext\" exist in: \"$l_directory\""
   fi
fi

# If the tests produce no failing output, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi