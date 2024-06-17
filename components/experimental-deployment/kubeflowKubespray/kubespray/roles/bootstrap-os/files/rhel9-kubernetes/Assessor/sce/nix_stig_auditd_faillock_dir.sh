#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# ----------------------------------------------------------------
# J. Brown     10/12/21   Check permissions on audit log directory

# XCCDF_VALUE_REGEX should support direct strings and regex

passing=false
rhversion=""

# Get RH version
if rpm -qa redhat-release | grep -P "redhat-release-8\.[0-1]" ; then
	rhversion="low"
else
	rhversion="high"
fi

#Collect faillock dir value
if [ $rhversion = "low" ]; then
	dirval=$(grep -i pam_faillock.so /etc/pam.d/system-auth | grep -Po "dir=([\H]+)\h" | awk -F"=" '{print $2}' | awk '{$1=$1};1')
else
	dirval=$(grep -Po "dir\h*=\h*([\H]+)\h*" /etc/security/faillock.conf | awk -F"=" '{print $2}' | awk '{$1=$1};1')
fi

rule="-w $dirval -p wa -k"

# Check auditd rules
grep -P -- "$rule" /etc/audit/audit.rules && passing=true

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed! \"$dirval\" found in auditd ruleset."
	exit "${XCCDF_RESULT_PASS:-101}"
else
	echo "Failed! \"$dirval\" NOT found in auditd ruleset."
	exit "${XCCDF_RESULT_FAIL:-102}"
fi