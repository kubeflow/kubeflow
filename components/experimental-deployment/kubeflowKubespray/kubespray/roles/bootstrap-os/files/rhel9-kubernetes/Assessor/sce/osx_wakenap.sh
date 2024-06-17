#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         08/31/20   Ensure system is set to to wake on LAN or use Power Nap
# 

wakelan=$(
pmset -g | grep -e womp | awk '{print $2}'
)

pnap=$(
pmset -g | grep -e powernap | awk '{print $2}'
)

if [ $wakelan -e 0 ] && [ $pnap -e 0 ] ; then
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

