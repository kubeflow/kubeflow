#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/23/19   Check warning Banner

if [[ -s $XCCDF_VALUE_PATH ]] ; then
[[ -z $(grep -E "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" $XCCDF_VALUE_PATH) ]] && passing=true || passing=false
else
	passing=true
fi

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Warning Banner contains: $(grep -E "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" $XCCDF_VALUE_PATH)"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi