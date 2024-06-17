#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/23/21   Verify /var/log is group-owned by syslog

stat -c "%G" /var/log | grep -Eq '^syslog\s*$' && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASS. /var/log is group-owned by \"$(stat -c "%G" /var/log)\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "FAIL. /var/log is group-owned by \"$(stat -c "%G" /var/log)\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
