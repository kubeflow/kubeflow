#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/16/20   Check that a systemd service is enabled

passing=""

systemctl is-enabled "$XCCDF_VALUE_REGEX" | grep -q enabled && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "Service $XCCDF_VALUE_REGEX is enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Service $XCCDF_VALUE_REGEX is disabled, masked, or doesn't exist"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi