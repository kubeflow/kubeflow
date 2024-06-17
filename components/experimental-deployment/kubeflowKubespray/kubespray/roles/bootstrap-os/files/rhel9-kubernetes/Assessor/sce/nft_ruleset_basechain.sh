#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/14/19   Check nftables input basechain

nft list ruleset | awk '/hook input/,/}/' | grep -Eq "$XCCDF_VALUE_REGEX" && passing=true

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "\"$XCCDF_VALUE_REGEX\" not found in nftable input basechain"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi