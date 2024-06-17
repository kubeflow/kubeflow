#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/02/20   Ensure system is set to require 5 or lower failed logins
# Edward Byrd		  11/05/21	 Fixed unexpected operator error
# Edward Byrd		  06/22/22	 Updated to check for profile as well
# 


pwfailexist=$(
pwpolicy -getaccountpolicies | grep -c 'policyAttributeMaximumFailedAuthentications' 
)

pwmaxfailed=$(
pwpolicy -getaccountpolicies | grep -A 1 'policyAttributeMaximumFailedAuthentications' | tail -1 | cut -d'>' -f2 | cut -d '<' -f1
)

pwprofileexist=$(
profiles -P -o stdout | /usr/bin/grep -c maxFailedAttempts
)

pwprofilemax=$(
profiles -P -o stdout | /usr/bin/grep -e "maxFailedAttempts = " | cut -d "=" -f 2 | cut -d ";" -f 1 | cut -d " " -f 2
)


if [ $pwfailexist == 0 ] || [ $pwprofileexist == 0 ]; then
  output=False
elif [ $pwmaxfailed -le 5 ] || [ $pwprofilemax -le 5 ] ; then
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

