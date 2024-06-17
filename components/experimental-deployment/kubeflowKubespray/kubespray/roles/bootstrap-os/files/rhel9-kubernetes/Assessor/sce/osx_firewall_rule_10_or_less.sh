#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Review Application Firewall Rules
# 

output=$(
/usr/libexec/ApplicationFirewall/socketfilterfw --listapps | grep ALF | awk '{print $7}'
)

# If 10 or less pass, otherwise fail.
if [ "$output" -le 10 ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
