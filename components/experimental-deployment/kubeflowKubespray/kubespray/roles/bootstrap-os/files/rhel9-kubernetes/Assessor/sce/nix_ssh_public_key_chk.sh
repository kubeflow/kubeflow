#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/25/22   Check openSSH public key file(s)

{
   l_output="" l_output2=""
   l_pmask="0133" 
   awk '{print}' <<< "$(find -L /etc/ssh -xdev -type f -exec stat -Lc "%n %#a %U %G" {} +)" | (while read -r  l_file l_mode l_owner l_group; do
      if file "$l_file" | grep -Pq ':\h+OpenSSH\h+(\H+\h+)?public\h+key\b'; then
         l_maxperm="$( printf '%o' $(( 0777 & ~$l_pmask )) )"
         if [ $(( $l_mode & $l_pmask )) -gt 0 ]; then
            l_output2="$l_output2\n - Public key file: \"$l_file\" is mode \"$l_mode\" should be mode: \"$l_maxperm\" or more restrictive"
         else 
            l_output="$l_output\n - Public key file: \"$l_file\" is mode \"$l_mode\" should be mode: \"$l_maxperm\" or more restrictive"
         fi
         if [ "$l_owner" != "root" ]; then
            l_output2="$l_output2\n - Public key file: \"$l_file\" is owned by: \"$l_owner\" should be owned by \"root\""
         else
            l_output="$l_output\n - Public key file: \"$l_file\" is owned by: \"$l_owner\" should be owned by \"root\""
         fi
         if [ "$l_group" != "root" ]; then
            l_output2="$l_output2\n - Public key file: \"$l_file\" belongs to group: \"$l_group\" should belong to group \"root\"\n"
         else
            l_output="$l_output\n - Public key file: \"$l_file\" belongs to group: \"$l_group\" should belong to group \"root\"\n"
         fi
      fi
   done
   if [ -z "$l_output2" ]; then
      echo -e "\n- Audit Result:\n  *** PASS ***\n$l_output"
      exit "${XCCDF_RESULT_PASS:-101}"
   else
      echo -e "\n- Audit Result:\n  *** FAIL ***\n$l_output2\n\n  - Correctly set:\n$l_output"
      exit "${XCCDF_RESULT_FAIL:-102}"
   fi
   )
}