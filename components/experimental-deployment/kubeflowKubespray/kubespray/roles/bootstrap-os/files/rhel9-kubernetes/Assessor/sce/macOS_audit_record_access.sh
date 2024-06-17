#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name                Date       Description
# -------------------------------------------------------------------
# Edward Byrd		  09/18/20   Check audit record access
# Edward Byrd		  03/05/21   Updated to include file check
# Edward Byrd 		  11/08/22   Updated for the new naming
# Edward Byrd		  06/27/23	 Updated the output
# 


controlowner=$(
ls -le /etc/security/audit_control | awk '{print $3}' | grep -v 'root'
)

controlgroup=$(
ls -le /etc/security/audit_control | awk '{print $4}' | grep -v 'wheel'
)

auditowner=$(
ls -le /var/audit/ | awk '{print $3}' | grep -v 'root'
)

auditgroup=$(
ls -le /var/audit/ | awk '{print $4}' | grep -v 'wheel'
)

auditfilesaccess=$(
ls -le /var/audit/ | grep -v "[-][-r][-][-][-r][-][-][-][-][-]" | grep -c ":"
)

controlaccess=$(
ls -l $(/usr/bin/grep '^dir' /etc/security/audit_control | /usr/bin/awk -F: '{print $2}') | /usr/bin/awk '!/-r--r-----|current|total/{print $1}' | /usr/bin/wc -l | /usr/bin/tr -d ' '
)

if [ $controlowner -n ] && [ $controlgroup -n ] && [ $auditowner -n ] && [ $auditgroup -n ] && [ $auditfilesaccess -eq 1 ] && [ $controlaccess -eq 0 ]; then
  output=True
else
  output=False
fi

# If result returns 0 pass, otherwise fail.
if [ "$output" == True ] ; then
	echo "PASSED: Controlled access to audit records is correctly set"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED: These files have the incorrect permissions or ACLs:"
	echo "\"$controlowner\""
	echo "\"$controlgroup\""	
	echo "\"$auditowner\""
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
