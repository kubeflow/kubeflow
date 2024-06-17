#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   11/09/22   Check cryptographic mechanisms are used to protect the integrity of audit tools
	
{
   l_output="" l_output2=""
   l_filelist="/etc/aide.conf /etc/aide/aide.conf $([ -d "/etc/aide.conf.d/" ] && find -L /etc/aide.conf.d/ -type f -name '*.conf' ) $([ -d "/etc/aide/aide.conf.d/" ] && find -L /etc/aide/aide.conf.d/ -type f -name '*.conf' )"
   l_parlist='/sbin/auditctl /sbin/auditd /sbin/ausearch /sbin/aureport /sbin/autrace /sbin/augenrules'
   l_rvg1='p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b'
   l_rvg2='[^#\+\n\r]+\+'
   for l_par in $l_parlist; do
      if [ -e "$l_par" ]; then
         l_regex='^\h*'"${l_par//'/'/"\\/"}"'\h+(?:'"$l_rvg2"')?(?!(?:\2|\3|\4|\5|\6|\7|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\3|\4|\5|\6|\7|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\4|\5|\6|\7|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\5|\6|\7|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\4|\6|\7|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\4|\5|\7|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\4|\5|\6|\8|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\4|\5|\6|\7|\9))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\4|\5|\6|\7|\8))((?:'"$l_rvg1"')\+)(?:'"$l_rvg2"')?(?!(?:\1|\2|\3|\4|\5|\6|\7|\8|\9))((?:'"$l_rvg1"'))(?:\+.*|\h*#.*|\h*)?$'
#l_regex='^\h*'"${l_par//'/'/"\\/"}"'\h+(?:[^#\+\n\r]+\+)?(?!(?:\2|\3|\4|\5|\6|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl|xattrs|sha512)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\3|\4|\5|\6|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\4|\5|\6|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\5|\6|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\4|\6|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\4|\5|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\4|\5|\6|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\4|\5|\6|\7|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\4|\5|\6|\7|\8))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b)\+)(?:[^#\+\n\r]+\+)?(?!(?:\1|\2|\3|\4|\5|\6|\7|\8|\9))((?:p\b|i\b|n\b|u\b|g\b|s\b|b\b|acl\b|xattrs\b|sha512\b))(?:\+.*|\h*#.*|\h*)?$'
         l_chkout="$(grep -Pso -- "$l_regex" $l_filelist)"
         if [ -n "$l_chkout" ]; then
            l_file="$(awk -F: '{print $1}' <<< "$l_chkout")"
            l_pout="$(awk -F: '{print $2}' <<< "$l_chkout")"
            l_output="$l_output\n - Audit tool \"$l_par\" integrity is protected by cryptographic mechanisms\n  - entry: \"$l_pout\"\n  - exists in file: \"$l_file\""
         else
            l_output2="$l_output2\n - Audit tool \"$l_par\" integrity is not protected by cryptographic mechanisms"
         fi
      else
         l_output="$l_output\n - Audit tool \"$l_par\" does not exist on the system. Integrity protection is not required"
      fi
   done

   # If l_output2 is empty, then we pass
   if [ -z "$l_output2" ]; then
      echo -e "\n- Audit Results:\n ** Pass **\n$l_output"
      exit "${XCCDF_RESULT_PASS:-101}"
   else
      # print the reason why we are failing
      echo -e "\n- Audit Results:\n ** Fail **\n$l_output2"
      [ -n "$l_output" ] && echo -e "\n - Correctly configured:\n$l_output"
		exit "${XCCDF_RESULT_FAIL:-102}"
   fi
}