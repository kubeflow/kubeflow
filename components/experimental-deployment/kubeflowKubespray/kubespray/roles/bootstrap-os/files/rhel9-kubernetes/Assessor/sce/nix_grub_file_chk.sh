#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/05/23   Check permissions on grub files

l_output="" l_output2=""
l_pmask="0077"
l_maxperm="$( printf '%o' $(( 0777 & ~$l_pmask )) )"
file_mug_chk()
{
   l_out="" l_out2=""
   if [ $(( $l_mode & $l_pmask )) -gt 0 ]; then
      l_out2="$l_out2\n   - Is mode \"$l_mode\" and should be mode: \"$l_maxperm\" or more restrictive"
   else
      l_out="$l_out\n   - Is correctly mode: \"$l_mode\" which is mode: \"$l_maxperm\" or more restrictive"
   fi
   if [ "$l_user" = "root" ]; then
      l_out="$l_out\n   - Is correctly owned by user: \"$l_user\""
   else
      l_out2="$l_out2\n   - Is owned by user: \"$l_user\" and should be owned by user: \"root\""
   fi
   if [ "$l_group" = "root" ]; then
      l_out="$l_out\n   - Is correctly group-owned by group: \"$l_user\""
   else
      l_out2="$l_out2\n   - Is group-owned by group: \"$l_user\" and should be group-owned by group: \"root\""
   fi
   [ -n "$l_out" ] && l_output="$l_output\n  - File: \"$l_file\"$l_out\n"
   [ -n "$l_out2" ] && l_output2="$l_output2\n  - File: \"$l_file\"$l_out2\n"
}
while IFS= read -r -d $'\0' l_gfile; do
   while read -r l_file l_mode l_user l_group; do
      file_mug_chk
   done <<< "$(stat -Lc '%n %#a %U %G' "$l_gfile")"
done < <(find /boot -type f \( -name 'grub*' -o -name 'user.cfg' \) -print0)
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  *** PASS ***\n- * Correctly set * :\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2\n"
   [ -n "$l_output" ] && echo -e " - * Correctly set * :\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi