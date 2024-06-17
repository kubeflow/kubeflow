#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 03/22/21   Check removable partition mount point options
# E. Pinnell 02/16/23   Modified to run in bash, address issue there is a “1” in the filesystem name, improve output
#

l_output="" l_output2="" l_output3=""
if command -v lsblk >/dev/null; then
   while read -r l_rpmo; do
      if [ -n "$l_rpmo" ]; then
         if findmnt -n -o OPTIONS "$l_rpmo" | grep -Pq "\b$XCCDF_VALUE_REGEX\b"; then
            l_output="$l_output\n  - Removable media partition: \"$l_rpmo\" includes the \"$XCCDF_VALUE_REGEX\" option"
         else
            l_output2="$l_output2\n  - Removable media partition: \"$l_rpmo\" does not include the \"$XCCDF_VALUE_REGEX\" option"
         fi
      fi
   done <<< "$(lsblk -o RM,MOUNTPOINT | awk -F " " '/^\s*1\s+/ {print $2}')"
else
   l_output3="  ** INFO **\n - command lsblk not found on the system\n   Manual assessment will be required"
fi
[ -z "$l_output" ] && l_output="  - No removable media partition found on the system"
if [ -z "$l_output2" ]; then # If l_output2 is empty, we pass
   echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n$l_output"
   echo -e "$l_output3"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
   [ -n "$l_output" ] && echo -e "\n- * Correctly configured * :\n$l_output"
   echo -e "$l_output3"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi