#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/16/20   Applications have appropriate permissions
# Edward Byrd 		  11/08/22   Updated for the new naming and new audit
# Edward Byrd		  07/12/23	 Updated the output and audit
# 

apppermission=$(
/usr/bin/find /Applications -iname "*\.app" -type d -perm -2 -ls | /usr/bin/grep -v Xcode.app | /usr/bin/wc -l | /usr/bin/xargs
)

failedapplications=$(
/usr/bin/find /Applications -iname "*\.app" -type d -perm -2 -ls | /usr/bin/awk '{print$11}'
)

if [ $apppermission == 0 ] ; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: All applicable applications have appropriate permissions"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: The following applications need their permissions verified:"
    echo "$failedapplications"
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi

