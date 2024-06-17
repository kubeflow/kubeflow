#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/30/22   Check sshd running configuration v2.0.0 (Replaces sshd_running_config.sh)
#

l_output="" l_output2=""
# set l_sshdrc to sshd running config values
l_sshdrc="$(sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep "$(hostname)" /etc/hosts 2>&1 | awk '{print $1}')")"
# Set l_sshdpar for CIS-CAT to print
if grep -Pq -- '^\^\\[sh]\*' <<< "$XCCDF_VALUE_REGEX"; then
   l_sshdpar="$(grep -P -- "$(cut -d'*' -f2 <<< "$XCCDF_VALUE_REGEX" | cut -d'\' -f1)" <<< "$l_sshdrc")"
elif grep -Pq -- '^\^\\[sh]\*\(' <<< "$XCCDF_VALUE_REGEX"; then
   l_sshdpar="$(grep -P -- "$(cut -d'*' -f2 <<< "$XCCDF_VALUE_REGEX")" <<< "$l_sshdrc")"
elif grep -Pq -- '^(\^\(|\()' <<< "$XCCDF_VALUE_REGEX"; then
   if grep -Pq -- "$XCCDF_VALUE_REGEX" <<< "$l_sshdrc"; then
      l_sshdpar="$(grep -P -- "$XCCDF_VALUE_REGEX" <<< "$l_sshdrc")"
   else
      l_sshdpar="$(awk -F"[()]" '{print $2}' <<< "$XCCDF_VALUE_REGEX")"
   fi
else
   l_sshdpar="$(grep -P -- "$(cut -d'\' -f1 <<< "$XCCDF_VALUE_REGEX")" <<< "$l_sshdrc")"
fi
l_par="$(awk '{print $1}' <<< "$l_sshdpar")"
l_val="$(awk '{print $2}' <<< "$l_sshdpar")"
# Test sshd running config
if grep -Pq "$XCCDF_VALUE_REGEX" <<< "$l_sshdrc"; then
   l_output="$l_output\n - The parameter: \"$l_par\" is correctly set to: \"$l_val\" in the running config"
else
   l_output2="$l_output2\n - The parameter: \"$l_par\" is incorrectly set to: \"$l_val\" in the running config"
fi
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi