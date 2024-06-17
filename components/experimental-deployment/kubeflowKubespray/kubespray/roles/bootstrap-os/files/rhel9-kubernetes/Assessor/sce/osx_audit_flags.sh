#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/17/20   Security Audit has flags configured
# 

flaglo=$(
grep -e "^flags:" /etc/security/audit_control | grep -v "lo"
)

flagaa=$(
grep -e "^flags:" /etc/security/audit_control | grep -v "aa"
)

flagad=$(
grep -e "^flags:" /etc/security/audit_control | grep -v "ad"
)

flagfd=$(
grep -e "^flags:" /etc/security/audit_control | grep -v "fd"
)

flagfm=$(
grep -e "^flags:" /etc/security/audit_control | grep -v "fm"
)

flagall=$(
grep -e "^flags:" /etc/security/audit_control | grep -v "all"
)

if [ $flaglo -n ] && [ $flagaa -n ] && [ $flagad -n ] && [ $flagfd -n ] && [ $flagfm -n ] && [ $flagall -n ]; then
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



if [ $wakelan -e 0 ] && [ $pnap -e 0 ]