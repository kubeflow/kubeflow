#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Eric  04/23/20  Retain install.log for 365 or more days
# 

passing=""
output=$(defaults -currentHost read com.apple.screensaver idleTime)
defaults -currentHost read com.apple.screensaver idleTime | grep -Eq '^\s*(1200|1[0-1][0-9][0-9]|[1-9][0-9]{2}|[1-9][0-9]|[1-9])\s*$' && passing=true

# If results returns pass, otherwise fail.
if [ "$passing" = "true" ] ; then
	echo "Passed, Screen Saver Idle Time is: \"$output\" seconds"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed, Screen Saver Idle Time is: \"$output\" seconds"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
