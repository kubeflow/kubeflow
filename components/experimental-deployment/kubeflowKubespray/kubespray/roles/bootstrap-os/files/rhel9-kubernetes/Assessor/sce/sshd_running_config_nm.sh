#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/15/19   Check sshd running configuration not match
# E. Pinnell   04/29/20   Updated test to make it more resilient.
# E. Pinnell   08/11/20   Modified to add user, host, and addr info
#

passing=""
output=""
hn=$(hostname)
ha=$(grep "$hn" /etc/hosts | awk '{print $1}')

if echo "$XCCDF_VALUE_REGEX" | grep -Eq '^\^\\s\*'; then
	output="$(sshd -T -C user=root -C host="$hn" -C addr="$ha" | grep -E "$(echo "$XCCDF_VALUE_REGEX" | cut -d'*' -f2 | cut -d'\' -f1)")"
else
	output="$(sshd -T -C user=root -C host="$hn" -C addr="$ha" | grep -E "$(echo "$XCCDF_VALUE_REGEX" | cut -d'\' -f1)")"
fi

[ -z "$(sshd -T -C user=root -C host="$hn" -C addr="$ha" | grep -E "$XCCDF_VALUE_REGEX")" ] && passing="true"

# If the regex matched, the test would fail, otherwise we pass.
if [ "$passing" = true ] ; then
	echo "PASSED! sshd parameter: \"$output\""
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "FAILED! check sshd parameter: \"$output\""
    exit "${XCCDF_RESULT_FAIL:-102}"
fi