#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         10/20/21   Ensure Apple Mobile File Integrity Is Enabled
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
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

