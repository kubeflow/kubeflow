#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/13/20   Check that nftables is not required (either UFW or iptables is being used)
# E. Pinnell   03/21/23   Modified to run in bash and correct possible false fail and improve output
#

l_output="" l_output2="" l_output3=""
nftni="" nftd="" nonft="" ufwe=""
# Test to determine if UFW is being used
if dpkg-query -W ufw > /dev/null 2>&1; then
	ufw status | grep -q 'Status: active' && ufwe=y
fi
# Tests to determine if iptables is being used
dpkg-query -W iptables-persistent > /dev/null 2>&1 && iptpi=y
# Tests to determine that nftables is not in use
if ! dpkg-query -W nftables > /dev/null 2>&1; then
	nftni=y
elif ! systemctl is-enabled nftables 2>/dev/null | grep -q 'enabled' && ! systemctl is-active nftables 2>/dev/null | grep -q '^active'; then
	nftd="y"
fi

if [ "$nftni" = y ] || [ "$nftd" = y ]; then
	nonft="y"
fi
# Test if NFTables is not used
if [ "$nonft" = y ]; then
	l_output="$l_output\n  - NFTables is not in use on the system"
	if [ "$ufwe" != y ] && [ "$iptpi" != y ]; then
		l_output2="$l_output2\n  - No firewall is configured on the system"
	fi
else
	l_output2="  - NFTables is in use on the system\n$l_output2"
fi
# Let's create some better reporting
if [[ "$nonft" != y &&  "$ufwe" = y ]] || [[ "$ufwe" = y && "$iptpi" = y ]] || [[ "$nonft" != y && "$iptpi" = y ]]; then
	l_output3="$l_output3\n  - Multiple firewalls are running on the system"
fi
[ "$ufwe" = y ] && l_output3="$l_output3\n  - UFW is in use on the system"
[ "$iptpi" = y ] && l_output3="$l_output3\n  - IPTables is in use on the system"
[ "$ufwe" != y ] && l_output3="$l_output3\n  - UFW is not configured"
[ "$nonft" = y ] && l_output3="$l_output3\n  - NFTables is not configured"
[ "$iptpi" != y ] && l_output3="$l_output3\n  - IPTables is not configured"
[ -n "$l_output3" ] && l_output3="\n  -- INFO --\n$l_output3"
# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
	[ -n "$l_output3" ] && echo -e "$l_output3\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
	[ -n "$l_output3" ] && echo -e "$l_output3\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi