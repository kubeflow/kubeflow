#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/03/22   Check NGINX module existence

l_output=""
if [ -z "$XCCDF_VALUE_REGEX" ]; then
   l_output=" - Module name not correctly assigned to test variable"
else
   if command -v > /dev/null 2>&1 nginx; then
      nginx -V 2>&1 | grep -Pq "(\h*|\b)--with-$XCCDF_VALUE_REGEX(\b.*|\h*)$" && l_output="  - NGINX module \"$XCCDF_VALUE_REGEX\" is installed"
   else
      l_output="  - The command: \"nginx\" doesn't exist on the system\n  - verify that NGINX is installed"
   fi
fi
# If module doesn't exist, l_output will be empty, if so we pass
if [ -z "$l_output" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n - NGINX module \"$XCCDF_VALUE_REGEX\" is not installed"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi