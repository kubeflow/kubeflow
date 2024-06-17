#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/24/19   Check iptables list output
# E. Pinnell   01/13/22   Modified to stop dns lookup

ip6tables -L -n | grep -Eq "$XCCDF_VALUE_REGEX" && passing="true"

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # print the reason why we are failing
   echo "Missing ip6tables rule."
   exit "${XCCDF_RESULT_FAIL:-102}"
fi