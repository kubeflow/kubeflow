#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/20/21   Check world-writable directories are group-owned

passing="" output=""

! df --local -P 2>/dev/nul | awk '{if (NR!=1) print $6}' | xargs -I '{}' find '{}' -xdev -type d -perm -0002 -gid +999 && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "PASSED"
	echo "All world-writable directories are group-owned by root, sys, bin, or an application Group Identifier (GID)"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED, The following  world-writable directory or directories have the sticky bit set and is not group-owned by root, sys, bin, or an application Group Identifier (GID)"
	echo "$(df --local -P 2>/dev/nul | awk '{if (NR!=1) print $6}' | xargs -I '{}' find '{}' -xdev -type d -perm -0002 -gid +999)"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)