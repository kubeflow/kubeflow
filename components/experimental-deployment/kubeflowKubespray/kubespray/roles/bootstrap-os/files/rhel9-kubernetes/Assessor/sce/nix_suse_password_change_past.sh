#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# J. Brown     02/17/22   Modified generic script to work on SUSE 11

passing="" output=""

for usr in $(awk -F: '/^[^:]+:[^!*]/{print $1}' /etc/shadow); do
   lcpd=$(date -d "$(chage --list $usr | grep -Pi '^Last (password)?change' | cut -d: -f2 | grep -v 'never$')" +%s)
   if [ "$lcpd" -gt "$(date "+%s")" ]; then
      passing=""
      if [ -z "$output" ]; then
         output="\nFAILED:\nUser: \"$usr\" last password change was \"$(chage --list $usr | grep -Pi '^Last (password)?change' | cut -d: -f2)\""
      else
         output="$output\nUser: \"$usr\" last password change was \"$(chage --list $usr | grep -Pi '^Last (password)?change' | cut -d: -f2)\""
      fi
   else
      [ -z "$output" ] && passing="true"
   fi
done

# If the regex matched, output would be generated.  If so, we pass
if [ "$passing" = true ] ; then
   echo "PASSED: All users last password change was in the past"
   exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
   echo -e "$output"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi