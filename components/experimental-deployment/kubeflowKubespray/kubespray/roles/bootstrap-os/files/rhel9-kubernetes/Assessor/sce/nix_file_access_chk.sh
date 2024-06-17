#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   01/31/23   Check for world-writable files, unowned or ungrouped files or directories, world writable directories without the sticky bit, SUID executables, and SGID executables

l_output="" l_output2="" l_output3=""
l_wwfout="" l_wwdout="" l_uofdout="" l_ugfdout="" l_suidout="" l_sgidout=""
arr=() # Create array with files that will possibly fail one of the audits
while l_out="" read -r l_mpname; do      
   if [[ ! "$l_mpname" =~ ^\s*\/run\/user/\S+ ]]; then
      while l_out2="" read -r l_fdname; do
         if [ -e "$l_fdname" ]; then
            l_var="$(stat -Lc '%n:::%#a:::%U:::%G' "$l_fdname")" # separate awk to account for spaces and special characters in the filename
            arr+=("$l_var")
         fi
      done <<< "$(find "$l_mpname" -xdev \( -type f -o -type d \) \( -nouser -o -nogroup -o -perm -2000 -o -perm -4000 -o -perm -0002 \))"
   fi
done <<< "$(findmnt -Derno target)"
for l_afile in "${arr[@]}"; do
   while l_out6="" read -r l_mode l_user l_group; do
      l_fname="$(awk -F":::" '{print $1}' <<< "$l_afile")"
      if [ -f "$l_fname" ]; then
         # Ensure no world writable files exist
         perm_mask='0002'
         if [ $(( $l_mode & $perm_mask )) -gt 0 ]; then
            [ -z "$l_wwfout" ] && l_wwfout="$l_fname" || l_wwfout="$l_wwfout, $l_fname"
         fi
         # Collect SUID executables
         perm_mask="04000"
         if [ $(( $l_mode & $perm_mask )) -gt 0 ]; then
            [ -z "$l_suidout" ] && l_suidout="$l_fname" || l_suidout="$l_suidout, $l_fname"
         fi
         # Collect SGID executables
         perm_mask="02000"
         if [ $(( $l_mode & $perm_mask )) -gt 0 ]; then
            [ -z "$l_sgidout" ] && l_sgidout="$l_fname" || l_sgidout="$l_sgidout, $l_fname"
         fi
      fi
      # Ensure sticky bit is set on all world-writable directories
      if [ -d "$l_fname" ]; then
         perm_mask='0002'
         if [ $(( $l_mode & $perm_mask )) -gt 0 ]; then
            perm_mask="01000"
            if [ ! $(( $l_mode & $perm_mask )) -gt 0 ]; then
               [ -z "$l_wwdout" ] && l_wwdout="$l_fname" || l_wwdout="$l_wwdout, $l_fname"
            fi
         fi
      fi
      # Ensure Ensure no unowned files or directories exist
      if [ "$l_user" = "UNKNOWN" ]; then
         [ -z "$l_uofdout" ] && l_uofdout="$l_fname" || l_uofdout="$l_uofdout, $l_fname"
      fi
      # Ensure no ungrouped files or directories exist
      if [ "$l_group" = "UNKNOWN" ]; then
         [ -z "$l_ugfdout" ] && l_ugfdout="$l_fname" || l_ugfdout="$l_ugfdout, $l_fname"
      fi
   done <<< "$(awk -F":::" '{print $2 " " $3 " " $4}' <<< "$l_afile")" # Loop is faster that multiple awk statements
done
# Pass and Fail Reports ( l_output "PASS" and l_output2 "FAIL" )
if [ -n "$l_wwfout" ]; then
   l_output2="$l_output2\n  - World writable files exist on the local filesystem.\n  - The following is a comma separated list of the world writable files:\n\"$l_wwfout\"\n"
else
   l_output="$l_output\n  - No world writable files exist on the local filesystem."
fi
if [ -n "$l_uofdout" ]; then
   l_output2="$l_output2\n  - Unowned files or directories exist on the local filesystem.\n  - The following is a comma separated list of unowned files or directories:\n\"$l_uofdout\"\n"
else
   l_output="$l_output\n  - No unowned files or directories exist on the local filesystem."
fi
if [ -n "$l_ugfdout" ]; then
   l_output2="$l_output2\n  - Ungrouped files or directories exist on the local filesystem.\n  - The following is a comma separated list of ungrouped files or directories:\n\"$l_ugfdout\"\n"
else
   l_output="$l_output\n  - No ungrouped files or directories exist on the local filesystem."
fi
if [ -n "$l_wwdout" ]; then
   l_output2="$l_output2\n  - World writable directories without the sticky bit exist on the local filesystem.\n  - The following is a comma separated list of world writable directories without the sticky bit:\n\"$l_wwdout\"\n"
else
   l_output="$l_output\n  - Sticky bit is set on world writable directories on the local filesystem."
fi   
# Informational Reports ( l_output3 )
if [ -n "$l_suidout3" ] || [ -n "$l_sgidout" ]; then
   [ -n "$l_suidout" ] && l_suidout="  - Ensure that no rogue SUID programs have been introduced into the system.\n    Review the following comma separated list of SUID executable files\n    and confirm the integrity of these binaries.\n\n\"$l_suidout\"\n\n"
   [ -n "$l_sgidout" ] && l_sgidout="  - Ensure that no rogue SGID programs have been introduced into the system.\n    Review the following comma separated list of SGID executable files\n    and confirm the integrity of these binaries.\n\n\"$l_sgidout\"\n\n"
   l_output3="\n ** INFO **\n - These items will not cause the audit to fail,\n   but should be reviewed in accordance with local site policy\n\n$l_suidout$l_sgidout"
fi
unset arr # Remove array
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n$l_output"
   [ -n "$l_output3" ] && echo -e "$l_output3"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
   [ -n "$l_output" ] && echo -e "- * Correctly configured * :\n$l_output"
   [ -n "$l_output3" ] && echo -e "$l_output3"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi