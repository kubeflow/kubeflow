#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/06/21   Check if NFTables is applicable (either firewalld or iptables is being used)

passing="" tst1="" tst2="" tst3=""
#Check the status of NFTables
if rpm -q nftables >/dev/null; then
	systemctl is-enabled nftables | grep -iq "masked" && tst1=pass
else
	tst1=pass
fi
# Check firewalld
if rpm -q firewalld >/dev/null; then
	systemctl is-enabled firewalld | grep -iq "enabled" && tst2=pass
fi
# Check iptables
if rpm -q iptables-services >/dev/null; then
	systemctl is-enabled iptables | grep -iq "enabled" && tst3=pass
fi
if [ "$tst1" = pass ]; then
	if [ "$tst2" = pass ] || [ "$tst3" = pass ]; then
		passing=true
	fi
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	[ "$tst2" = pass ] && echo "FirewallD is in use on the system"
	[ "$tst3" = pass ] && echo "iptables is in use on the system"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ "$tst1" != pass ] && echo "NFTables is installed and not masked"
	[ "$tst2" != pass ] && echo "FirewallD is not installed and enabled on the system"
	[ "$tst3" != pass ] && echo "IPTables is not installed and enabled on the system"
	[ "$tst1" = pass ] && [ "$tst2" != pass ] && [ "$tst3" != pass ] && echo "No firewall is installed and enabled on the system"
	echo "NFTables is active on the system, or iptables and FirewallD are not configured"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi