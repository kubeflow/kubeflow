#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd 		  11/08/22   Ensure full website addresses are shown in Safari
# Edward Byrd		  07/12/23	 Update to output and removed individual user audit
#

safarfulladdressprofile=$(
profiles -P -o stdout | /usr/bin/grep -c "ShowFullURLInSmartSearchField = 1;")

if [ "$safarfulladdressprofile" == "1" ]; then
  output=True
else
  output=False
fi

# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Profile installed to enabled full website addresses in Safari"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that enables full website addresses in Safari"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi




