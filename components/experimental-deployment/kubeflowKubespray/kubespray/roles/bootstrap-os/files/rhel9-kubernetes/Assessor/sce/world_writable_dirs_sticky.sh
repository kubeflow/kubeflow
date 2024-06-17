#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
# 
# Name       Date       Description
# -------------------------------------------------------------------
# B. Munyan  07/13/16   Sticky bit must be on all world-writable dirs
# B. Munyan  02/04/19   Unix line endings
# E. Pinnell 05/01/20   Modified to send std error to /dev/null
# 

PATH=/bin:/usr/bin

output=$(
df --local -P 2> /dev/null | awk {'if (NR!=1) print $6'} | xargs -I '{}' find '{}' -xdev -type d \( -perm -0002 -a ! -perm -1000 \) -printf "%p is %m should be 1777\n" 2>/dev/null
)

# we captured output of the subshell, let's interpret it
if [ "$output" != "" ] ; then
    # print the reason why we are failing
    echo "$output"
    exit "${XCCDF_RESULT_FAIL:-102}"
else
    exit "${XCCDF_RESULT_PASS:-101}"
fi
