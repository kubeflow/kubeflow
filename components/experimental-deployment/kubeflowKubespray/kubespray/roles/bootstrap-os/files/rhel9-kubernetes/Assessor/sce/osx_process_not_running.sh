#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Eric Pinnell        04/23/20	Check in a process in running
# 

passing=""
[ -z "$(pgrep "$XCCDF_VALUE_REGEX")" ] && passing=true

# If results returns pass, otherwise fail.
if [ "$passing" = "true" ] ; then
	echo "Process \"$XCCDF_VALUE_REGEX\" is not running"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Process \"$XCCDF_VALUE_REGEX\" is running"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
