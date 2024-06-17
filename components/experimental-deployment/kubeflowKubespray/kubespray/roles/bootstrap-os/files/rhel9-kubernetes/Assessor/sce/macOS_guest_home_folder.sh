#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/16/20   Remove Guest home folder
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Update to output
# 

guesthome=$(
/bin/ls /Users/ | /usr/bin/grep Guest 
)

if [ $guesthome -n ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: The Guest home folder does not exist"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The Guest home folder exists"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

