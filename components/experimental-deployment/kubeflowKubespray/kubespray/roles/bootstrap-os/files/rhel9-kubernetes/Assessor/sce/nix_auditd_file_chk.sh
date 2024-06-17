#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  02/08/21   Ensure there is a rule in a /etc/audit/rules.d/*.rules file matching the regex
# E. Pinnell  07/17/21   Modified to correct for unexpected behavior with remote assessment
#

if echo "$XCCDF_VALUE_REGEX" | grep -Pq -- 'auid(>|>=|=>)' ; then
	sysuid="$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"
#	REGEXCHK="$(echo "$XCCDF_VALUE_REGEX" | sed -r "s/auid(>=|>|=>)([0-9]+)/auid>=$sysuid/g")"
	REGEXCHK="$(printf '%s' "$XCCDF_VALUE_REGEX" | sed -r "s/auid(>=|>|=>)([0-9]+)/auid>=$sysuid/g")"
	output="$(grep -P -s -- "$REGEXCHK" /etc/audit/rules.d/*.rules | cut -d: -f2)"
	location="$(grep -P -l -s -- "$REGEXCHK" /etc/audit/rules.d/*.rules)"
else
	output="$(grep -P -s -- "$XCCDF_VALUE_REGEX" /etc/audit/rules.d/*.rules | cut -d: -f2)"
	location="$(grep -P -l -s -- "$XCCDF_VALUE_REGEX" /etc/audit/rules.d/*.rules)"
fi

# If the regex matched, output would be generated.  If so, we pass
if [ -n "$output" ] ; then
	echo "PASSED"
	echo "audit rule: \"$output\""
	echo "exists in: \"$location\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    if [ -n "$REGEXCHK" ] ; then
    	echo "FAILED"
    	echo "No auditd rules were found in any /etc/audit/rules.d/*.rules file matching the regular expression:"
    	echo "$REGEXCHK"
    else
    	echo "FAILED"
    	echo "No auditd rules were found in any /etc/audit/rules.d/*.rules file matching the regular expression:"
    	echo "$XCCDF_VALUE_REGEX "
    fi
    exit "${XCCDF_RESULT_FAIL:-102}"
fi