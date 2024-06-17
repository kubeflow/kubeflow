#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/09/21   Check grub options exists
# E. Pinnell   07/27/21   Modified to correct error and simplify script
# E. Pinnell   12/17/21   Modified to simplify and leverage grep -P
# E. Pinnell   10/07/22   Modified to account for use of grubby, changed env to bash 

# **Note: if multiple grub options are listed they must be space separated**

l_output="" l_output2="" l_gout=""
l_gparameters="$XCCDF_VALUE_REGEX" # Space separated list

grub_parameter_exist_chk()
{
	l_gpfile="$(find /boot -type f \( -name 'grubenv' -o -name 'grub.conf' -o -name 'grub.cfg' \) -exec grep -Pl -- '^\h*(kernelopts=|linux|kernel)' {} +)"
	[ -f "$l_gpfile" ] && l_gout="$(grep -P -- "\b$l_gpar\b" "$l_gpfile")"
	l_lout="$(grep -P -- "\b$l_gpar\b" /boot/loader/entries/*)"
	if [ -n "$l_gout" ] || [ -n "$l_lout" ]; then
		[ -n "$l_gout" ] && l_output="$l_output\n - Grub parameter: \"$l_gpar\" exists in: \"$l_gpfile\""
		[ -n "$l_lout" ] && l_output="$l_output\n - Grub parameter: \"$l_gpar\" exists in: \"$(grep -Pl -- "\b$l_gpar\b" /boot/loader/entries/*)\""
	else
		l_output2="$l_output2\n - Grub parameter: \"$l_gpar\" is not set"
	fi
}

for l_gpar in $l_gparameters; do
	grub_parameter_exist_chk
done

# If l_output2 is not set, then we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
	[ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi