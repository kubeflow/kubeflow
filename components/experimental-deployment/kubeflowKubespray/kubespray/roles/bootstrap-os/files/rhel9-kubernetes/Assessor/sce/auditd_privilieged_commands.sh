#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# R. DARUSZKA  12/19/17   Ensure there is an active auditd config for all privileged commands
# R. DARUSZKA  03/28/17   Fix issue with command not working in all shells
# B. Munyan    02/04/19   Unix line endings
# E. Pinnell   08/28/19   Modified script to detect uid of the system (Some are 500 newer systems are 1000)
# E. Pinnell   02/10/20   Modified to allow for any key value 
# E. Pinnell   03/12/20   Modified to make "-S all " optional in output in awk print

passing=true

find / -xdev \( -perm -4000 -o -perm -2000 \) -type f | awk '{print "-a always,exit (-S all )?-F path=" $1 " -F perm=x -F auid>='"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"' -F auid!=-1 -F key=" }' | ( while read -r line
do
  auditctl -l | grep -E -- "^$line\S+ *$" || passing=false
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
