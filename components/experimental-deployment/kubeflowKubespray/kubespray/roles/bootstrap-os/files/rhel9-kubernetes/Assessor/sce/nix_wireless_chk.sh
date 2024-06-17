#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   09/02/22   Check if wireless is disabled

l_output="" l_output2=""
module_chk()
{
   # Check how module will be loaded
   l_loadable="$(modprobe -n -v "$l_mname")"
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
   if modprobe --showconfig | grep -Pq -- "^\h*blacklist\h+$l_mname\b"; then
      l_output="$l_output\n - module: \"$l_mname\" is deny listed in: \"$(grep -Pl -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*)\""
   else
      l_output2="$l_output2\n - module: \"$l_mname\" is not deny listed"
   fi
}
if [ -n "$(find /sys/class/net/*/ -type d -name wireless)" ]; then
   l_dname=$(for driverdir in $(find /sys/class/net/*/ -type d -name wireless | xargs -0 dirname); do basename "$(readlink -f "$driverdir"/device/driver/module)";done | sort -u)
   for l_mname in $l_dname; do
      module_chk
   done
fi
# Report results. If no failures output in l_output2, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **"
   if [ -z "$l_output" ]; then
      echo -e "\n - System has no wireless NICs installed"
   else
      echo -e "\n$l_output\n"
   fi
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi