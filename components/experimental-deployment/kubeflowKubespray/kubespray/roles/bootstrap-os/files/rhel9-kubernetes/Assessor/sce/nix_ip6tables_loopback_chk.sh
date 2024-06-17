#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/10/21   Check ip6tables Loopback

test1="" test2="" test3="" nipv6="" passing="" output=""

# Set grub information
grubfile="$(find -L /boot -name 'grub.c*')"
grubext="$(echo "$grubfile" | cut -d. -f2)"

# Check grub files
if [ -s "$grubfile" ]; then
	if [ "$grubext" = "conf" ]; then
		! grep "^\s*kernel" "$grubfile" | grep -vq ipv6.disable=1 && nipv6="true" && output="ipv6 disabled in grub config"
	elif [ "$grubext" = "cfg" ]; then
		! grep "^\s*linux" "$grubfile" | grep -vq ipv6.disable=1 && nipv6="true" && output="ipv6 disabled in grub config"
	fi
fi

# Check network files
if grep -Eqs "^\s*net\.ipv6\.conf\.all\.disable_ipv6\s*=\s*1\b" /etc/sysctl.conf /etc/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /run/sysctl.d/*.conf && grep -Eqs "^\s*net\.ipv6\.conf\.default\.disable_ipv6\s*=\s*1\b" /etc/sysctl.conf /etc/sysctl.d/*.conf /usr/lib/sysctl.d/*.conf /run/sysctl.d/*.conf && sysctl net.ipv6.conf.all.disable_ipv6 | grep -Eq "^\s*net\.ipv6\.conf\.all\.disable_ipv6\s*=\s*1\b" && sysctl net.ipv6.conf.default.disable_ipv6 | grep -Eq "^\s*net\.ipv6\.conf\.default\.disable_ipv6\s*=\s*1\b"; then
	[ -n "$output" ] && output="$output, and in sysctl config" || output="ipv6 disabled in sysctl config"
	nipv6="true"
fi

# If IPv6 is enabled, check ipv6tables loopback configuration
if [ -z "$nipv6" ]; then
	ip6tables -L INPUT -v -n | grep -Eq -- '^\s*\S+\s+\S+\s+ACCEPT\s+all\s+lo\s+\*\s+\:\:\/0\s+\:\:\/0\b' && test1="pass"
	ip6tables -L INPUT -v -n | grep -Eq -- '^\s*\S+\s+\S+\s+DROP\s+all\s+\*\s+\*\s+\:\:1(\/[0-9]+)?\s+\:\:\/0\b' && test2="pass"
	ip6tables -L OUTPUT -v -n | grep -Eq -- '^\s*\S+\s+\S+\s+ACCEPT\s+all\s+\*\s+lo\s+\:\:\/0\s+\:\:\/0\b' && test3="pass"
fi

# Check to see if check is passed
if [ "$test1" = pass ] && [ "$test2" = pass ] && [ "$test3" = pass ]; then
	passing="true"
elif [ "$nipv6" = true ]; then
	passing="true"
fi

# If the tests both pass, passing is set to true.  If so, we pass
if [ "$passing" = true ]; then
	if [ "$nipv6" = true ]; then
		echo "$output"
	else
		echo "Passed: IP6Tables loopback is configured"
	fi
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: IPv6 is enabled on the system, but ip6tables loopback is not configured"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi