#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ----------------------------------------------------------------------------
# J. Brown     10/12/21   Check that audit log file directory is owned by root

passing=""

alfdir=$(dirname "$(awk -F = '/^\s*log_file\s*=\s*\S+/ {print $2}' /etc/audit/auditd.conf | awk '{ sub(/^[ \t]+/, ""); print }' | awk '{ sub(/[ \t]+$/, ""); print }')")
output="$(find $alfdir -maxdepth 1 -type d ! -user root)"

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  \"$alfdir\" is owned by root"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo "Failed!"
	for file in $output; do
		echo "\"$alfdir\" is owned by \"$(stat -c "%U" "$alfdir")\""
	done
	exit "${XCCDF_RESULT_FAIL:-102}"
fi