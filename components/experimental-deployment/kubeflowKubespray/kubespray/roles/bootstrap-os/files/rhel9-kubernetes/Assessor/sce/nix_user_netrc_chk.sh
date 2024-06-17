#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   09/20/22   Check that All users' .netrc don't exist, or are 0600 or more restrictive

l_output="" l_output2=""

l_fname=".netrc"
l_valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
l_perm_mask="0177"
l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask)) )"

awk -v pat="$l_valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | (while read -r l_user l_home; do
	if [ -e "$l_home/$l_fname" ]; then
      l_mode=$( stat -Lc '%#a' "$l_fname" )
      if [ $(( "$l_mode" & "$l_perm_mask" )) -gt 0 ]; then
         l_output2="$l_output2\n - User \"$l_user\" file: \"$l_fname\" exists and is too permissive: \"$l_mode\" (should be: \"$l_maxperm\" or more restrictive)"
      else
         l_output="$l_output\n - User \"$l_user\" file \"$l_fname\" exists but is correctly set to mode: \"$l_mode\" (should be: \"$l_maxperm\" or more restrictive)"
      fi
   fi
done

# If the tests produce no output, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:"
   if [ -z "$l_output" ]; then
      echo -e "  ** PASS **\n - No users have \"$l_fname\" files in their home directory"
   else
      echo -e "  ** WARNING **\n$l_output"
   fi
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # print the reason why we are failing
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
  exit "${XCCDF_RESULT_FAIL:-102}"
fi
)