#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/18/22   Check GDM screen locks can not be overridden

l_output="" l_output2=""
# Look for idle-delay to determine profile in use, needed for remaining tests
l_kfd="/etc/dconf/db/$(grep -Psril '^\h*idle-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
# Look for lock-delay to determine profile in use, needed for remaining tests
l_kfd2="/etc/dconf/db/$(grep -Psril '^\h*lock-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
if [ -d "$l_kfd" ]; then # If key file directory doesn't exist, options can't be locked
	if grep -Prilq '\/org\/gnome\/desktop\/session\/idle-delay\b' "$l_kfd"; then
		l_output="$l_output\n - \"idle-delay\" is locked in \"$(grep -Pril '\/org\/gnome\/desktop\/session\/idle-delay\b' "$l_kfd")\""
	else
		l_output2="$l_output2\n - \"idle-delay\" is not locked"
	fi
else
	l_output2="$l_output2\n - \"idle-delay\" is not set so it can not be locked"
fi
if [ -d "$l_kfd2" ]; then # If key file directory doesn't exist, options can't be locked
	if grep -Prilq '\/org\/gnome\/desktop\/screensaver\/lock-delay\b' "$l_kfd2"; then
		l_output="$l_output\n - \"lock-delay\" is locked in \"$(grep -Pril '\/org\/gnome\/desktop\/screensaver\/lock-delay\b' "$l_kfd2")\""
	else
		l_output2="$l_output2\n - \"lock-delay\" is not locked"
	fi
else
	l_output2="$l_output2\n - \"lock-delay\" is not set so it can not be locked"
fi
# Report results. If no failures output in l_output2, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
	[ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi