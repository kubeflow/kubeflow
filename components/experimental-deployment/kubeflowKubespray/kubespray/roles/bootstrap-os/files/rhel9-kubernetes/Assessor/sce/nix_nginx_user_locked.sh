#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/07/20   Verify NGINX user account is locked

l_output="" l_output2=""

if [ -f /etc/nginx/nginx.conf ]; then
   l_user="$(awk '$1~/^\s*user\s*$/ {print $2}' /etc/nginx/nginx.conf | sed -r 's/;.*//g')"
   if [ -n "$(passwd -S "$l_user" | awk '($2=="L" || $2=="LK") {print $1}')" ]; then
      l_output=" - NGINX user account \"$l_user\" is locked"
   else
      l_output2=" - NGINX user account \"$l_user\" is not locked"
   fi
else
   l_output2=" - NGINX user account can not be determined.\n - file: \"/etc/nginx/nginx.conf\" is missing"
fi

# If no failure output is created, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi