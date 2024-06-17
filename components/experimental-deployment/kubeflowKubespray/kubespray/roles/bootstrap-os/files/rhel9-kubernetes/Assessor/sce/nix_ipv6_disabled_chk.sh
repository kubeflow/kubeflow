#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/03/22   Check that IPv6 has been disabled
	
{
   l_output="" l_output2=""
   if grep -Pqs '^\h*0\b' /sys/module/ipv6/parameters/disable; then
      l_output2=" - IPv6 is enabled on the system"
   else
      l_output=" - IPv6 is not enabled on the system"
   fi

   # If l_output2 is empty, then we pass
   if [ -z "$l_output2" ]; then
      echo -e "\n- Audit Results:\n ** Pass **\n$l_output"
      exit "${XCCDF_RESULT_PASS:-101}"
   else
      # print the reason why we are failing
      echo -e "\n- Audit Results:\n ** Fail **\n$l_output2"
		exit "${XCCDF_RESULT_FAIL:-102}"
   fi
}