#!/usr/bin/env sh

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/17/20   Check existence of a mountpoint 

passing=""

mount | grep -Eq "$XCCDF_VALUE_REGEX" && passing=true

# If the tests all pass, we pass
if [ "$passing" = true ] ; then
	echo "mountpoint is mounted"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "mountpoint is not mounted"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi