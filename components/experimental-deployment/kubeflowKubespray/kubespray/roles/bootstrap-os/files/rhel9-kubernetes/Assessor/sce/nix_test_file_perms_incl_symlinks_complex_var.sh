#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -----------------------------------------------------------------------------
# J. Brown   10/22/21    Check system commands permissions (including symlinks)

# XCCDF_VALUE_REGEX should contain the required mask for those perms
# example: "/bin /sbin /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin:0022"

dirs=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $1}')
perms=$(echo "$XCCDF_VALUE_REGEX" | awk -F ":" '{print $2}')

passing=false

files=$(find -L $dirs -perm /$perms -type f -exec ls -l {} \;)

if [ -z $files ]; then
	 passing=true
fi

#If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "All permissions on system commands are proper."
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED: System commands exist with improper permissions:"
	echo "$files"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi