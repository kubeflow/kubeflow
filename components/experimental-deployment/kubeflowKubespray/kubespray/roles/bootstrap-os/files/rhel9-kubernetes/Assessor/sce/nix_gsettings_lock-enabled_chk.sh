#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/29/21   Verify gsettings lock-enabled is true

passing="" output=""

if command -v gsettings; then
	output=$(gsettings get org.gnome.desktop.screensaver lock-enabled)
else
	output="gsettings command doesn't exist on the system"
fi

[ "$output" = true ] && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASS.  lock-enabled is \"$output\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	if [ -n "$output" ]; then
		echo "Fail. lock-enabled is \"$output\""
	else
		echo "Fail. $output"
	fi
	exit "${XCCDF_RESULT_FAIL:-102}"
fi