#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure system is set to hibernate
# Edward Byrd		  09/18/20   Forked from osx_standbydelay.sh to check 10.13 and earlier versions of macOS

passing=""

standbydelay=$(
pmset -g | awk '/standbydelay/ {print $2}'
)

hardwaretype=$(
system_profiler SPHardwareDataType | awk '/MacBook/ {print $3}' | head -1
)

if [ -z $hardwaretype ] ; then
	output="Not a Laptop" && passing=true && echo $hardwaretype
elif [ $standbydelay -le 900 ] ; then
	passing=true
fi

# If result contains string pass, otherwise fail.
if [ "$passing" = true ] ; then
	echo "Passed: \"$output\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: \"$output\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
