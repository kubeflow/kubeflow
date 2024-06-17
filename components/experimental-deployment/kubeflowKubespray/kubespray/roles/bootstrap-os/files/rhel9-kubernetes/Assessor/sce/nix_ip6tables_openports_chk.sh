#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/11/21   Check ip6tables firewall rules exist for all open ports

passing="" output="" output2=""

ip6trules=$(ip6tables -L INPUT -v -n)
for oport in $(ss -6tuln | awk '($2~/(LISTEN|UNCONN|ESTAB)/ && $5!~/\{?::1\]?:/){print}' | sed -E 's/^.*:([0-9]+)\s+.*$/\1/'); do
	if [ -n "$oport" ]; then
		if echo $ip6trules | grep -Eq ":$oport\b"; then
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