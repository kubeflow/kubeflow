#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# R. Mowen   7/25/20   Check if enabled
# XCCDF_VALUE_REGEX='authentication.*anonymous":{"enabled":false}'

curl -sSLv "http://${HOSTNAME_PORT}/api/v1/nodes/${NODE_NAME}/proxy/configz" 2>&1 | grep -Eq "$XCCDF_VALUE_REGEX" && passing="true"

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "pass"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
  echo "fail"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
