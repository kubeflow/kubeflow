#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/10/21   Check iptables firewall rules exist for all open ports

passing="" output="" output2=""

iptrules=$(iptables -L INPUT -v -n)
for oport in $(ss -4tuln | awk '($5!~/%lo:/ && $5!~/127.0.0.1:/) {split($5, a, ":"); print a[2]}'); do
	if [ -n "$oport" ]; then
		if echo $iptrules | grep -Eq ":$oport\b"; then
			[ -z "$passing" ] && passing=true
		else
			passing=false
			[ -z "$output" ] && output="The following open port(s) dont have a firewall rule: \"$oport\"" || output="$output, \"$oport\""
		fi
	fi
done
if [ -z "$passing" ] && [ -z "$output" ]; then
	passing=true
	output2="No open ports foud on the system"
fi

# If the tests both pass, passing is set to true.  If so, we pass
if [ "$passing" = true ]; then
	echo "PASSED: All open ports have a firewall rule"
	[ -n "$output2" ] && echo "$output2"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: $output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi