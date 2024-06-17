#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/27/22   Check Fedora 34 based firewall Loopback address settings

{
   l_output="" l_output2=""
   if nft list ruleset | awk '/hook\s+input\s+/,/\}\s*(#.*)?$/' | grep -P -- '\H+\h+"lo"\h+accept'; then
      l_output="$l_output\n - Network traffic to the loopback address is correctly set to accept"
   else
      l_output2="$l_output2\n - Network traffic to the loopback address is not set to accept"
   fi
   l_ipsaddr="$(nft list ruleset | awk '/filter_IN_public_deny|hook\s+input\s+/,/\}\s*(#.*)?$/' | grep -P -- 'ip\h+saddr')"
   if grep -Pq -- 'ip\h+saddr\h+127\.0\.0\.0\/8\h+(counter\h+packets\h+\d+\h+bytes\h+\d+\h+)?drop' <<< "$l_ipsaddr" || grep -Pq -- 'ip\h+daddr\h+\!\=\h+127\.0\.0\.1\h+ip\h+saddr\h+127\.0\.0\.1\h+drop' <<< "$l_ipsaddr"; then
      l_output="$l_output\n - IPv4 network traffic from loopback address correctly set to drop"
   else
      l_output2="$l_output2\n - IPv4 network traffic from loopback address not set to drop"
   fi
   if grep -Pq -- '^\h*0\h*$' /sys/module/ipv6/parameters/disable; then
      l_ip6saddr="$(nft list ruleset | awk '/filter_IN_public_deny|hook input/,/}/' | grep 'ip6 saddr')"
      if grep -Pq 'ip6\h+saddr\h+::1\h+(counter\h+packets\h+\d+\h+bytes\h+\d+\h+)?drop' <<< "$l_ip6saddr" || grep -Pq -- 'ip6\h+daddr\h+\!=\h+::1\h+ip6\h+saddr\h+::1\h+drop' <<< "$l_ip6saddr"; then
         l_output="$l_output\n - IPv6 network traffic from loopback address correctly set to drop"
      else
         l_output2="$l_output2\n - IPv6 network traffic from loopback address not set to drop"
      fi
   fi
   # Print audit results
   if [ -z "$l_output2" ]; then
      echo -e "\n- Audit Result:\n  *** PASS ***\n$l_output"
      exit "${XCCDF_RESULT_PASS:-101}"
   else
      echo -e "\n- Audit Result:\n  *** FAIL ***\n$l_output2\n\n  - Correctly set:\n$l_output"
      exit "${XCCDF_RESULT_FAIL:-102}"
   fi
}
