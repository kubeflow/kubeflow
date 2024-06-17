#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/23/21   Verify root accounts is locked

passwd -S root | grep -Eq '^root\s+(L|LK)\s+.*$' && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "root accounts is locked"
	exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "root account is not locked"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
