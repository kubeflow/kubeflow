#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  10/24/19   Ensure there is a rule in a /etc/audit/rules.d/*.rules file matching the regex
# E. Pinnell  11/04/19   Modified script to correct error in test
# E. Pinnell  11/27/19   Modified to work with POSIX shell
#

[ -n "$(echo "$XCCDF_VALUE_REGEX" | grep -E '^\s*-')" ] && XCCDF_VALUE_REGEX="^\s*$XCCDF_VALUE_REGEX"

if [ -n "$(echo "$XCCDF_VALUE_REGEX" | grep -E 'auid(>|>=|=>)')" ] ; then
	sysuid="$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"
	REGEXCHK="$(echo "$XCCDF_VALUE_REGEX" | sed -r "s/^(.*)(auid(>=|>)\S+)(\s+-[A-Z].*)$/\1auid\3$sysuid\4/")"
	output="$(grep -E -s "$REGEXCHK" /etc/audit/rules.d/*.rules | cut -d: -f2)"
	location="$(grep -E -s "$REGEXCHK" /etc/audit/rules.d/*.rules | cut -d: -f1)"
else
	output="$(grep -E -s "$XCCDF_VALUE_REGEX" /etc/audit/rules.d/*.rules | cut -d: -f2)"
	location="$(grep -E -s "$XCCDF_VALUE_REGEX" /etc/audit/rules.d/*.rules | cut -d: -f1)"
fi

# If the regex matched, output would be generated.  If so, we pass
if [ -n "$output" ] ; then
	echo "audit rule: $output exists in $location"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    if [ -n "$REGEXCHK" ] ; then
    	echo "No auditd rules were found matching the regular expression $REGEXCHK in any /etc/audit/rules.d/*.rules file"
    else
    	echo "No auditd rules were found matching the regular expression $XCCDF_VALUE_REGEX in any /etc/audit/rules.d/*.rules file"
    fi
    exit "${XCCDF_RESULT_FAIL:-102}"
fi