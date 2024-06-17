#!/usr/bin/env sh

# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/16/20   Check that password complexity is configured

passing=""
minclass_tst=""
dcredit_tst=""
ucredit_tst=""
ocredit_tst=""
lcredit_tst=""

if grep -Eq '^\s*minclass\s*=\s*([1-9][0-9]+|[4-9])\b' /etc/security/pwquality.conf ; then
	minclass_tst=pass
	passing=true
else
	grep -Eq '^\s*dcredit\s*=\s*-([1-9]|[1-9][0-9]+)\b' /etc/security/pwquality.conf && dcredit_tst=pass
	grep -Eq '^\s*ucredit\s*=\s*-([1-9]|[1-9][0-9]+)\b' /etc/security/pwquality.conf && ucredit_tst=pass
	grep -Eq '^\s*ocredit\s*=\s*-([1-9]|[1-9][0-9]+)\b' /etc/security/pwquality.conf && ocredit_tst=pass
	grep -Eq '^\s*lcredit\s*=\s*-([1-9]|[1-9][0-9]+)\b' /etc/security/pwquality.conf && lcredit_tst=pass
	if [ "$dcredit_tst" = pass ] && [ "$ucredit_tst" = pass ] && [ "$ocredit_tst" = pass ] && [ "$lcredit_tst" = pass ]; then
		passing=true
	fi
fi



# If the tests all pass, we pass
if [ "$passing" = true ] ; then
	echo "Password complexity is set in \"/etc/sercrity/pwquality.conf\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Password complexity needs to be set in \"/etc/sercrity/pwquality.conf\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi