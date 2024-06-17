#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ------------------------------------------------------------------------------------------------------------
# J. Brown   10/15/21     Verify all tmpfs, ext[2-4] and xfs mounts are included in the fapolicyd.mounts files

passing="false"
nl='
'

for mount in $(mount | egrep '^tmpfs| ext4| ext3| xfs' | awk '{ printf "%s\n", $3 }'); do
	if grep -P -- "^\s*$mount\s*$" /etc/fapolicyd/fapolicyd.mounts; then
		success="$success$nl$mount"
	else
		failure="$failure$nl$mount"
	fi
done

if [ -z $failure ]; then
	passing=true
fi

# If passing is true we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "All mounts included in /etc/fapolicyd/fapolicyd.mounts"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED: Mounts exist and not included in /etc/fapolicyd/fapolicyd.mounts"
	echo "$failure"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi