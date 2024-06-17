#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         07/10/20   Ensure software updates are not deferred
#

deferrmentexist=$(
/usr/bin/profiles -P -o stdout | /usr/bin/grep -c 'enforcedSoftwareUpdateDelay ='
)

deferrment=$(
/usr/bin/profiles -P -o stdout | /usr/bin/grep 'enforcedSoftwareUpdateDelay =' | cut -d'=' -f2 | cut -d';' -f1
)


if [ $deferrmentexist == 0 ] ; then
  output=True
elif [ $deferrment -le 30 ] ; then
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
