#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/10/20   Check if wireless is disabled

if command -v mnci >/dev/null 2>&1 ; then
	nmcli radio all | grep -Eq "^\s*\S+\s+disabled\s+\S+\s+disabled\s*$" && passing=true
else
	if [ -z "$(find /sys/class/net/ -type d -name 'wireless')" ]; then
		passing=true
	else
		drivers=$(for driverdir in $(find /sys/class/net/* -type d -name 'wireless' | xargs -0 dirname | xargs basename); do basename "$(readlink -f /sys/class/net/"$driverdir"/device/driver)";done | sort -u)
		for dm in $drivers; do
			if grep -Eq "^\s*install $dm \/bin\/(true|false)" /etc/modprobe.d/*.conf; then
				passing=true
			fi
		done
	fi
fi

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "Wireless is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Wireless is not disabled"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi