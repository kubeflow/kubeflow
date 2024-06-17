#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/21/23   check audit tools mode check

# XCCDF_VALUE_REGEX="0077" #<- example XCCDF_VALUE_REGEX variable

l_output="" l_output2="" l_count="0"
l_perm_mask="$XCCDF_VALUE_REGEX"
l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask )) )"
a_audit_tools=("/sbin/auditctl" "/sbin/aureport" "/sbin/ausearch" "/sbin/autrace" "/sbin/auditd" "/sbin/audispd" "/sbin/augenrules")

for l_fname in "${a_audit_tools[@]}"; do
   if [ -e "$l_fname" ]; then
      (( l_count++ ))
      l_mode=$(stat -Lc '%#a' "$l_fname")
      if [ $(( "$l_mode" & "$l_perm_mask" )) -gt 0 ]; then
         l_output2="$l_output2\n - Directory: \"$l_fname\" is mode: \"$l_mode\" (should be mode: \"$l_maxperm\" or more restrictive)"
      fi
   fi
done

if [ -z "$l_output2" ]; then
   if [ "$l_count" -gt "0" ]; then
      l_output=" - All audit tools files are mode: \"$l_maxperm\" or more restrictive"
   else
      l_output=" - No audit tools files exist"
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