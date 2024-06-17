#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd         09/17/20   Security Audit has flags configured
# Edward Byrd		  01/20/21	 Updated with updated flags
# Edward Byrd		  10/25/21	 Updated with updated flags
# Edward Byrd		  07/12/22	 Updated with updated flags

flagfm=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "fm"
)

flagad=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "ad"
)

flagex=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "ex"
)

flagaa=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "aa"
)

flagfr=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "fr"
)

flaglo=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "lo"
)

flagfw=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "fw"
)


flagall=$(
grep -e "^flags:" /etc/security/audit_control | grep -c "all"
)

if ( [ $flagfm == 1 ] && [ $flagad == 1 ] &&  [ $flagaa == 1 ]  &&  [ $flaglo == 1 ] && [ $flagex == 1 ] && [ $flagfr == 1 ] && [ $flagfw == 1 ] ) || ( [ $flagfm == 1 ] && [ $flagad == 1 ] &&  [ $flagaa == 1 ]  &&  [ $flaglo == 1 ] && [ $flagall == 1 ] ); then
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



