#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         05/12/21   6.3. - Disable Open "Safe" Files Automatically in Safari
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd 		  11/08/22   Updated for the new naming and profile check
# Edward Byrd		  07/12/23	 Update to output and individual user audit
#

safarisafeprofile=$(
profiles -P -o stdout | /usr/bin/grep -c "AutoOpenSafeDownloads = 0;")

if [ "$safarisafeprofile" == "1" ]; then
  output=True
else
  output=False
fi

# If test passed, then no output would be generated. If so, we pass
if [ "$output" = True ] ; then
	echo "PASSED: Profile installed to disable open 'safe' files in Safari"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that disables opening safe files in Safari"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi




