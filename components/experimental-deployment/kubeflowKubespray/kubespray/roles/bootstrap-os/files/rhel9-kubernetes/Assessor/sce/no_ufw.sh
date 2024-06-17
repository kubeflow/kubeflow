#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/20/20   Check that Uncomplicated Firewall (UFW) is not required (either nftables or iptables is being used)
# E. Pinnell   07/10/20   Modified
# E. Pinnell   03/20/23   Modified to run in bash

passing="" ufwne="" noufw="" nftd="" iptpi=""

# Check UFW status
if ! dpkg-query -W > /dev/null 2>&1 ufw; then
	noufw=y
else
	if ufw status | grep -Pq -- '^\h*Status:\h+inactive\b'; then
		ufwne="y"
	else
		ufwne="n"
	fi
fi
# Check nftables status
systemctl is-enabled nftables 2>/dev/null | grep -q 'enabled' && nftd=n
# Check IPTables
dpkg-query -W > /dev/null 2>&1 iptables-persistent && iptpi=y
# check if ufw is not the firewall configuration method in use
if [ "$nftd" = n ] || [ "$iptpi" = y ]; then
	[ "$noufw" = y ] && passing=true
fi

# If passing is true, we pass
if [ "$passing" = true ] ; then
	[ "$iptpi" = y ] && echo "IPTables are being used on this system"
	[ "$nftd" = n ] && echo "NFTables are being used on this system"
   exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	[ "$ufwne" = n ] && echo "Uncomplicated Firewall is active on the system"
   [ "$nftd" != n ] && [ "$iptpi" != y ] && echo "Both IPTables and NFTables are not configured"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi