#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/07/22   Check if grub parameter exists with grubby (nix_grubby_not_exist_chk.sh)
# 

l_output="" l_output2="" l_gparout=""

l_gparout="$(grubby --info=ALL | grep -P "\b$XCCDF_VALUE_REGEX\b")"
if [ -z "$l_gparout" ]; then
   l_output=" - Grub parameter: \"$XCCDF_VALUE_REGEX\" is not set"
else
   l_output2=" - Grub parameter: \"$XCCDF_VALUE_REGEX\" is set:\n\n$l_gparout\n"
fi

# If l_output2 is not set, we pass
if [ -z "$l_output2" ]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n$l_output"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo -e "\n- Audit Result:\n  ** FAIL **\n$l_output2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi