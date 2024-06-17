#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/14/20   Check that iptables is not required (either UFW or nftables is being used)

passing=""
iptpi=""
ufwe=""
nftd=""

# Test to determine that iptables-persistent is installed
dpkg-query -s iptables-persistent 2>/dev/null | grep -q 'Status: install ok installed' && iptpi=y
# Test to determine if UCW is being used
if dpkg-query -s ufw 2>/dev/null | grep -q 'Status: install ok installed'; then
	ufw status | grep 'Status: active' && ufwe=y
fi
# Tests to determine if nftables is being used
systemctl is-enabled nftables 2>/dev/null | grep -q 'enabled' && nftd=n
# Test to verify that iptables is not required
if [ "$ufwe" = y ] || [ "$nftd" = n ]; then
	[ "$iptpi" != y ] && passing=true
fi
# If iptables is not required, passing is set to true. If so, we pass
if [ "$passing" = true ] ; then
	echo "Passed: "
	[ "$iptpi" != y ] && echo "iptables-persistent is not installed"
	[ "$ufwe" = y ] && echo "UFW is in use on the system"
	[ "$nftd" = n ] && echo "NFTables is in use on the system"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: "
    [ "$iptpi" = y ] && echo "iptables-persistent is installed on the system"
    [ "$ufwe" != y ] && echo "UFW is not configured on the system"
    [ "$nftd" != n ] && echo "NFTables is not configured on the system"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi