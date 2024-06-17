#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/09/21   Check that audit log files directory in 0750 or more restrictive

passing=""

alfdir=$(dirname "$(awk -F = '/^\s*log_file/ {print $2}' /etc/audit/auditd.conf | tr -d ' ')")
stat -c "%a" "$alfdir" | grep -Eq '^[0-7][0,1,4,5]0\s*$' && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed! Directory: \"$alfdir\" has mode \"$(stat -c "%a" "$alfdir")\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo "Failed! Directory: \"$alfdir\" has mode \"$(stat -c "%a" "$alfdir")\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
