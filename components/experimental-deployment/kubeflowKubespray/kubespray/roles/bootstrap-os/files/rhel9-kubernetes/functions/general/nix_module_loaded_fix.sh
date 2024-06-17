#!/usr/bin/env bash
#
# CIS-LBK Remediation function
# ~/CIS-LBK/functions/remediations/nix_module_loaded_fix.sh
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Eric Pinnell       05/27/20    Remediate if a module is loadable
# 
module_loaded_fix()
{
output=""
output=$(lsmod | grep "$XCCDF_VALUE_REGEX")

if [ -z "$(lsmod | grep "$XCCDF_VALUE_REGEX")" ]; then
	output=$(modprobe -n -v "$XCCDF_VALUE_REGEX")
#	echo "PASSED, \"$output\""
	return "${XCCDF_RESULT_PASS:-101}"
else
	rmmod "$XCCDF_VALUE_REGEX"
	output=$(lsmod | grep "$XCCDF_VALUE_REGEX")
	if [ -z "$(lsmod | grep "$XCCDF_VALUE_REGEX")" ]; then
#		echo "PASSED, \"$output\""
		return "${XCCDF_RESULT_PASS:-103}"
	else
#		echo "Failed: \"$output\""
    	return "${XCCDF_RESULT_FAIL:-102}"
    fi
fi
}