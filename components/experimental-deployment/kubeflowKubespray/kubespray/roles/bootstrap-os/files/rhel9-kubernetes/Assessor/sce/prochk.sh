#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 07/22/2019 Check for processor type
#

output=$(
arch | grep -E "$XCCDF_VALUE_REGEX"
)

# If the regex matched, output would be generated.  If so, we pass
if [ "$output" != "" ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "No processor type was found matching the regular expression $XCCDF_VALUE_REGEX"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
