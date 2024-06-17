#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/22/2020   Group in /etc/passwd not in /etc/group
#

passing=""
output=""

for grp in $(cut -s -d: -f4 /etc/passwd | sort -u ); do
	if ! grep -q -P "^.*?:[^:]*:$grp:" /etc/group; then 
		[ -z "$output" ] && output="The following group(s) are referenced by /etc/passwd but don't exist in /etc/group: \"$grp\"" || output="$output, \"$grp\""
	fi
done

[ -z "$output" ] && passing=true

# If test passes, passing will be true, and we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi