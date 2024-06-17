#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure security auditing retention
# Eric Pinnell        04/22/20   Modified to include regex for ge and case insensitive
# Edward Byrd		  05/13/22	 Updated to reflect current recommendation options
# 

output=$(
grep expire-after /etc/security/audit_control
)

passing=""

grep -Eiq '\s*expire-after:([6-9][0-9]|[1-9][0-9]{2,})D\b' /etc/security/audit_control && passing=true
grep -Eiq '\s*expire-after:([5-9]|[1-9][0-9]+)G\b' /etc/security/audit_control && passing=true
grep -Eiq '\s*expire-after:(10[2-9][4-9]|10[3-9][0-9]|[1-9][1-9][0-9]{2,}|[1-9][0-9]{4,})M\b' /etc/security/audit_control && passing=true

# If either result returns pass, otherwise fail.
if [ "$passing" = true ] ; then
	echo "Passed: \"$output\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: \"$output\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
