#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_minimum_days_between_password_changes_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/05/20    Recommendation "Ensure minimum days between password changes is configured"
# Justin Brown       06/06/22    Updated to modern format
# 
 
ensure_minimum_days_between_password_changes_configured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   cde="$(date "+%s")"
   
   ensure_minimum_days_between_password_changes_configured_chk()
	{
      echo -e "- Start check - Ensure minimum days between password changes is configured" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_test1="" l_test2=""
      
      # Check if PASS_MIN_DAYS is configured in /etc/login.defs
      if grep -Eq '^\s*PASS_MIN_DAYS\s+[1-9]+\b' /etc/login.defs; then
         l_test1=passed
      elif [ -z "$(grep -E '^\s*PASS_MIN_DAYS' /etc/login.defs)" ]; then
         l_output="- /etc/login.defs does NOT contain PASS_MIN_DAYS"
      else
         l_output="- /etc/login.defs PASS_MIN_DAYS set to: $(grep -Ps '^\s*PASS_MIN_DAYS' /etc/login.defs | awk '{print $2}')"
      fi
      
      # Check users for their minimum
      for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $4}' /etc/shadow); do
         l_user="$(awk -F: '{print $1}'<<< $user)"
         l_days="$(awk -F: '{print $2}'<<< $user)"
         if [ -z "$l_days" ] || [ "$l_days" -lt "1" ]; then
            if [ -z "$l_output" ]; then
               l_output="- $l_user password minimum is set to: $l_days"
               l_test2=failed
            else
                l_output="$l_output\n- $l_user password minimum is set to: $l_days"
                l_test2=failed
            fi
         fi
		done
      
      if [ "$l_test1" = "passed" ] && [ -z "$l_test2" ]; then
			echo -e "- PASS:\n- /etc/login.defs and all users have password minimum set correctly" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure minimum days between password changes is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure minimum days between password changes is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi 
   
   }
   
   ensure_minimum_days_between_password_changes_configured_fix()
	{
   
      echo -e "- Start remediation - Ensure minimum days between password changes is configured" | tee -a "$LOG" 2>> "$ELOG"
      l_user="" l_days=""
      
      # Set user minimum in /etc/shadow"
		for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $4}' /etc/shadow); do
         l_user="$(awk -F: '{print $1}'<<< $user)"
         l_days="$(awk -F: '{print $2}'<<< $user)"
			if [ -z "$l_days" ] || [ "$l_days" -lt "1" ]; then
				echo "User: \"$l_user\" has PASS_MIN_DAYS of: \"$l_days\", remediating user: \"$l_user\"" | tee -a "$LOG" 2>> "$ELOG"
				[ -n "$l_user" ] && chage --mindays 1 "$l_user"
			fi
		done
      
      # Set PASS_MIN_DAYS in /etc/login.defs"
      if ! grep -Eq '^\s*PASS_MIN_DAYS\s+[1-9]+\b' /etc/login.defs; then
         if grep -Pq '^\s*PASS_MIN_DAYS\h+\d+\b' /etc/login.defs; then
            echo -e "- Updating PASS_MIN_DAYS entry in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(PASS_MIN_DAYS\s+)(\S+)(.*)$/\1 1 \3/' /etc/login.defs
         else
            echo -e "- Inserting PASS_MIN_DAYS entry in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*#\s*PASS_MIN_DAYS/a PASS_MIN_DAYS 1' /etc/login.defs
         fi
      fi
      
      echo -e "- End remediation - Ensure minimum days between password changes is configured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_minimum_days_between_password_changes_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_minimum_days_between_password_changes_configured_fix
         ensure_minimum_days_between_password_changes_configured_chk
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