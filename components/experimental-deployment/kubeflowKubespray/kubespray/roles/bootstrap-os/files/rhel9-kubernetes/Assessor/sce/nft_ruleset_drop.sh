#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/14/19   Check nftables default drop policy
# E. Pinnell   06/24/21   Modified to fix typo in regex statement

CHAIN="$XCCDF_VALUE_REGEX"

nft list ruleset | grep -Eq "^\s*type\s+filter\s+hook\s+$CHAIN\s+(priority\s+\S+;\s+)*policy\s+drop;" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "\"$XCCDF_VALUE_REGEX\" basechain does not have a default drop policy"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi