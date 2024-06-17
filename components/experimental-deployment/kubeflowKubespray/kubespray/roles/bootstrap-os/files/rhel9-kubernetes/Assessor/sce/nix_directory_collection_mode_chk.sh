#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/18/23   check directory collection mode check (Two part colon separated variable. {DIRECTORY}:{MASK}) example: /usr/sbin:0022:

# XCCDF_VALUE_REGEX="/usr/bin:0077:" <- example XCCDF_VALUE_REGEX variable
l_output="" l_output2=""

while IFS=: read -r l_directory l_perm_mask; do
   l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask )) )"
   while IFS= read -r -d $'\0' l_fname; do
      l_mode=$(stat -Lc '%#a' "$l_fname")
      if [ $(( "$l_mode" & "$l_perm_mask" )) -gt 0 ]; then
         l_output2="$l_output2\n - Directory: \"$l_fname\" is mode: \"$l_mode\" (should be mode: \"$l_maxperm\" or more restrictive)"
      fi
   done < <(find "$l_directory" -mindepth 1 -type d -print0)
   [ -z "$l_output2" ] && l_output=" - All directories in: \"$l_directory\" are mode: \"$l_maxperm\" or more restrictive"
done <<< "$XCCDF_VALUE_REGEX"

# If the tests produce no failing output, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi