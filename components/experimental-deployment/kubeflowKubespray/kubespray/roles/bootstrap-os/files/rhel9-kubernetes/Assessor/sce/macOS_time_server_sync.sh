#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  11/02/22	 Check the time server is synchronized
# Edward Byrd		  06/26/23	 Update to echo why it failed
#

timesync=$(
/usr/bin/sntp $(/usr/sbin/systemsetup -getnetworktimeserver | /usr/bin/awk '{print $4}') | /usr/bin/awk -F'.' '/\+\/\-/{if (substr($1,2) >= 270) {print "No"} else {print "Yes"}}'
)


if [ "$timesync" == "Yes" ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: The time server sync is within appropriate limits"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The time server is not in sync withing 270 seconds"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi