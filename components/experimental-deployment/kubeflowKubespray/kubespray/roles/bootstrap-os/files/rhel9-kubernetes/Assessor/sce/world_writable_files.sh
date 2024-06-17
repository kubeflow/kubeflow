#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# B. Munyan  7/13/16    Ensure no world-writable files exist
# B. Munyan  2/07/17    Eliminate /sys from this check as well
# B. Munyan    02/04/19   Unix line endings
# 

output=$(
df --local -P | awk {'if (NR!=1) print $6'} | xargs -I '{}' find '{}' -xdev -type f -perm -0002 -printf "World-Writable file %p\n" 2>/dev/null
)

# we captured output of the subshell, let's interpret it
if [ "$output" != "" ] ; then
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
else
    exit "${XCCDF_RESULT_PASS:-101}"
fi
