#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/01/22   Check gdm autorun-never

l_output="" l_output2=""
# Look for existing settings and set variables if they exist
l_kfile="$(grep -Prils -- '^\h*autorun-never\b' /etc/dconf/db/*.d)"
# Set profile name based on dconf db directory ({PROFILE_NAME}.d)
if [ -f "$l_kfile" ]; then
   l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")"
fi
# If the profile name exist, continue checks
if [ -n "$l_gpname" ]; then
   l_gpdir="/etc/dconf/db/$l_gpname.d"
   # Check if profile file exists
   if grep -Pq -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*; then
      l_output="$l_output\n - dconf database profile file \"$(grep -Pl -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*)\" exists"
   else
      l_output2="$l_output2\n - dconf database profile isn't set"
   fi
   # Check if the dconf database file exists
   if [ -f "/etc/dconf/db/$l_gpname" ]; then
      l_output="$l_output\n - The dconf database \"$l_gpname\" exists"
   else
      l_output2="$l_output2\n - The dconf database \"$l_gpname\" doesn't exist"
   fi
   # check if the dconf database directory exists
   if [ -d "$l_gpdir" ]; then
      l_output="$l_output\n - The dconf directory \"$l_gpdir\" exitst"
   else
      l_output2="$l_output2\n - The dconf directory \"$l_gpdir\" doesn't exist"
   fi
   # check autorun-never setting
   if grep -Pqrs -- '^\h*autorun-never\h*=\h*true\b' "$l_kfile"; then
      l_output="$l_output\n - \"autorun-never\" is set to true in: \"$l_kfile\""
   else
      l_output2="$l_output2\n - \"autorun-never\" is not set correctly"
   fi
else
   # Settings don't exist. Nothing further to check
   l_output2="$l_output2\n - \"autorun-never\" is not set"
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