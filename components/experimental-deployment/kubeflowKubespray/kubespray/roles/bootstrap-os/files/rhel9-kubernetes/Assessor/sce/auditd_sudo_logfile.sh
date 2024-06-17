#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell  12/27/19   check auditd running config and /etc/audit/rules.d/*.rules for sudo logfile audit
# E. Pinnell  07/14/21   Modified to allow for any key name
# E. Pinnell  12/08/21   Modified to address bug in grep output
#

passing="" output="" output2="" REGEXCK="" LOGFILE=""

# Set the LOGFILE variable
if grep -Piq -- '^\h*defaults\h+([^#\n\r]+\h+)?logfile\h*=\h*\H+' /etc/sudoers; then
	LOGFILE="$(grep -- logfile /etc/sudoers | sed -e 's/.*logfile\s*=\s*//;s/,? .*//' | tr -d \")"
else
	# Last file wins...
	for file in $(grep -Pil -- '^\h*defaults\h+([^#\n\r]+\h+)?logfile\h*=\h*\H+' /etc/sudoers.d/* | sort -d); do
		LOGFILE="$(grep -- logfile "$file" | sed -e 's/.*logfile\s*=\s*//;s/,? .*//' | tr -d \")"
	done
fi

if [ -n "$LOGFILE" ] ; then
	REGEXCK="^\h*-w\h+$(echo "$LOGFILE" | sed "s+/+\\\/+g;s+\.+\\\.+g")\h+-p wa\h+-k\h+\H+\h*(#.*)?$"
	RULE="-w $LOGFILE -p wa -k {key_name}"
	output=$(auditctl -l | grep -P -- "$REGEXCK")
	output2=$(grep -P -- "$REGEXCK" /etc/audit/rules.d/*)

	[ -n "$output" ] && [ -n "$output2" ] && passing="true"
fi

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = "true" ] ; then
	echo "Audit rule: \"$output\" exists in the running config"
	echo "Audit rule: \"$(echo "$output2" | cut -d: -f2)\" exists in audit rules file: \"$(echo "$output2" | cut -d: -f1)\""
	exit "${XCCDF_RESULT_PASS:-101}"
else
	# print the reason why we are failing
	[ -z "$LOGFILE" ] && echo "logfile not set in a file in the /etc/sudoers/ directory"
	[ -z "$output" ] && echo "Audit rule $RULE not in the running auditd config"
	[ -z "$output2" ] && echo "Audit rule $RULE not in the a rule file in the /etc/audit/rules.d/ directory"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
