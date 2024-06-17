#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# J. Brown   09/15/21     Check grub2 config via grub2-editenv command

output=""
passing=""

# Decode complex variable
# This script will accept a complex variable in the format {name}:{value}
# Example complex variable: 'page_poison:page_poison=1'
# The variable is split below with the first item being used in the grep of the output of grub2-editenv -list
# The second item is the full setting to be validated

param_name=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $1}')
param_value=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $2}')

# Collect grub2-editenv output
grub_data=$(grub2-editenv - list | grep "$param_name")

if ! grub2-editenv - list | grep -P "$param_name" ; then
	output="Value NOT found: $param_name"
	passing=false
else
	if  echo "$grub_data" | grep -P "$param_value"; then
		passing=true
	else
		output="$grub_data"
		passing=false
	fi
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED:"
	echo "grubeditenv -list returned: \"$output\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi

