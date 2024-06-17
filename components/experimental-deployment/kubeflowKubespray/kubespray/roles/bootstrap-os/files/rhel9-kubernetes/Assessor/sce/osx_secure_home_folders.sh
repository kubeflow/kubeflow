#!/usr/bin/env sh
  
#
# CIS-CAT Script Check Engine
#
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/23/20   Secure Home Folders
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
#

securehome=$(
ls -l /Users/ | grep -v '.localized' | grep -v 'Shared' | grep -v 'drwx------' | grep -v 'drwx--x--x' | grep -v 'total' | grep -c 'dr'
)

if [ $securehome == 0 ] ; then
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