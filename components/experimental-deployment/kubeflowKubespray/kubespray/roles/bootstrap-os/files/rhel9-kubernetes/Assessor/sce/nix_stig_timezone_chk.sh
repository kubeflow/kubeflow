#!/usr/bin/env sh

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/17/21   Check system timezone is GMT or UTC (STIG)

passing="" 

if timedatectl status | grep -iq 'Time zone: GMT (GMT, +0000)' ||  timedatectl status | grep -iq 'Time zone: UTC (UTC, +0000)'; then
	passing=true
fi

# If the tests all pass, we pass
if [ "$passing" = true ] ; then
	echo "PASSED! The system timezone is: \"$(timedatectl status | grep -i "time zone")\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED! The system timezone is: \"$(timedatectl status | grep -i "time zone")\""
	exit "${XCCDF_RESULT_FAIL:-102}"
fi