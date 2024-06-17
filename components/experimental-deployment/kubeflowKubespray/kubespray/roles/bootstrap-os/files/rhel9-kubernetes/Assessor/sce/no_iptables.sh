#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/25/20   Check that iptables is not required (either firewalld or nftables is being used)

passing=""
test1=""
test2=""
test3=""

# Tests to determine that iptables-services is not installed
rpm -q iptables-services | grep -q "not installed" && test1="y"
# Test to determine if FirewallD is being used
systemctl is-enabled firewalld | grep -q "enabled" && systemctl status firewalld | grep -q "Active: active (running) " && rpm -q firewalld | grep -vq "not installed" && test2="y"
# Tests to determine if nftables is being used
systemctl is-enabled nftables | grep -q "enabled" && systemctl status nftables | grep -q "Active: active (running) " && rpm -q nftables | grep -vq "not installed" && test3="y"
# Test to verify that iptables is not required
[ "$test1" = y ] && [ "$test2" = y ] && passing="true"
[ "$test1" = y ] && [ "$test3" = y ] && passing="true"
# If iptables is not required, passing is set to true. If so, we pass
if [ "$passing" = true ] ; then
	echo "FirewallD or nftables are being used on this system"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "iptables is active on the system, or neither FirewallD or nftables are not configured"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi