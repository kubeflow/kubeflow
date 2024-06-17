#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/20/20   Check that firewalld is not required (either nftables or iptables is being used)

passing=""
fdisabled=""
fdni=""
iptsi=""
nfti=""
fwipt1=""
fwipt2=""
fwnft1=""
fwnft2=""
fwipt=""
fwnft=""

systemctl is-enabled firewalld | grep -q "masked" && systemctl status firewalld | grep -q "Active: inactive (dead) " && fdisabled="y"
rpm -q firewalld | grep -q "not installed" && fdni="y"
rpm -q iptables-services | grep -vq "not installed" && iptsi="y"
rpm -q nftables | grep -vq "not installed" && nfti="y"
[ "$iptsi" = y ] && [ "$fdisabled" = y ] && fwipt1="y"
[ "$iptsi" = y ] && [ "$fdni" = y ] && fwipt2="y"
[ "$nfti" = y ] && [ "$fdisabled" = y ] && fwnft1="y"
[ "$nfti" = y ] && [ "$fdni" = y ] && fwnft2="y"
if [ "$fwipt1" = y ] || [ "$fwipt2" = y ] ; then
	fwipt=y
elif [ "$fwnft1" = y ] || [ "$fwnft2" = y ] ; then
	fwnft=y
fi
if [ "$fwipt" = y ] || [ "$fwnft" = y ] ; then
	passing="true"
fi

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "nftables or iptables are being used on this system"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "firewalld is active on the system, or iptables or nftables are not configured"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi