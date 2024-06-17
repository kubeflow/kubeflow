#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/19/19   Check root's path
# E. Pinnell   12/3/19    Updated to be POSIX compliant
# E. Pinnell   05/11/21   Updated to ensure only the PATH variable is returned  
# E. Pinnell   08/16/22   Updated to modernize and simplify script, and change env to bash
# E. Pinnell   09/02/22   Added check for ability to run sudo to prevent "hang" when sudo privileges require input
#

l_output=""
if [ -z "$(sudo -n true)" ]; then
   l_rpcv="$(sudo -Hiu root env | awk -F= '/^PATH=/{print $2}')"
   grep -q '::' <<< "$l_rpcv" && l_output="$l_output\n - root's path contains a empty directory \"::\""
   grep -Eq ':\s*$' <<< "$l_rpcv" && l_output="$l_output\n - root's path contains a trailing \":\""

   for l_dir in $(tr ":" " " <<< "$l_rpcv") ; do
      if [ "$l_dir" = "." ] ; then
         l_output="$l_output\n - root's PATH contains current working directory \".\""
      elif [ -d "$l_dir" ] ; then
         [ "$(stat -Lc "%U" "$l_dir")" != "root" ] && l_output="$l_output\n - root doesn't own directory \"$l_dir\" in its path"
         stat -Lc "%a" "$l_dir" | grep -Eq '[0-7][7,3,2][0-7]' && l_output="$l_output\n - root's path contains group writable directory \"$l_dir\""
         stat -Lc "%a" "$l_dir" | grep -Eq '[0-7][0-7][7,3,2]' && l_output="$l_output\n - root's path contains world writable directory \"$l_dir\""
      fi
   done
else
   l_output="$l_output\n - No root privileges available without additional password entry. Manual assessment will be required"
fi

# If all tests pass, passing will be true, and we pass
if [ -z "$l_output" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # print the reason why we are failing
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi