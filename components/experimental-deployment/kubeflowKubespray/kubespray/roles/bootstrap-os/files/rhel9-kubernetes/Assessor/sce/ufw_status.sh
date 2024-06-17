#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   12/11/19   Check ufw status (verbose)
# E. Pinnell   03/20/23   Modified to run in bash and use grep -P 

ufw status verbose | grep -Pq -- "$XCCDF_VALUE_REGEX" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Missing ufw rule."
    exit "${XCCDF_RESULT_FAIL:-102}"
fi