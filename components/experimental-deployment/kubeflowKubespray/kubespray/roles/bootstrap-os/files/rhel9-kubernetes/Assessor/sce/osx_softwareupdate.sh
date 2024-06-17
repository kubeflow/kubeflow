#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure Software is up to date
# Edward Byrd		  09/21/20	 Updated script for better results

softwareupdate=$(
softwareupdate -l | grep 'new or updated'
)

if [ "$softwareupdate" == "Software Update found the following new or updated software:" ] ; then
  output=False
else
  output=True
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


