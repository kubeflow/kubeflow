#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/23/21   Verify file is group-owned by group (file and group(s) as regex need to be separated by a ':')
# E. Pinnell   09/14/22   Updated to use bash and follow symlinks

l_output=""
l_fname=$(awk -F : '{print $1}' <<< "$XCCDF_VALUE_REGEX")
l_gname=$(awk -F : '{print $2}' <<< "$XCCDF_VALUE_REGEX")
l_output="$(stat -Lc "%G" "$l_fname")"

# If the regex matched, output would be generated.  If so, we pass
if [[ "$l_output" =~ $l_gname ]]; then
	echo -e "\n- Audit Result:\n  ** PASS **\n - \"$l_fname\" is group-owned by group \"$l_output\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo -e "\n- Audit Result:\n  ** FAIL **\n - \"$l_fname\" is group-owned by group \"$l_output\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi