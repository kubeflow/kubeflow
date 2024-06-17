#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/01/22   Check gdm autorun-never

l_output="" l_output2=""
# Look for autorun-never to determine profile in use, needed for remaining tests
l_kfd="/etc/dconf/db/$(grep -Psril '^\h*autorun-never\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
if [ -d "$l_kfd" ]; then # If key file directory doesn't exist, options can't be locked
   if grep -Prsiq '^\h*\/org/gnome\/desktop\/media-handling\/autorun-never\b' "$l_kfd"; then
      l_output="$l_output\n - \"autorun-never\" is locked in \"$(grep -Pril '^\h*\/org/gnome\/desktop\/media-handling\/autorun-never\b' "$l_kfd")\""
   else
      l_output2="$l_output2\n - \"autorun-never\" is not locked"
   fi
else
   l_output2="$l_output2\n - \"autorun-never\" is not set so it can not be locked"
fi
# Report results. If no failures output in l_output2, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi