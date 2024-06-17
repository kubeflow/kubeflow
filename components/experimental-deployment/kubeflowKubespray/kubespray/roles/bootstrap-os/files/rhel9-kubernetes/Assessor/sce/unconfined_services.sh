#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/23/19   Check unconfined services
# E. Pinnell   03/27/20   Script corrected
# E. Pinnell   05/03/21   Updated test. Set variable to null before testing

passing=""

! ps -eZ | grep -q unconfined_service_t && passing=true

# If the test passes, we pass
if [ "$passing" = true ] ; then
	echo "No unconfined services exist"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "Unconfined service(s): $(ps -eZ | grep unconfined_service_t) exist"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi