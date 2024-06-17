#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/20/21   Check nfs mounts for mount options

passing="" output=""

if grep -P '^\h*\H+\h+\/\H+\h+nfs\h+(.*)?$' /etc/fstab | grep -Evq "\b$XCCDF_VALUE_REGEX\b"; then
	output="nfs mountpoint \"$(grep -P '^\h*\H+\h+\/\H+\h+nfs\h+(.*)?$' /etc/fstab | grep -Ev "\b$XCCDF_VALUE_REGEX\b")\" exists without mount option \"$XCCDF_VALUE_REGEX\""
else
	passing=true
fi

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "All nfs mountpoint include the \"$XCCDF_VALUE_REGEX\" mountpoint option"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	echo "$output"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)