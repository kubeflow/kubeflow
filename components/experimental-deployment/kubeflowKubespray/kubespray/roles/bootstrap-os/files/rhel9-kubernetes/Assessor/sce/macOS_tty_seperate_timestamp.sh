#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         10/28/20   User a separate timestamp for each user/tty combo
# Edward Byrd         06/16/22   Updated to use new audit
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Update to output and audit
# 

ttyticket=$(
/usr/bin/sudo -V | /usr/bin/grep -c "Type of authentication timestamp record: tty"
)

ttyvalue=$(
/usr/bin/sudo -V | /usr/bin/grep "Type of authentication timestamp record" | /usr/bin/awk '{print$6}'
)

if [ $ttyticket == 1 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: A seperate timestamp is enabled for rach user/tty combo"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The type of authentication timestanp record is \"$ttyvalue\" which is not tty, and that needs to be modified"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
