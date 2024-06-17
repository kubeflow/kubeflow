#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/16/20   Folders in /System have appropriate permissions
# 

systemwrite=$(
find /System/Volumes/Data/System -type d -perm -2 -ls
)

if [ $systemwrite -n ] ; then
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
