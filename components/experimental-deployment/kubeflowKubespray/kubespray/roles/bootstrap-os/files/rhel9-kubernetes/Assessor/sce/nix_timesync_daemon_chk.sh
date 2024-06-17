#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/24/22   check if one and only one time sync daemon is in use
# E. Pinnell   07/10/23   Re-written to: improve performance, output, and correct error

l_output="" l_output2=""

package_not_exist_chk()
{
	l_out2=""
	if command -v rpm  &>/dev/null; then # Check for rpm based systems
		rpm -q "$l_package" &>/dev/null && l_out2="$l_out2\n  - Package: \"$l_package\" is installed on the system"
	fi
	if [ -z "$l_out2" ] && command -v dpkg-query &>/dev/null; then # Check for dpkg based systems "apt"
		dpkg-query -s "$l_package" &>/dev/null && l_out2="$l_out2\n  - Package: \"$l_package\" is installed on the system"
	fi
}

service_not_enabled_chk()
{
	l_out2=""
	if systemctl is-enabled "$l_service_name" 2>/dev/null | grep -q 'enabled'; then
		l_out2="$l_out2\n  - Daemon: \"$l_service_name\" is enabled on the system"
	fi
	if systemctl is-active "$l_service_name" 2>/dev/null | grep -q '^active'; then
			l_out2="$l_out2\n  - Daemon: \"$l_service_name\" is active on the system"
	fi
}

# check systemd-timesyncd daemon
l_service_name="systemd-timesyncd.service"
service_not_enabled_chk
if [ -n "$l_out2" ]; then
	l_timesyncd="y"
	l_out_tsd="$l_out2"
else
	l_timesyncd="n"
	l_out_tsd="\n  - Daemon: \"$l_service_name\" in not enabled and not active on the system"
fi

# check chrony
l_package="chrony"
package_not_exist_chk
if [ -n "$l_out2" ]; then
	l_chrony="y"
	l_out_chrony="$l_out2"
else
	l_chrony="n"
	l_out_chrony="\n  - Package: \"$l_package\" is not installed on the system"
fi

# check ntp
l_package="ntp"
package_not_exist_chk
if [ -n "$l_out2" ]; then
	l_ntp="y"
	l_out_ntp="$l_out2"
else
	l_ntp="n"
	l_out_ntp="\n  - Package: \"$l_package\" is not installed on the system"
fi

l_status="$l_timesyncd$l_chrony$l_ntp"

case "$l_status" in
	yyy|nyy|yny|yyn)
		l_output2=" - More than one time sync daemon is in use on the system$l_out_tsd$l_out_chrony$l_out_ntp" ;;
	nnn)
		l_output2=" - No time sync daemon is in use on the system$l_out_tsd$l_out_chrony$l_out_ntp" ;;
	ynn|nyn|nny)
		l_output=" - Only one time sync daemon is in use on the system$l_out_tsd$l_out_chrony$l_out_ntp" ;;
	*)
		l_output2=" - Unable to determine time sync daemon(s) status" ;;
esac

# CIS-CAT output
if [ -z "$l_output2" ]; then # If l_output2 is empty, we pass
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi