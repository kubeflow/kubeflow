#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# --------------------------------------------------------------------------
# J. Brown   10/14/21     Verify the count of configured nameservers

# The count of nameservers required is set via an XCCDF_VALUE_REGEX 

passing=false

# Get unique configured nameservers
servers=$(grep -P "^\h*nameserver\h+.+\h*(#.*)?$" /etc/resolv.conf | uniq | awk -F" " '{print $2}')

# Get count of unique nameservers
count=$(grep -P "^\h*nameserver\h+.+\h*(#.*)?$" /etc/resolv.conf | uniq | grep -Pc "^\h*nameserver\h+")

if [ "$count" -ge "$XCCDF_VALUE_REGEX" ]; then
	passing=true
fi

# If passing is true, we pass
if [ "$passing" = true ] ; then
	echo "Passed: Sufficient nameservers have been configured"
	echo "Number of unique nameservers configured: $count"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Failed: Insufficient nameservers have been configured"
	echo "Unique nameservers configured:"
	echo "$servers"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
