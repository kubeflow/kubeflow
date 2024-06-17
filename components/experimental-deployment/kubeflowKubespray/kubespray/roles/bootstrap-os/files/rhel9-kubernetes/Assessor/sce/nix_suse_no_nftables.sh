#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/31/21   Check that nftables is not required (either firewalld or iptables is being used)

passing="" test1="" test2="" test3="" test4="" test5=""

# Tests to determine that nftables is not in use
systemctl is-enabled nftables | grep -q "masked" && systemctl show nftables | grep -vq "ActiveState=active" && test1="y"
rpm -q nftables | grep -q "not installed" && test2="y"
if [ "$test1" = y ] || [ "$test2" = y ] ; then
	test3="y"
fi
# Test to determine if FirewallD is being used
systemctl is-enabled firewalld | grep -q "enabled" && systemctl show firewalld | grep -q "ActiveState=active" && rpm -q firewalld | grep -vq "not installed" && test4="y"

# Tests to determine if iptables is being used
rpm -q iptables | grep -vq "not installed" && iptables -L | grep -P "^\h*(ACCEPT|REJECT)\h+.*$" && test5="y"

# Test to verify that nftables is not required
[ "$test3" = y ] && [ "$test4" = y ] && passing="true"
[ "$test3" = y ] && [ "$test5" = y ] && passing="true"

# If nftables is not required, passing is set to true. If so, we pass
if [ "$passing" = true ] ; then
	echo "FirewallD or iptables are being used on this system"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "nftables is active on the system, or FirewallD or iptables are not configured"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi