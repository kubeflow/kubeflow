#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/06/21   Check Check if IPTables is applicable (either firewalld or nftables is being used)

passing="" tst1="" tst2="" tst3=""
#Check the status of iptables-services
! rpm -q iptables-services >/dev/null && tst1=pass
# Check firewalld
# Check firewalld
if rpm -q firewalld >/dev/null; then
	systemctl is-enabled firewalld | grep -iq "enabled" && tst2=pass
fi
# Check nftables
if rpm -q nftables >/dev/null; then
	systemctl is-enabled nftables | grep -iq "enabled" && tst3=pass
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
	[ "$tst3" = pass ] && echo "NFTables is in use on the system"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ "$tst1" != pass ] && echo "iptables-services is installed"
	[ "$tst2" != pass ] && echo "FirewallD is not installed and enabled on the system"
	[ "$tst3" != pass ] && echo "NFTables is not installed and enabled on the system"
	[ "$tst1" = pass ] && [ "$tst2" != pass ] && [ "$tst3" != pass ] && echo "No firewall is fully installed and enabled on the system"
	echo "IPTables is active on the system, or NFTables and FirewallD are not configured"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi