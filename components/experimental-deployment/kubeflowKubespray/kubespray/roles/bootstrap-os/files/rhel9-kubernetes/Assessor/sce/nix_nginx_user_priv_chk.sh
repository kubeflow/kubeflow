#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/03/22   Check NGINX user privileges


l_output="" l_output2=""
#Check if user is set
l_user="$(awk '$1~/^\s*user\s*$/ {print $2}' /etc/nginx/nginx.conf | sed -r 's/;.*//g')"
if [ -z "$l_user" ]; then
   l_output2="$l_output2\n - Dedicated user is not configured in \"/etc/nginx/nginx.conf\""
else
   l_output="$l_output\n - Dedicated user set to \"$l_user\" in \"/etc/nginx/nginx.conf\""
   # Check if user has sudo privileges
   if sudo -l -U nginx 2>&1 | grep -Piq -- "^\h*user\h+$l_user\h+is\h+not\h+allowed\h+to\h+run\h+sudo"; then
      l_output="$l_output\n - User: \"$l_user\" is not allowed to run sudo"
   else
      l_output2="$l_output2\n - User: \"$l_user\" is allowed to run sudo"
   fi
   # Check if user is part of any unexpected groups
   l_ugroups="$(groups "$l_user" | awk -F: '{print $2}' | xargs)"
   l_uagroup="$(id -gn "$l_user")"
   for l_grp in $l_ugroups; do
      ! grep -Pq -- "^\h*$l_uagroup\h*$" <<< $l_grp && l_output2="$l_output2\n - User \"$l_user\" is assigned to group: \"$l_grp\" as well as their primary group: \"$l_uagroup\""
   done
fi
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi

