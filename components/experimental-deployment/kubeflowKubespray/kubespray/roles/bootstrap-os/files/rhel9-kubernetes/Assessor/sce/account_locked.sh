#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/12/20   Verify system accounts are locked

[ -z "$(awk -F: '($1!="root" && $1!~/^\+/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"') {print $1}' /etc/passwd | xargs -I '{}' passwd -S '{}' | awk '($2!="L" && $2!="LK") {print $1}')" ] && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
	echo "system accounts are locked"
	exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
	echo "System account: $(awk -F: '($1!="root" && $1!~/^\+/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"') {print $1}' /etc/passwd | xargs -I '{}' passwd -S '{}' | awk '($2!="L" && $2!="LK") {print $1}') is not locked"
	exit "${XCCDF_RESULT_FAIL:-102}"
fi
