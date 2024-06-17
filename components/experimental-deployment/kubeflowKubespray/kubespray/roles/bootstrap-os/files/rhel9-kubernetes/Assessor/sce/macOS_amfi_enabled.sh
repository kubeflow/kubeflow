#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         10/20/21   Ensure Apple Mobile File Integrity Is Enabled
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Updated the output
# 

amfienabled=$(
/usr/sbin/nvram -p | /usr/bin/grep -c "amfi_get_out_of_my_way=1"
)

if [ $amfienabled == 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Apple Mobile File Integrity is enabled"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: Apple Mobile File Integrity is disabled"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
