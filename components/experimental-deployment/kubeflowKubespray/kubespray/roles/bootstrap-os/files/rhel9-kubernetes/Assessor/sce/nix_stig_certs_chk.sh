#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/25/21   Verify only DoD PKI-established certificate authorities exist in /etc/ssl/certs

passing="" output=""

find /etc/ssl/certs -maxdepth 1 -type f | (while read -r f; do 
	if ! openssl x509 -sha256 -in "$f" -noout -fingerprint | cut -d= -f2 | tr -d ':' | grep -Evw '(9676F287356C89A12683D65234098CB77C4F1C18F23C0E541DE0E196725B7EBE|B107B33F453E5510F68E513110C6F6944BACC263DF0137F821C1B3C2F8F863D2|559A5189452B13F8233F0022363C06F26E3C517C1D4B77445035959DF3244F74|1F4EDE9DC2A241F6521BF518424ACD49EBE84420E69DAF5BAC57AF1F8EE294A9)'; then
		[ -z "$passing" ] && passing=true
	else
		passing="false"
	fi
done

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "PASS"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAIL. Non DoD PKI-established certificate(s) exist"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
)