#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Sara Lynn Archacki  04/02/19   Ensure system is set to hibernate
# 

standbydelaylow=$(
pmset -g | egrep standbydelaylow | awk '{print $2}'
)

standbydelayhigh=$(
pmset -g | egrep standbydelayhigh | awk '{print $2}'
)



if [ $standbydelaylow -le 900 ] && [ $standbydelayhigh -le 900 ] ; then
  output=True
else
  output=False
fi

# If result returns 900 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi




