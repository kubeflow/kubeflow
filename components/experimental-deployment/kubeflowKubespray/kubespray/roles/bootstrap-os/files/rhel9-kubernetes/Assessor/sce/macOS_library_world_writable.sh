#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/16/20   Folders in /System have appropriate permissions
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# 

librarywrite=$(
/usr/bin/find /System/Volumes/Data/Library -type d -perm -2 -ls | /usr/bin/grep -v Caches | /usr/bin/grep -v /Preferences/Audio/Data | /usr/bin/wc -l | /usr/bin/xargs
)

failedlibraryfiles=$(
/usr/bin/find /System/Volumes/Data/Library -type d -perm -2 -ls | /usr/bin/grep -v Caches | /usr/bin/grep -v /Preferences/Audio/Data | /usr/bin/awk '{print$11}'
)

if [ $librarywrite == 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: There are no world writable files in the Library folder"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "Failed: The following folders are world writable and need to be addressed:"
	echo "$failedlibraryfiles"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi


