#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   10/25/22   Check openSSH private key file(s)

{
   l_output="" l_output2=""
   l_skgn="ssh_keys" # Group designated to own openSSH keys
   l_skgid="$(awk -F: '($1 == "'"$l_skgn"'"){print $3}' /etc/group)"
   [ -n "$l_skgid" ] && l_cga="$l_skgn" || l_cga="root"
   awk '{print}' <<< "$(find -L /etc/ssh -xdev -type f -exec stat -Lc "%n %#a %U %G %g" {} +)" | (while read -r  l_file l_mode l_owner l_group l_gid; do
      if file "$l_file" | grep -Pq ':\h+OpenSSH\h+private\h+key\b'; then
         [ "$l_gid" = "$l_skgid" ] && l_pmask="0137" || l_pmask="0177"
         l_maxperm="$( printf '%o' $(( 0777 & ~$l_pmask )) )"
         if [ $(( $l_mode & $l_pmask )) -gt 0 ]; then
            l_output2="$l_output2\n - File: \"$l_file\" is mode \"$l_mode\" should be mode: \"$l_maxperm\" or more restrictive"
         else 
            l_output="$l_output\n - File: \"$l_file\" is mode \"$l_mode\" should be mode: \"$l_maxperm\" or more restrictive"
         fi
         if [ "$l_owner" != "root" ]; then
            l_output2="$l_output2\n - File: \"$l_file\" is owned by: \"$l_owner\" should be owned by \"root\""
         else
            l_output="$l_output\n - File: \"$l_file\" is owned by: \"$l_owner\" should be owned by \"root\""
         fi
         if [ "$l_group" != "root" ] && [ "$l_gid" != "$l_skgid" ]; then
            l_output2="$l_output2\n - File: \"$l_file\" is owned by group \"$l_group\" should belong to group \"$l_cga\""
         else
            l_output="$l_output\n - File: \"$l_file\" is owned by group \"$l_group\" should belong to group \"$l_cga\""
         fi
      fi
   done
   if [ -z "$l_output" ] && [ -z "$l_output2" ]; then
      l_output=" - No openSSH private key files found"
   fi
   # Print audit results
   if [ -z "$l_output2" ]; then
      echo -e "\n- Audit Result:\n  *** PASS ***\n$l_output"
      exit "${XCCDF_RESULT_PASS:-101}"
   else
      echo -e "\n- Audit Result:\n  *** FAIL ***\n$l_output2\n\n  - Correctly set:\n$l_output"
      exit "${XCCDF_RESULT_FAIL:-102}"
   fi
   )
}