#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/18/22   Check running config and rules files for auditd syscall rules
# E. Pinnell   10/11/22   Modified to find '-S' separated syscall values

# Will not work for rules that include additional fields.  Future iterations may increase functionality.

scall="" # syscall field(s) variable
archvar="" # architecture variable
uidmin="" # uid_min variable
auidvar="" # auid!= variable
output="" output2="" foutput="" foutput2=""

archvar=$(grep -Po -- 'arch=b(32|64)' <<< "$XCCDF_VALUE_REGEX")
if arch | grep -vq "x86_64" && [ "$archvar" = "arch=b64" ]; then
	output="PASSED: 64 bit rule:\n$XCCDF_VALUE_REGEX\nnot applicable on a 32 bit system"
else
	scall="$(grep -Po -- '-S\h+\H+' <<< "$XCCDF_VALUE_REGEX" | sed "s/-S //g")"
	grep -Poq -- 'auid>=' <<< "$XCCDF_VALUE_REGEX" && uidmin="auid>=$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"
	grep -Poq -- 'auid!=' <<< "$XCCDF_VALUE_REGEX" && auidvar='(?:auid!=(?:unset|-1|4294967295)|(?:unset|-1|4294967295)!=auid)'
	# Let's construct the field regex
	if [ -n "$uidmin" ] && [ -n "$auidvar" ]; then
		fvar="(?!\2)(-F\h+$uidmin|-F\h+$auidvar)\h+(?!\1)(-F\h+$uidmin|-F\h+$auidvar)\h+"
	elif [ -n "$uidmin" ] && [ -z "$auidvar" ]; then
		fvar="-F\h+$uidmin\h+"
	elif [ -n "$auidvar" ] && [ -z "$uidmin" ]; then
		fvar="-F\h+$auidvar\h+"
	fi
	for scvar in $(sed "s/,/ /g" <<< "$scall"); do
		gvar="^\h*-a\h+(?:always,exit|exit,always)\h+-F\h+$archvar\h+-S\h+(?:[^#\n\r]+(,|\h+-S\h+))?$scvar(?:(?:,\H+)+|(?:\h+-S\h+\H+)+)?\h+$fvar(?:-k\h+\H+|-F\h*key=\H+)\h*(?:#.*)?$"
		# check auditd rules files
		if grep -Pq -- "$gvar" /etc/audit/rules.d/*.rules; then
			output="$output\naudit rule for syscall: \"$scvar\" exists in \"$(grep -Pl -- "$gvar" /etc/audit/rules.d/*.rules)\""
		else
			foutput="$foutput\naudit rule for syscall: \"$scvar\" doesn't exist in a rules file in \"/etc/audit/rules.d\""
		fi
		# Check auditd running config
		if auditctl -l | grep -Pq "$gvar"; then
			output2="$output2\naudit rule for syscall: \"$scvar\" exists in auditd running config"
		else
			foutput2="$foutput2\naudit rule for syscall: \"$scvar\" doesn't exist in auditd running config"
		fi
	done
fi
# If the regex matched, output would be generated.  If so, we pass
if [ -z "$foutput" ] && [ -z "$foutput2" ]; then
	echo "PASSED"
	[ -n "$output" ] && echo -e "$output"
	[ -n "$output2" ] && echo -e "$output2"
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	echo "FAILED"
	[ -n "$foutput" ] && echo -e "$foutput"
	[ -n "$foutput2" ] && echo -e "$foutput2"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi