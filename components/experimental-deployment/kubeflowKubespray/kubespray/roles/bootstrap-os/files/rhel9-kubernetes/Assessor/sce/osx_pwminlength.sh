#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require passwords of at least 15 characters
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd		  11/05/21	 Added Profile Check
#

pwminexist=$(
pwpolicy -getaccountpolicies | grep -c minimumLength
)

pwminlength=$(
pwpolicy -getaccountpolicies | grep -A1 minimumLength | tail -1 | cut -d'>' -f2 | cut -d '<' -f1 
)

pwprofileexist=$(
profiles -P -o stdout | /usr/bin/grep -c minLength
)

pwprofilelength=$(
profiles -P -o stdout | /usr/bin/grep -e "minLength = " | cut -d "=" -f 2 | cut -d ";" -f 1 | cut -d " " -f 2
)


if [ $pwminexist == 0 ] || [ $pwprofileexist == 0 ]; then
  output=False
elif [ $pwminlength -ge 15 ]; then
  output=True
elif [ $pwprofilelength -ge 15 ]; then
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
