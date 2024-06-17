#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/29/23   Ensure system accounts are secured

l_output="" l_output2=""
l_limit="50" # Set report output limit
l_exempt="root|sync|shutdown|halt|^\+" #pipe separated list of exempt user accounts
l_exemptlk="root|^\+" #pipe separated list of exempt system accounts locked
l_valid_shells="^($( awk -F\/ '$NF != "nologin" {print}' /etc/shells | sed -rn '/^\//{s,/,\\\\/,g;p}' | paste -s -d '|' - ))$"
# initialize arrays
a_users=()
a_ulock=()
# Populate array with system accounts that have a valid login shell
while read -r l_user; do
   a_users+=("$l_user")
done < <(awk -v pat="$l_valid_shells" -F: '($1!~/('"$l_exempt"')/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"' && $(NF) ~ pat) { print $1 }' /etc/passwd)
# Populate array with system accounts that aren't locked
while read -r l_ulock; do
   a_ulock+=("$l_ulock")
done < <(awk -v pat="$l_valid_shells" -F: '($1!~/('"$l_exemptlk"')/ && $2!~/LK?/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"' && $(NF) ~ pat) { print $1 }' /etc/passwd)
# Generate output reports
if ! (( ${#a_users[@]} > 0 )); then
   l_output="$l_output\n  - local system accounts login is disabled"
else
   l_output2="$l_output2\n  - There are \"$(printf '%s' "${#a_users[@]}")\" system accounts with login enabled\n   - List of accounts:\n$(printf '%s\n' "${a_users[@]:0:$l_limit}")\n   - end of list\n"
fi
if ! (( ${#a_ulock[@]} > 0 )); then
   l_output="$l_output\n  - local system accounts are locked"
else
   l_output2="$l_output2\n  - There are \"$(printf '%s' "${#a_ulock[@]}")\" system accounts that are not locked\n   - List of accounts:\n$(printf '%s\n' "${a_ulock[@]:0:$l_limit}")\n   - end of list\n"
fi
if (( ${#a_users[@]} > "$l_limit" )) || (( ${#a_ulock[@]} > "$l_limit" )); then
   l_output2="\n    ** NOTE: **\n    More than \"$l_limit\" world writable files and/or \n    World writable directories without the sticky bit exist\n    only the first \"$l_limit\" will be listed\n$l_output2"
fi
# Remove arrays
unset a_users
unset a_ulock
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
   [ -n "$l_output" ] && echo -e "- * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi