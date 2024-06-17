#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/12/20   Check ip6tables Loopback
# E. Pinnell   07/14/20   Modified to work with both Debian and Fedora derived systems
#
test1=""
test2=""
test3=""
passing=""

[ -e /boot/grub2/grub.cfg ] && GCF=/boot/grub2/grub.cfg || GCF=/boot/grub/grub.cfg

if grep "^\s*linux" "$GCF" | grep -vq "ipv6.disable=1" ; then
	ip6tables -L INPUT -v -n | grep -Eq '^\s*\S+\s+\S+\s+ACCEPT\s+all\s+lo\s+\*\s+\:\:\/0\s+\:\:\/0\s*(\s+#.*)?$' && test1="pass"
	ip6tables -L INPUT -v -n | grep -Eq '^\s*\S+\s+\S+\s+DROP\s+all\s+\*\s+\*\s+\:\:1\s+\:\:\/0\s*(\s+#.*)?$' && test2="pass"
	ip6tables -L OUTPUT -v -n | grep -Eq '^\s*\S+\s+\S+\s+ACCEPT\s+all\s+\*\s+lo\s+\:\:\/0\s+\:\:\/0\s*(\s+#.*)?$' && test3="pass"
	[ "$test1" = pass ] && [ "$test2" = pass ] && [ "$test3" = pass ] && passing="true"
else
	passing="true"
fi

# If the tests both pass, passing is set to true.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "IPv6 is enabled on the system, but ip6tables loopback is not configured"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi