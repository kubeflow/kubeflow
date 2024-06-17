#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/01/20   Disable Print Sharing
# Edward Byrd         01/07/21   Updated with new check
# Edward Byrd		  11/02/22	 Updated name of the script to conform to other sce
# Edward Byrd		  06/19/23	 Update to echo why it failed
#

printshare=$(
cupsctl | grep _share_printers | cut -d'=' -f2
)

if [ $printshare -eq 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: Printer sharing is disabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The printer sharing (CUPS) daemon needs to be disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi