#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/05/21   Check if firewalld is applicable (either nftables or iptables is being used)

passing="" tst1="" tst2="" tst3="" fwdm="" fwdnr=""
#Check the status of firewalld
if rpm -q firewalld >/dev/null; then
	systemctl is-enabled firewalld | grep -iq "masked" && fwdm=yes
	if command -v firewall-cmd >/dev/null; then
		! firewall-cmd --state | grep -iq "running" && fwdnr=yes
	else
		fwdnr=yes
	fi
	[ "$fwdm" = yes ] && [ "$fwdnr" = yes ] && tst1=pass
else
	tst1=pass
fi
# Check the status of nftables
if rpm -q nftables >/dev/null; then
	systemctl is-enabled nftables | grep -iq "enabled" && tst2=pass
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
	[ "$tst2" = pass ] && echo "nftables is in use on the system"
	[ "$tst3" = pass ] && echo "iptables is in use on the system"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ "$tst1" != pass ] && echo "FirewallD is installed and enabled on the system"
	[ "$tst2" != pass ] && echo "NFTables is not installed and enabled on the system"
	[ "$tst3" != pass ] && echo "IPTables is not installed and enabled on the system"
	[ "$tst1" = pass ] && [ "$tst2" != pass ] && [ "$tst3" != pass ] && echo "No firewall is installed and enabled on the system"
	echo "firewalld is active on the system, or iptables or nftables are not configured"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi