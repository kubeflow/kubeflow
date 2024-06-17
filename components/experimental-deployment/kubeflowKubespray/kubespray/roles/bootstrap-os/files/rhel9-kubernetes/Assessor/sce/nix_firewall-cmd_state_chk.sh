#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/05/21   Find firewalld state

passing="" output=""

if command -v firewall-cmd >/dev/null; then
	firewall-cmd --state | grep -iq "$XCCDF_VALUE_REGEX" && passing=true
	output="firewalld state is: \"$(firewall-cmd --state)\""
fi

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "nftables or iptables are being used on this system"
	exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "FAILED"
	if [ -n "$output" ]; then
		echo "$output"
	else
		echo "FirewallD command \"firewall-cmd\" not avaliable on the system"
	fi
	exit "${XCCDF_RESULT_FAIL:-102}"
fi