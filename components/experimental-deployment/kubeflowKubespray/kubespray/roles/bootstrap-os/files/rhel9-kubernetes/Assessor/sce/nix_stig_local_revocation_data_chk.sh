#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  06/04/21   check STIG certificate validation
#

passing=""

awk "/pkcs11_module $(grep use_pkcs11_module /etc/pam_pkcs11/pam_pkcs11.conf | sed -r 's/^.*=\s*(\S+\b).*$/\1/') {/,/}/" /etc/pam_pkcs11/pam_pkcs11.conf | grep -Pq '^\h*cert_policy\h*=\h*([^#\n\r]+,)?(crl_auto|crl_offline)\b' && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = "true" ] ; then
	echo "PASSED"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi