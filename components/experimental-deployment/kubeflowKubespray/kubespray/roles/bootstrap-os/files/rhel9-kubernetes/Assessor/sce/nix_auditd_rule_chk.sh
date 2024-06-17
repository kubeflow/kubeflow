#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/19/22   Check auditd running config and rules files for non-syscall auditd rules

output="" output2="" foutput="" foutput2="" location="" REGEXCHK="" archvar=""

archvar=$(grep -Po -- 'arch=b(32|64)' <<< "$XCCDF_VALUE_REGEX")
if arch | grep -vq "x86_64" && [ "$archvar" = "arch=b64" ]; then
	output="64 bit rule:\n$XCCDF_VALUE_REGEX\nnot applicable on a 32 bit system"
else
	REGEXCHK="$(sed -r "s/auid(>=|>|=>)([0-9]+)/auid>=$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)/g" <<< "$XCCDF_VALUE_REGEX")"
	REGEXCHK="$(sed -r 's/\\[sh]\+auid!=(4294967295|-1|\(4294967295\|-1\)|\(-1\|4294967295\))\\[sh]\+/\\h+(?:auid!=(?:unset|-1|4294967295)|(?:unset|-1|4294967295)!=auid)\\h+/g' <<< "$REGEXCHK")"
	REGEXCHK="$(sed -r 's/( |\\[sh]\+)(-k\\s\+|(-F( |\\s\+|\\h\+)key=)).*$/\\h+(?:-k\\h+\\H+\\b|-F\\h*key=\\H+\\b)\\h*(?:#[^\\n\\r]+)?$/g' <<< "$REGEXCHK")"
	# check auditd rules files
	if grep -Psq -- "$REGEXCHK" /etc/audit/rules.d/*.rules; then
		output="$(grep -Ps -- "$REGEXCHK" /etc/audit/rules.d/*.rules | cut -d: -f2)"
		location="$(grep -Pls -- "$REGEXCHK" /etc/audit/rules.d/*.rules)"
	else
		foutput="No auditd rules were found in any /etc/audit/rules.d/*.rules file matching the regular expression:\n\"$REGEXCHK\"\n"
	fi
	# Check auditd running config
	if auditctl -l | grep -Pq -- "$REGEXCHK"; then
		output2="$(auditctl -l | grep -P -- "$REGEXCHK")"
	else
		foutput2="No auditd rules were found in the running config matching the regular expression:\n\"$REGEXCHK\"\n"
	fi
fi
# If the regex matched, failed output wouldn't be generated.  If so, we pass
if [ -z "$foutput" ] && [ -z "$foutput2" ]; then
	echo "PASSED"
	[ -n "$output" ] && echo -e "audit rule: \"$output\"\nexists in: \"$location\""
	[ -n "$output2" ] && echo -e "\naudit rule: \"$output2\"\nexists in the running auditd config"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ -n "$foutput" ] && echo -e "$foutput"
	[ -n "$foutput2" ] && echo -e "$foutput2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi