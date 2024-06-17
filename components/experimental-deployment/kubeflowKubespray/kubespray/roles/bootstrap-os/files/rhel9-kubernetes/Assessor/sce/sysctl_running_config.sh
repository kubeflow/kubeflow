#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/15/19   Check sysctl running configuration

sysctl -a | grep -Eq "$XCCDF_VALUE_REGEX" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "sysctl parameter is: $(sysctl -a | grep -E "$XCCDF_VALUE_REGEX")"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Missing sysctl parameter."
    exit "${XCCDF_RESULT_FAIL:-102}"
fi