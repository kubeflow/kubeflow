#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  10/31/22	 Check that airdrop is disabled
# Edward Byrd		  06/21/23	 Update to echo why it failed and removed individual user check
#

airdropoff=$(
/usr/bin/osascript -l JavaScript << EOS
$.NSUserDefaults.alloc.initWithSuiteName('com.apple.applicationaccess')\
.objectForKey('allowAirDrop').js
EOS
)


if [ "$airdropoff" == "false" ]; then
  output=True
else
  output=False
fi

	# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: A profile is installed that disables Airdrop"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that disables Airdrop"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
fi


