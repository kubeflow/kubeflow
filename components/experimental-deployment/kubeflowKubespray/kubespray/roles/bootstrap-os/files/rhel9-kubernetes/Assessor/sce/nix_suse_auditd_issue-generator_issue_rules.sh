#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# --------------------------------------------------------------------------------------------
# J. Brown   08/19/21     Check auditd rules for issue file when issue-generator may be in use

issuefile=""

if [ "$(systemctl is-enabled issue-generator.service)" = 'enabled' ]; then
	issuefile="/run/issue"
else
	issuefile="/etc/issue"
fi

exprule="^\h*-w\h+$issuefile\h+-p\h+wa\h+-k\h+\H+"

collrule=$(grep "$issuefile" /etc/audit/rules.d/*.rules | awk -F: '{print $2}')
collauditctl=$(auditctl -l | grep "$issuefile")

if echo "$collrule" | grep -Pq -- "$exprule"; then
	echo "expected entry matched a rule file"
	if echo "$collauditctl" | grep -Pq -- "$exprule"; then
		echo "expected entry matched the collected auditctl output"
		exit "${XCCDF_RESULT_PASS:-101}"
	else
		echo "expected entry DID NOT match the collected auditctl output"
		echo "expected value:  $exprule"
		echo "auditctl output value: $collauditctl"
		exit "${XCCDF_RESULT_FAIL:-102}"
	fi
else
	echo "expected entry DID NOT match any rule file"
	echo "expected value: $exprule"
	echo "rule file value: $collrule"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi