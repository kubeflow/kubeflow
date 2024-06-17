#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# R. DARUSZKA  12/19/17   Ensure there is an active auditd config for all privileged commands
# R. DARUSZKA  03/28/17   Fix issue with command not working in all shells
# B. Munyan    02/04/19   Unix line endings
#

passing=true

find / -xdev \( -perm -4000 -o -perm -2000 \) -type f | awk '{print "-a always,exit -S all -F path=" $1 " -F perm=x -F auid>=1000 -F auid!=-1 -F key=privileged" }' | ( while read line
do
  auditctl -l | egrep "^$line$" || passing=false
done

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "Missing auditd rules."
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
)
