#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/05/22   Check user home directory owner
# E. Pinnell   01/03/23   Modified to check for valid_shells variable being set
# E. Pinnell   01/19/23   Modified to improve test and output

l_output="" l_output2=""
valid_shells="^($( awk -F\/ '$NF != "nologin" {print}' /etc/shells | sed -rn '/^\//{s,/,\\\\/,g;p}' | paste -s -d '|' - ))$"

if [ -z "$valid_shells" ] || [ "$valid_shells" = "^()$" ]; then
   l_output2="$l_output2\n  - Unable to determine valid shells for the system.\n - manual audit will be required"
else
   while l_out="" read -r l_user l_home; do
	   if [ -d "$l_home" ]; then
         l_owner="$(stat -L -c "%U" "$l_home")"
         if [ "$l_owner" != "$l_user" ]; then
            l_output2="$l_output2\n  - User \"$l_user\" home directory \"$l_home\" is owned by user \"$l_owner\""
         fi
      else
         l_output="$l_output\n- User \"$l_user\" home directory \"$l_home\" doesn't exist\n"
      fi
   done <<< "$(awk -v pat="$valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd)"
fi

# Report results. If no failures output in l_output2, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n\n - All local interactive users have a home directory\n"
	[ -n "$l_output" ] && echo -e "\n ** WARNING **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n ** WARNING **\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi