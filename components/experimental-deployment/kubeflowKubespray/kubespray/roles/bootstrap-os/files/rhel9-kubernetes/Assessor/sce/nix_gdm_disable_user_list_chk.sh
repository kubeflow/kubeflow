#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/14/22   Check GDM disable-user-list option

output="" output2=""
l_gdmfile="$(grep -Pril '^\h*disable-user-list\h*=\h*true\b' /etc/dconf/db)"
if [ -n "$l_gdmfile" ]; then
	output="$output\n - The \"disable-user-list\" option is enabled in \"$l_gdmfile\""
	l_gdmprofile="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_gdmfile")"
	if grep -Pq "^\h*system-db:$l_gdmprofile" /etc/dconf/profile/"$l_gdmprofile"; then
		output="$output\n - The \"$l_gdmprofile\" exists"
	else
		output2="$output2\n - The \"$l_gdmprofile\" doesn't exist"
	fi
	if [ -f "/etc/dconf/db/$l_gdmprofile" ]; then
		output="$output\n - The \"$l_gdmprofile\" profile exists in the dconf database"
	else
		output2="$output2\n - The \"$l_gdmprofile\" profile doesn't exist in the dconf database"
	fi
else
	output2="$output2\n - The \"disable-user-list\" option is not enabled"
fi
# Report results. If no failures output in l_output2, we pass
if [ -z "$output2" ]; then
	echo -e "\n- Audit result:\n   *** PASS: ***\n$output\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n   *** FAIL: ***\n$output2\n"
	[ -n "$output" ] && echo -e "$output\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi