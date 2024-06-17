#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ----------------------------------------------------------------
# J. Brown     10/12/21   Check permissions on audit log directory

# XCCDF_VALUE_REGEX should support direct strings and regex

passing=""

alfdir=$(dirname "$(awk -F = '/^\s*log_file\s*=\s*\S+/ {print $2}' /etc/audit/auditd.conf | tr -d ' ')")
stat -c "%a" "$alfdir" | grep -Eq "$XCCDF_VALUE_REGEX" && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed! Directory: \"$alfdir\" has mode \"$(stat -c "%a" "$alfdir")\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo "Failed! Directory: \"$alfdir\" has mode \"$(stat -c "%a" "$alfdir")\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi