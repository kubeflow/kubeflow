#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         10/28/20   User a separate timestamp for each user/tty combo
# Edward Byrd         06/16/22   Updated to use new audit
# 

ttyticket=$(
/usr/bin/sudo /usr/bin/sudo -V | /usr/bin/grep -c "Type of authentication timestamp record: tty"
)

if [ $ttyticket == 1 ]; then
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


