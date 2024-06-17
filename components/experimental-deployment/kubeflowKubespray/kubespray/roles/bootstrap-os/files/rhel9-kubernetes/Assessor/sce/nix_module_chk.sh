#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/25/22   Check modules for loadable, loaded, and deny list
# E. Pinnell   09/02/22   Modified to pass if the module doesn't exist on the system and leverage showconfig to look for denylist

l_output="" l_output2=""
l_mname="$XCCDF_VALUE_REGEX" # set module name
# Check if the module exists on the system
if [ -z "$(modprobe -n -v "$l_mname" 2>&1 | grep -Pi -- "\h*modprobe:\h+FATAL:\h+Module\h+$l_mname\h+not\h+found\h+in\h+directory")" ]; then
   # Check how module will be loaded
   l_loadable="$(modprobe -n -v "$l_mname")"
   [ "$(wc -l <<< "$l_loadable")" -gt "1" ] && l_loadable="$(grep -P -- "(^\h*install|\b$l_mname)\b" <<< "$l_loadable")"
   if grep -Pq -- '^\h*install \/bin\/(true|false)' <<< "$l_loadable"; then
      l_output="$l_output\n - module: \"$l_mname\" is not loadable: \"$l_loadable\""
   else
      l_output2="$l_output2\n - module: \"$l_mname\" is loadable: \"$l_loadable\""
   fi
   # Check is the module currently loaded
   if ! lsmod | grep "$l_mname" > /dev/null 2>&1; then
      l_output="$l_output\n - module: \"$l_mname\" is not loaded"
   else
      l_output2="$l_output2\n - module: \"$l_mname\" is loaded"
   fi
   # Check if the module is deny listed
   if modprobe --showconfig | grep -Pq -- "^\h*blacklist\h+$(tr '-' '_' <<< "$l_mname")\b"; then
      l_output="$l_output\n - module: \"$l_mname\" is deny listed in: \"$(grep -Pl -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*)\""
   else
      l_output2="$l_output2\n - module: \"$l_mname\" is not deny listed"
   fi
else
   l_output="$l_output\n - Module \"$l_mname\" doesn't exist on the system"
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