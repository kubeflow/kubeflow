#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         01/20/21   Verifying status of nfs server and /etc/exports
#

nfsstatus=$(
launchctl print-disabled system | grep -c '"com.apple.nfsd" => true'
)

exportsexist=$(
ls /etc/exports 2>/dev/null
)


if [ $nfsstatus -eq 1 ] && [ $exportsexist -n ]; then
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


