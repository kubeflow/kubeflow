#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_inactive_password_lock_30_days_less.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure inactive password lock is 30 days or less"
# Justin Brown       06/09/22    Updated to modern format
# 
 
ensure_inactive_password_lock_30_days_less()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   cde="$(date "+%s")"
   
   ensure_inactive_password_lock_30_days_less_chk()
	{
      echo -e "- Start check - Ensure inactive password lock is 30 days or less" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_test1="" l_test2=""
      
      # Verify INACTIVE conforms to policy
      if [ $(useradd -D | grep -i inactive | awk -F= '{print $2}') -le "30" ] && [ $(useradd -D | grep -i inactive | awk -F= '{print $2}') != "-1" ]; then
         l_test1=passed
      elif [ -z "$(useradd -D | grep -i inactive | awk -F= '{print $2}')" ]; then
         l_output="- INACTIVE is not set"
      else
         l_output="- INACTIVE set to: $(useradd -D | grep -i inactive | awk -F= '{print $2}')"
      fi
      
      # Check users for their expiration
      for user in $(grep -E ^[^:]+:[^\!*] /etc/shadow | cut -d: -f1,7); do
         l_user="$(awk -F: '{print $1}'<<< $user)"
         l_days="$(awk -F: '{print $2}'<<< $user)"
         if [ -z "$l_days" ] || [ "$l_days" -gt "30" ] || [ "$l_days" = "-1" ]; then
            if [ -z "$l_output" ]; then
               l_output="- $l_user INACTIVE is set to: $l_days"
               l_test2=failed
            else
                l_output="$l_output\n- $l_user INACTIVE is set to: $l_days"
                l_test2=failed
            fi
         fi
		done
      
      if [ "$l_test1" = "passed" ] && [ -z "$l_test2" ]; then
			echo -e "- PASS:\n- useradd default INACTIVE value and all users have INACTIVE set correctly" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure inactive password lock is 30 days or less" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure inactive password lock is 30 days or less" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi  
   }
   
   ensure_inactive_password_lock_30_days_less_fix()
	{
      echo -e "- Start remediation - Ensure inactive password lock is 30 days or less" | tee -a "$LOG" 2>> "$ELOG"
      l_user="" l_days=""
      
      # Check if test should be set to manual instead
      if [ -z "$(awk -F : '/^root:[^!*]/ {print $7}' /etc/shadow)" ] || [ "$(awk -F : '/^root:[^!*]/ {print $7}' /etc/shadow)" -gt "30" ] || [ "$(awk -F : '/^root:[^!*]/ {print $7}' /etc/shadow)" = "-1" ]; then
         if [ -z "$(lastlog -t 20 -u root | grep '^root')" ]; then
            echo -e "- The root account has not been logged into in the last 20 days.\n- Before setting inactive_password_lock you should log into the root account" | tee -a "$LOG" 2>> "$ELOG"
            test=manual
         fi
      fi	
      
      if [ -z "$test" ]; then
         for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $7}' /etc/shadow); do
            l_user="$(awk -F: '{print $1}'<<< $user)"
            l_days="$(awk -F: '{print $2}'<<< $user)"
            if [ -z "$l_days" ] || [ "$l_days" -gt "30" ] || [ "$l_days" = "-1" ]; then
               echo -e "- User: \"$l_user\" has INACTIVE of: \"$l_days\", remediating user: \"$l_user\"" | tee -a "$LOG" 2>> "$ELOG"
               if [ "$l_user" = "root" ]; then
                  # Check if root's last login was more than 20 days ago
                  if [ -z "$(lastlog -t 20 -u root | grep '^root')" ]; then
                     echo -e "User \"$l_user\" will be set INACTIVE.  Please log into the root account before setting INACTIVE value for root" | tee -a "$LOG" 2>> "$ELOG"
                  else
                     chage --inactive 30 "$l_user"
                  fi
               else
                  [ "$(lastlog -t 30 -u $l_user | grep '^$l_user')" ] && echo "User \"$l_user\" last login is more than 30 days ago, users account may now be inactive" | tee -a "$LOG" 2>> "$ELOG"
                  [ -n "$l_user" ] && chage --inactive 30 "$l_user"
               fi
            fi
         done
      fi
         
      # Set useradd defaults"
      
      if [ -z "$l_test1" ]; then
         echo -e "- Setting default useradd INACTIVE value to 30" | tee -a "$LOG" 2>> "$ELOG"
         useradd -D -f 30
      fi
      
      echo -e "- End remediation - Ensure inactive password lock is 30 days or less" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_inactive_password_lock_30_days_less_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_inactive_password_lock_30_days_less_fix
         ensure_inactive_password_lock_30_days_less_chk
         if [ "$?" = "101" ]; then
            [ "$test" != "failed" ] && test="remediated"
         else
            test="failed"
         fi
      fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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