#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  12/30/19   check status of a service
#

test=$(systemctl is-enabled "$XCCDF_VALUE_REGEX" 2>/dev/null)
[ "$test" != "enabled" ] && passing="true"

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "The service: \"$XCCDF_VALUE_REGEX\" is not enabled"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "The service: \"$XCCDF_VALUE_REGEX\" is enabled"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
