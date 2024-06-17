#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/24/19   Check nftables ruleset
# E. Pinnell   04/20/21   Updated to use pear grep

nft list ruleset | grep -Pq "$XCCDF_VALUE_REGEX" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Missing nftables rule."
    exit "${XCCDF_RESULT_FAIL:-102}"
fi