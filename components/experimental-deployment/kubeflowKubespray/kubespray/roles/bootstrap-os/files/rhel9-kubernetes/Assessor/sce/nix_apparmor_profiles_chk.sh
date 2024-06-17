#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 03/19/21   Check AppArmor Profiles
# J. Brown   01/24/23   Updated awk commands
# E. Pinnell 07/11/23   Modified to run in bash, modernize, and improve assessment evidence output
#

l_output="" l_output2=""

if command -v apparmor_status >/dev/null; then
   # Collect AppArmor status information and set variables
   l_profiles_enforce="$(apparmor_status | awk '(/profiles are in enforce mode/) {print $1}')"
   l_profiles_complain="$(apparmor_status | awk '(/profiles are in complain mode/) {print $1}')"
   l_profiles_loaded="$(apparmor_status | awk '/ profiles are loaded/ {print $1}')"
   l_processes_profile_undefined="$(apparmor_status | awk '/processes are unconfined but have a profile defined/ {print $1}')"
   l_profiles_mode_total="$((l_profiles_enforce+l_profiles_complain))"

   if [ "$l_profiles_loaded" -gt 0 ]; then
      # Check unconfined processes
      if [ "$l_processes_profile_undefined" = 0 ]; then
         l_output="$l_output\n - \"$l_processes_profile_undefined\" processes are unconfined but have a profile defined"
      else
         l_output2="$l_output2\n - \"$l_processes_profile_undefined\" processes are unconfined but have a profile defined"
      fi
      # Check profiles
      if [ "$XCCDF_VALUE_REGEX" = complain ]; then # Level 1 (complain or enforce)
         if [ "$l_profiles_mode_total" = "$l_profiles_loaded" ]; then
            l_output="$l_output\n - \"$l_profiles_mode_total\" of \"$l_profiles_loaded\" profiles are in complain or enforcing mode"
         else
            l_output2="$l_output2\n - \"$l_profiles_mode_total\" of \"$l_profiles_loaded\" profiles are in complain or enforcing mode"
         fi
      elif [ "$XCCDF_VALUE_REGEX" = enforce ]; then # Level 2 (enforce required)
         if [ "$l_profiles_enforce" = "$l_profiles_loaded" ]; then
            l_output="$l_output\n - \"$l_profiles_enforce\" of \"$l_profiles_loaded\" profiles are in enforcing mode"
         else
            l_output2="$l_output2\n - \"$l_profiles_enforce\" of \"$l_profiles_loaded\" profiles are in enforcing mode"
         fi
      fi
   else
      l_output2="$l_output2\n - \"$l_profiles_loaded\" profiles are loaded"
   fi
else
   l_output2="$l_output2\n - Command \"apparmor_status\" doesn't exist.\n  - Confirm AppArmor is installed"
fi

# CIS-CAT output
# If l_output is unset, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  *** PASS ***\n- * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2\n"
   [ -n "$l_output" ] && echo -e " - * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi