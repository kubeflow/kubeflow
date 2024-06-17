#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  06/29/23	 Ensure Screen Saver Corners Are Secure
#

screensavercorners=$(
/usr/bin/profiles -P -o stdout | /usr/bin/grep -Ec '"wvous-bl-corner" = 6|"wvous-br-corner" = 6|"wvous-tl-corner" = 6|"wvous-tr-corner" = 6'
)

profileexists=$(
/usr/bin/profiles -P -o stdout | /usr/bin/grep -c corner
)

if [ $screensavercorners -eq 0  ] && [ $profileexists -ne 0 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" = True ] ; then
	echo "PASSED: A profile is installed that does not allow disabling the screen saver through Hot Corners"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: A profile needs to be installed that disabled the ability to disable the screen saver through Hot Corners"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
