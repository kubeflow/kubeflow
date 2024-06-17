#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/01/22   Check gdm login banner is configured

l_output="" l_output2=""
# Look for existing settings and set variables if they exist
l_gdmfile="$(grep -Prils '^\h*banner-message-enable\b' /etc/dconf/db/*.d)"
if [ -n "$l_gdmfile" ]; then
   # Set profile name based on dconf db directory ({PROFILE_NAME}.d)
   l_gdmprofile="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_gdmfile")"
   # Check if banner message is enabled
   if grep -Pisq '^\h*banner-message-enable=true\b' "$l_gdmfile"; then
      l_output="$l_output\n - The \"banner-message-enable\" option is enabled in \"$l_gdmfile\""
   else
      l_output2="$l_output2\n - The \"banner-message-enable\" option is not enabled"
   fi
   l_lsbt="$(grep -Pios '^\h*banner-message-text=.*$' "$l_gdmfile")"
   if [ -n "$l_lsbt" ]; then
      l_output="$l_output\n - The \"banner-message-text\" option is set in \"$l_gdmfile\"\n  - banner-message-text is set to:\n  - \"$l_lsbt\""
   else
      l_output2="$l_output2\n - The \"banner-message-text\" option is not set"
   fi
   if grep -Pq "^\h*system-db:$l_gdmprofile" /etc/dconf/profile/"$l_gdmprofile"; then
      l_output="$l_output\n - The \"$l_gdmprofile\" profile exists"
   else
      l_output2="$l_output2\n - The \"$l_gdmprofile\" profile doesn't exist"
   fi
   if [ -f "/etc/dconf/db/$l_gdmprofile" ]; then
      l_output="$l_output\n - The \"$l_gdmprofile\" profile exists in the dconf database"
   else
      l_output2="$l_output2\n - The \"$l_gdmprofile\" profile doesn't exist in the dconf database"
   fi
else
   l_output2="$l_output2\n - The \"banner-message-enable\" option isn't configured"
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