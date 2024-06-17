#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   12/11/19   Check if system is not 64 bit arch

arch | grep -q "x86_64" && passing="true"

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "system is running: $(arch)"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi