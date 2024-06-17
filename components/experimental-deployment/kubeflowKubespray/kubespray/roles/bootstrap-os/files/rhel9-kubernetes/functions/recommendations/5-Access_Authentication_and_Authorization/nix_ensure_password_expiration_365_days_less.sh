#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_password_expiration_365_days_less.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/28/20    Recommendation "Ensure password expiration is 365 days or less"
# Justin Brown       05/17/22    Updated to modern format
# 

ensure_password_expiration_365_days_less()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   cde="$(date "+%s")"
   
   ensure_password_expiration_365_days_less_chk()
	{
      echo -e "- Start check - Ensure password expiration is 365 days or less" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_test1="" l_test2=""
      
      # Check if PASS_MAX_DAYS is configured in /etc/login.defs
      if grep -Pq '^\s*PASS_MAX_DAYS\s+([1-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-5])\b' /etc/login.defs; then
         l_test1=passed
      elif grep -Pq '^\s*PASS_MAX_DAYS' /etc/login.defs; then
         l_output="- /etc/login.defs does NOT contain PASS_MAX_DAYS"
      else
         l_output="- /etc/login.defs PASS_MAX_DAYS set to: $(grep -Ps '^\s*PASS_MAX_DAYS' /etc/login.defs | awk '{print $2}')"
      fi
      
      # Check users for their expiration
      for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $5}' /etc/shadow); do
         l_user="$(awk -F: '{print $1}'<<< $user)"
         l_days="$(awk -F: '{print $2}'<<< $user)"
         if [ -z "$l_days" ] || [ "$l_days" -gt "365" ] || [ "$l_days" = "-1" ]; then
            if [ -z "$l_output" ]; then
               l_output="- $l_user password expiration is set to: $l_days"
               l_test2=failed
            else
                l_output="$l_output\n- $l_user password expiration is set to: $l_days"
                l_test2=failed
            fi
         fi
		done
      
      if [ "$l_test1" = "passed" ] && [ -z "$l_test2" ]; then
			echo -e "- PASS:\n- /etc/login.defs and all users have password expiration set correctly" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password expiration is 365 days or less" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password expiration is 365 days or less" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi  
   }
   
   ensure_password_expiration_365_days_less_fix()
	{
      echo -e "- Start remediation - Ensure password expiration is 365 days or less" | tee -a "$LOG" 2>> "$ELOG"
      l_user="" l_days=""
      
      # Check if test should be set to manual instead
      if [ -z "$(awk -F : '/^root:[^!*]/ {print $5}' /etc/shadow)" ] || [ "$(awk -F : '/^root:[^!*]/ {print $5}' /etc/shadow)" -gt "365" ] || [ "$(awk -F : '/^root:[^!*]/ {print $5}' /etc/shadow)" = "-1" ]; then
         if chage --list root | grep -Pq '^Last password change\h*:\h*never' || [ "$(date --date="$(chage --list root | grep '^Last password change' | cut -d: -f2)" +%s)" -le "$((cde-30758400))" ]; then
            echo -e "- The password for root needs to be updated before setting expiration.  Please updated root's password and set an expitation for root" | tee -a "$LOG" 2>> "$ELOG"
            l_test=manual
         fi
      fi
      
      if [ -z "$l_test" ]; then
         for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $5}' /etc/shadow); do
            l_user="$(awk -F: '{print $1}'<<< $user)"
            l_days="$(awk -F: '{print $2}'<<< $user)"
            if [ -z "$l_days" ] || [ "$l_days" -gt "365" ] || [ "$l_days" = "-1" ]; then
               echo "- User: \"$l_user\" has PASS_MAX_DAYS of: \"$l_days\", remediating user: \"$l_user\"" | tee -a "$LOG" 2>> "$ELOG"
               if [ "$l_user" = "root" ]; then
                  # Check if root's password is about to expire
                  if [ "$(date --date="$(chage --list "$l_user" | grep '^Last password change' | cut -d: -f2)" +%s)" -le "$((cde-30758400))" ]; then
                     echo "User \"$l_user\" password will be expired.  Please update root's password before setting password expiration for root" | tee -a "$LOG" 2>> "$ELOG"
                  else
                     chage --maxdays 365 "$l_user"
                  fi
               else
                  [ "$(date --date="$(chage --list "$l_user" | grep '^Last password change' | cut -d: -f2)" +%s)" -le "$((cde-31536000))" ] && echo "User \"$l_user\" password is more than 365 days old, users password may now be expired" | tee -a "$LOG" 2>> "$ELOG"
                  [ -n "$l_user" ] && chage --maxdays 365 "$l_user"
               fi
            fi
         done
      fi
         
      # Set PASS_MAX_DAYS in /etc/login.defs"
      if ! grep -Eq '^\s*PASS_MAX_DAYS\s+([1-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-5])\b' /etc/login.defs; then
         if grep -Pq '^\s*PASS_MAX_DAYS\h+(-1|36[6-9]|3[7-9][0-9]|[4-9][0-9]{2}|[1-9][0-9]{3,})' /etc/login.defs; then
            echo -e "- Updating PASS_MAX_DAYS entry in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(PASS_MAX_DAYS\s+)(\S+)(.*)$/\1 365 \3/' /etc/login.defs
         else
            echo -e "- Inserting PASS_MAX_DAYS entry in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*#\s*PASS_MAX_DAYS/a PASS_MAX_DAYS 365' /etc/login.defs
         fi
      fi
      
      echo -e "- End remediation - Ensure password expiration is 365 days or less" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_password_expiration_365_days_less_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
      if [ "$l_test" != "NA" ]; then
         ensure_password_expiration_365_days_less_fix
         if [ "$l_test" != "manual" ]; then
            ensure_password_expiration_365_days_less_chk
            if [ "$?" = "101" ]; then
               [ "$l_test" != "failed" ] && l_test="remediated"
            else
               l_test="failed"
            fi
         fi
      fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$l_test" in
		passed)
			echo -e "- Result - No remediation required\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
			;;
		remediated)
			echo -e "- Result - successfully remediated\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-103}"
			;;
		manual)
			echo -e "- Result - requires manual remediation\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-106}"
			;;
		NA)
			echo -e "- Result - Recommendation is non applicable\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-104}"
			;;
		*)
			echo -e "- Result - remediation failed\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}