#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Reduce the sudo timeout period
# Eric Pinnell        04/23/20   Fixed Test
# Edward Byrd		  06/16/22   Updated for new audit

sudotimeout=$(
/usr/bin/sudo /usr/bin/sudo -V | /usr/bin/grep -c "Authentication timestamp timeout: 0.0 minutes"
)

# If results returns pass, otherwise fail.
if [ $sudotimeout == 1 ] ; then
	echo "PASSED"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
