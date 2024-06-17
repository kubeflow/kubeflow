#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   03/10/21   Check log files have appropriate permissions and ownership
# E. Pinnell   10/17/22   Modified to allow common application logging to pass. Improved efficiency of script
	
{
   echo -e "\n- Start check - logfiles have appropriate permissions and ownership"
   output=""
   UID_MIN=$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)
   find /var/log -type f | (while read -r fname; do
      bname="$(basename "$fname")"
      fugname="$(stat -Lc "%U %G" "$fname")"
      funame="$(awk '{print $1}' <<< "$fugname")"
      fugroup="$(awk '{print $2}' <<< "$fugname")"
      fuid="$(stat -Lc "%u" "$fname")"
      fmode="$(stat -Lc "%a" "$fname")"
      case "$bname" in
         lastlog | lastlog.* | wtmp | wtmp.* | wtmp-* | btmp | btmp.* | btmp-*)
            if ! grep -Pq -- '^\h*[0,2,4,6][0,2,4,6][0,4]\h*$' <<< "$fmode"; then
               output="$output\n- File: \"$fname\" mode: \"$fmode\"\n"
            fi
            if ! grep -Pq -- '^\h*root\h+(utmp|root)\h*$' <<< "$fugname"; then
               output="$output\n- File: \"$fname\" ownership: \"$fugname\"\n"
            fi
            ;;
         secure | auth.log | syslog | messages)
            if ! grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$' <<< "$fmode"; then
               output="$output\n- File: \"$fname\" mode: \"$fmode\"\n"
            fi
            if ! grep -Pq -- '^\h*(syslog|root)\h+(adm|root)\h*$' <<< "$fugname"; then
               output="$output\n- File: \"$fname\" ownership: \"$fugname\"\n"
            fi
            ;;
         SSSD | sssd)
            if ! grep -Pq -- '^\h*[0,2,4,6][0,2,4,6]0\h*$' <<< "$fmode"; then
               output="$output\n- File: \"$fname\" mode: \"$fmode\"\n"
            fi
            if ! grep -Piq -- '^\h*(SSSD|root)\h+(SSSD|root)\h*$' <<< "$fugname"; then
               output="$output\n- File: \"$fname\" ownership: \"$fugname\"\n"
            fi
            ;;
         gdm | gdm3)
            if ! grep -Pq -- '^\h*[0,2,4,6][0,2,4,6]0\h*$' <<< "$fmode"; then
               output="$output\n- File: \"$fname\" mode: \"$fmode\"\n"
            fi
            if ! grep -Pq -- '^\h*(root)\h+(gdm3?|root)\h*$' <<< "$fugname"; then
               output="$output\n- File: \"$fname\" ownership: \"$fugname\"\n"
            fi
            ;;
         *.journal | *.journal~)
            if ! grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$' <<< "$fmode"; then
               output="$output\n- File: \"$fname\" mode: \"$fmode\"\n"
            fi
            if ! grep -Pq -- '^\h*(root)\h+(systemd-journal|root)\h*$' <<< "$fugname"; then
               output="$output\n- File: \"$fname\" ownership: \"$fugname\"\n"
            fi
            ;;
         *)
            if ! grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$' <<< "$fmode"; then
               output="$output\n- File: \"$fname\" mode: \"$fmode\"\n"
            fi
            if [ "$fuid" -ge "$UID_MIN" ] || ! grep -Pq -- '(adm|root|'"$(id -gn "$funame")"')' <<< "$fugroup"; then
               if [ -n "$(awk -v grp="$fugroup" -F: '$1==grp {print $4}' /etc/group)" ] || ! grep -Pq '(syslog|root)' <<< "$funame"; then
                  output="$output\n- File: \"$fname\" ownership: \"$fugname\"\n"
               fi
            fi
            ;;
      esac
   done
   # If all files passed, then we pass
   if [ -z "$output" ]; then
      echo -e "\n- Audit Results:\n ** Pass **\n- All files in \"/var/log/\" have appropriate permissions and ownership\n"
      echo -e "- End check - logfiles have appropriate permissions and ownership"
      exit "${XCCDF_RESULT_PASS:-101}"
   else
      # print the reason why we are failing
      echo -e "\n- Audit Results:\n ** Fail **\n$output"
      echo -e "- End check - logfiles have appropriate permissions and ownership"
		exit "${XCCDF_RESULT_FAIL:-102}"
   fi
   )
}