#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/18/20   Check if IPv6 is disabled

passing=""

if [ -s /boot/grub2/grub.cfg ]; then
	[ -z "$(grep "^\s*linux" /boot/grub2/grub.cfg | grep -v ipv6.disabled=1)" ] && passing="true"
fi
if [ -s /boot/grub/grub.cfg ]; then
	[ -z "$(grep "^\s*linux" /boot/grub/grub.cfg | grep -v ipv6.disabled=1)" ] && passing="true"
fi
grep -Eq "^\s*net\.ipv6\.conf\.all\.disable_ipv6\s*=\s*1\b(\s+#.*)?$" /etc/sysctl.conf /etc/sysctl.d/*.conf && grep -Eq "^\s*net\.ipv6\.conf\.default\.disable_ipv6\s*=\s*1\b(\s+#.*)?$" /etc/sysctl.conf /etc/sysctl.d/*.conf && sysctl net.ipv6.conf.all.disable_ipv6 | grep -Eq "^\s*net\.ipv6\.conf\.all\.disable_ipv6\s*=\s*1\b(\s+#.*)?$" && sysctl net.ipv6.conf.default.disable_ipv6 | grep -Eq "^\s*net\.ipv6\.conf\.default\.disable_ipv6\s*=\s*1\b(\s+#.*)?$" && passing="true"

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "IPv6 is disabled on the system"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "IPv6 is enabled on the system"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi