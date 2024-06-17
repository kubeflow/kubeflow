#!/usr/bin/env sh

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   07/15/20   Check existence of /etc/passwd groups in /etc/group 
#
passing=""
output=""
EPG=""
EGG=""

EPG=$(cut -d: -f4 /etc/passwd | uniq)
EGG=$(cut -d: -f3 /etc/group | uniq)
for group in $EPG; do
#	if ! grep -Eq "^$group$" <<< "$EGG"; then
	if [ -z "$(echo "$EGG" | grep -E "(^|\s)$group\b")" ]; then
		[ -n "$output" ] && output="$output $group" || output=$group
	fi
done
[ -z "$output" ] && passing=true
# If the test passes, we pass
if [ "$passing" = true ] ; then
	echo "All groups in /etc/passwd exist in /etc/group"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "The group(s) \"$output\" exist in /etc/passwd but don't exist in /etc/group"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi