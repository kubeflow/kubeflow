#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# B. Munyan  11/21/17   Ensure there is a config in auditd matching the regex
# E. Pinnell 11/05/19   Created variable to determine systems UID
# E. Pinnell 11/25/19   Updated to be supported by POSIX
# E. Pinnell 01/29/20   Updated to be supported negative look-ahead regex
# E. Pinnell 08/14/20   Updated to support regex starting with "-"
#

# echo "$XCCDF_VALUE_REGEX" | grep -Pq '^\s*-' && XCCDF_VALUE_REGEX="^$XCCDF_VALUE_REGEX"

if echo "$XCCDF_VALUE_REGEX" | grep -Pq -- 'auid(>|>=|=>)' ; then
        sysuid="$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"
        REGEXCHK="$(echo "$XCCDF_VALUE_REGEX" | sed -r "s/^(.*)(auid(>=|>)\S+)(\s+-[A-Z].*)$/\1auid\3$sysuid\4/")"
        output="$(auditctl -l | grep -P -s -- "$REGEXCHK")"
else
        output="$(auditctl -l | grep -P -s -- "$XCCDF_VALUE_REGEX")"
fi

# If the regex matched, output would be generated.  If so, we pass
if [ -n "$output" ] ; then
        echo "audit rule: \"$output\" exists in the running auditd config"
        exit "${XCCDF_RESULT_PASS:-101}"
else
        # print the reason why we are failing
        if [ -n "$REGEXCHK" ] ; then
                echo "No auditd rules were found matching the regular expression $REGEXCHK"
        else
                echo "No auditd rules were found matching the regular expression $XCCDF_VALUE_REGEX"
        fi
#       echo "XCCDF_VALUE_REGEX is: $XCCDF_VALUE_REGEX"
#       echo "REGEXCHK is: $REGEXCHK"
        exit "${XCCDF_RESULT_FAIL:-102}"
fi

