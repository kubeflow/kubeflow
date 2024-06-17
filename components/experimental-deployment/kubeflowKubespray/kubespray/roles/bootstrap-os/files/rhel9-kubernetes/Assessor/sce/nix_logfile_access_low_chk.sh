#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/12/23   Check log files have appropriate access mode **0644** configured (Deprecates nix_logfile_perm_own_chk.sh)

#!/usr/bin/env bash

l_output2=""
l_auser="root|syslog"
l_agroup="root|adm"
l_uidmin="$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"

file_test_chk()
{
   l_op2=""
   maxperm="$( printf '%o' $(( 0777 & ~$perm_mask)) )"

   if [ "$l_uid" -lt "$l_uidmin" ] && [ -z "$(awk -v grp="$l_group" -F: '$1==grp {print $4}' /etc/group)" ]; then
      if [[ ! "$l_user" =~ ($l_auser) ]]; then
         l_auser="$l_auser|$l_user"
      fi
      if [[ ! "$l_group" =~ ($l_agroup) ]]; then
         l_tst=""
         while read -r l_duid; do
            if [ -n "$l_duid" ]; then
               [ "$l_duid" -ge "$l_uidmin" ] && l_tst=failed
            fi
         done <<< "$(awk -F: '$4=='"$l_gid"' {print $3}' /etc/passwd)"
         [ "$l_tst" != "failed" ] && l_agroup="$l_agroup|$l_group"
      fi
   fi

   if [ $(( $l_mode & $perm_mask )) -gt 0 ]; then
      l_op2="$l_op2\n  - Mode: \"$l_mode\" should be \"$maxperm\" or more restrictive"
   fi

   if [[ ! "$l_user" =~ ($l_auser) ]]; then
      l_op2="$l_op2\n  - Owned by: \"$l_user\" and should be owned by \"${l_auser//|/ or }\""
   fi

   if [[ ! "$l_group" =~ ($l_agroup) ]]; then
      l_op2="$l_op2\n  - Group owned by: \"$l_group\" and should be group owned by \"${l_agroup//|/ or }\""
   fi

   [ -n "$l_op2" ] && l_output2="$l_output2\n - File: \"$l_fname\" is:$l_op2\n"
}
a_file=() # Initialize array
# Loop to create array with stat of files that could possibly fail one of the audits
while IFS= read -r -d $'\0' l_file; do
   [ -f "$l_file" ] && a_file+=("$(stat -Lc '%n^%#a^%U^%u^%G^%g' "$l_file")")
done < <(find -L /var/log -type f \( -perm /0137 -o ! -user root -o ! -group root \) -print0)

while IFS="^" read -r l_fname l_mode l_user l_uid l_group l_gid; do
   l_bname="$(basename "$l_fname")"
   case "$l_bname" in
      lastlog | lastlog.* | wtmp | wtmp.* | wtmp-* | README)
         perm_mask='0113'
         file_test_chk;;
      secure | auth.log | auth.log.* | syslog | syslog.* | messages | messages.* | *.journal | *.journal~ | kern.log | kern.log.* | aide.log | aide.log.* | term.log | term.log.* | mail.log | mail.log.* | ufw.log | ufw.log.*)
         perm_mask='0137'
         file_test_chk;;
      btmp | btmp.* | btmp-* | SSSD | sssd | gdm | gdm3)
         perm_mask='0117'
         file_test_chk;;
      *)
         perm_mask='0133'
         file_test_chk;;
   esac
done <<< "$(printf '%s\n' "${a_file[@]}")"

unset a_file # Clear array
# If all files passed, then we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Results:\n ** Pass **\n- All files in \"/var/log/\" have appropriate permissions and ownership\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # print the reason why we are failing
   echo -e "\n- Audit Results:\n ** Fail **\n$l_output2"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi