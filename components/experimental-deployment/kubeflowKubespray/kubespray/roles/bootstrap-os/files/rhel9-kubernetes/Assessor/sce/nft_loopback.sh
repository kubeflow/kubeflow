#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/12/20   Check nftables Loopback
# E. Pinnell   05/18/20   Modified to allow for multiple methods of disabling IPv6
# E. Pinnell   03/29/23   Modified to run in bash, change to grep -P, address overly restrictive regex check, and update IPv6 check method

l_output="" l_output2=""
if command -v nft && nft list ruleset | awk '/hook input/,/}/' | grep -Pq '^\h*iif\h+\"lo\"\h+(counter\h+packets\h+[0-9]*\h+bytes(\h+\d+)?\h+)?accept'; then
   l_output="$l_output\n - Loopback interface is configured to accept network traffic"
else
   l_output2="$l_output2\n - Loopback interface is not configured to accept network traffic"
fi
if command -v nft && nft list ruleset | awk '/hook input/,/}/' | grep -Pq '^\h*ip\h+saddr\h+127\.0\.0\.0\/8\h+(counter\s+packets\h+\d+\h+bytes(\h+\d+)?\h+)?drop'; then
   l_output="$l_output\n - Network traffic from iPv4 loopback interface is configured to drop"
else
   l_output2="$l_output2\n - Network traffic from iPv4 loopback interface is not configured to drop"
fi
#Test if IPv6 is disabled, if it's not disabled, check if IPv6 loopback is configured
if grep -Pqs '^\h*0\b' /sys/module/ipv6/parameters/disable; then
   if command -v nft && nft list ruleset | awk '/hook input/,/}/' | grep -Pq '^\h*ip6\h+saddr\s+\:\:1\h+(counter\s+packets\h+\d+\h+bytes(\h+\d+)?\h+)?drop'; then
      l_output="$l_output\n - Network traffic from iPv6 loopback interface is configured to drop"
   else
      l_output2="$l_output2\n - Network traffic from iPv6 loopback interface is not configured to drop"
   fi
fi
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
   [ -n "$l_output" ] && echo -e "- * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi