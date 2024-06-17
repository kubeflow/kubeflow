#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------------------------------------------------
# J. Brown     10/12/21   Check that audit log directory are not read or write-accessible by unauthorized users

passing=""

alfdir=$(dirname "$(awk -F = '/^\s*log_file\s*=\s*\S+/ {print $2}' /etc/audit/auditd.conf | awk '{ sub(/^[ \t]+/, ""); print }' | awk '{ sub(/[ \t]+$/, ""); print }')")
output="$(find $alfdir -maxdepth 1 -type d \( ! -group root -a ! -group adm \))"

[ -z "$output" ] && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed.  \"$alfdir\" belongs to group \"adm\" or \"root\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo "Failed!"
	for file in $output; do
		echo "\"$alfdir\" belongs to group \"$(stat -c "%G" "$alfdir")\""
	done
	exit "${XCCDF_RESULT_FAIL:-102}"
fi