#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/01/21   Ensure all users last password change date is in the past
# E. Pinnell   02/16/22   modify to catch passwords that have been changed the same day as check is run
# E. Pinnell   03/17/23   Modified to improve check and output
# E. Pinnell   05/22/23   Modified to use "<<<" opposed to "< <" for redirect into loop for FED28 based distributions with CIS-CAT

l_output2=""
while read -r l_user; do
   l_change="$(chage --list $l_user | awk -F: '($1 ~ /^\s*Last\s+password\s+change/ && $2 !~ /never/){print $2}' | xargs)"
   if [[ "$(date -d "$l_change" +%s)" -gt "$(date +%s)" ]]; then
      l_output2="$l_output2\n  - User: \"$l_user\" last password change is in the future \"$l_change\""
   fi
done <<< "$(awk -F: '($2 ~ /^[^*!xX\n\r][^\n\r]+/){print $1}' /etc/shadow)"
if [ -z "$l_output2" ]; then # If l_output2 is empty, we pass
   echo -e "\n- Audit Result:\n  ** PASS **\n - All user password changes are in the past \n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :$l_output2\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi