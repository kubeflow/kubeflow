#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd 		  11/08/22   Enable Safari to prevent cross-site tracking
# Edward Byrd		  07/12/23	 Update to output and removed individual user audit
#

safaricrosssiteprofile1=$(
profiles -P -o stdout | /usr/bin/grep -c "BlockStoragePolicy = 2;")

safaricrosssiteprofile2=$(
profiles -P -o stdout | /usr/bin/grep -c '"WebKitPreferences.storageBlockingPolicy" = 1';)

safaricrosssiteprofile3=$(
profiles -P -o stdout | /usr/bin/grep -c "WebKitStorageBlockingPolicy = 1;")

if [ "$safaricrosssiteprofile1" == "1" ] && [ "$safaricrosssiteprofile2" == "1" ] && [ "$safaricrosssiteprofile3" == "1" ]; then
  output=True
else
  output=False
fi

# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Profile installed to cros-site tracking in Safari"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that disables cross-site tracking in Safari"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

