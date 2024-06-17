#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/17/23   Check root path Integrity (New version. Supersedes "root_path.sh")
#

if [ -z "$(sudo -n true)" ]; then
   l_output="" l_output2=""
   l_pmask="0022"
   l_maxperm="$( printf '%o' $(( 0777 & ~$l_pmask )) )"
   l_root_path="$(sudo -Hiu root env | grep '^PATH' | cut -d= -f2)"
   unset a_path_loc && IFS=":" read -ra a_path_loc <<< "$l_root_path"
   if grep -q "::" <<< "$l_root_path"; then
      l_output2="$l_output2\n - root's path contains a empty directory (::)"
   else
      l_output="$l_output\n - root's path doesn't contain an empty directory (::)"
   fi
   if grep -Pq ":\h*$" <<< "$l_root_path"; then
      l_output2="$l_output2\n - root's path contains a trailing (:)"
   else
      l_output="$l_output\n - root's path doesn't contain a trailing (:)"
   fi
   if grep -Pq '(\h+|:)\.(:|\h*$)' <<< "$l_root_path"; then
      l_output2="$l_output2\n - root's path contains current working directory (.)"
   else
      l_output="$l_output\n - root's path doesn't contain current working directory (.)"
   fi
   while read -r l_path; do
      if [ -d "$l_path" ]; then
         while read -r l_fmode l_fown; do
            if [ "$l_fown" != "root" ]; then
               l_output2="$l_output2\n - Directory: \"$l_path\" is owned by: \"$l_fown\" should be owned by \"root\""
            else
               l_output="$l_output\n - Directory: \"$l_path\" is correctly owned by: \"$l_fown\""
            fi
            if [ $(( $l_fmode & $l_pmask )) -gt 0 ]; then
               l_output2="$l_output2\n - Directory: \"$l_path\" is mode: \"$l_fmode\" and should be mode: \"$l_maxperm\" or more restrictive"
            else
               l_output="$l_output\n - Directory: \"$l_path\" is correctly mode: \"$l_fmode\" and should be mode: \"$l_maxperm\" or more restrictive"
            fi
         done <<< "$(stat -Lc '%#a %U' "$l_path")"
      else
         l_output2="$l_output2\n - \"$l_path\" is not a directory"
      fi
   done <<< "$(printf "%s\n" "${a_path_loc[@]}")"
else
   l_output2="$l_output2\n - No root privileges available without additional password entry. Manual assessment will be required"
fi   
# CIS-CAT Assessment Evidence output
# if "#l_output2 is empty, we pass"
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  *** PASS ***\n- * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2\n"
   [ -n "$l_output" ] && echo -e " - * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi