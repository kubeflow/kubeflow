#!/usr/bin/env sh
  
#
# CIS-CAT Script Check Engine
#
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/23/20   Secure Home Folders
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  07/12/23	 Updated the output and audit
#

securehome=$(
/usr/bin/find /System/Volumes/Data/Users -mindepth 1 -maxdepth 1 -type d -not -perm 700 | /usr/bin/grep -v "Shared" | /usr/bin/grep -v "Guest"
)

if [ $securehome -n ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Home folders are secure"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following home folders are not secure:"
    echo "$securehome"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

