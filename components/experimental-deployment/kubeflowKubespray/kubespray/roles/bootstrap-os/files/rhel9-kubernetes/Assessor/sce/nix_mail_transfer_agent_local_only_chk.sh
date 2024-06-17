#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/07/23   check mail transfer agents are configured for local-only mode

l_output="" l_output2=""
a_port_list=("25" "465" "587")

for l_port_number in "${a_port_list[@]}"; do
   if ss -plntu | grep -P -- ':'"$l_port_number"'\b' | grep -Pvq -- '\h+(127\.0\.0\.1|\[?::1\]?):'"$l_port_number"'\b'; then
      l_output2="$l_output2\n - Port \"$l_port_number\" is listening on a non-loopback network interface"
   else
      l_output="$l_output\n - Port \"$l_port_number\" is not listening on a non-loopback network interface"
   fi
done
unset a_port_list
# Provide output from checks
# If error output (l_output2) is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # If error output (l_output2) is not empty, we fail. Also output anything that's correctly configured
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi