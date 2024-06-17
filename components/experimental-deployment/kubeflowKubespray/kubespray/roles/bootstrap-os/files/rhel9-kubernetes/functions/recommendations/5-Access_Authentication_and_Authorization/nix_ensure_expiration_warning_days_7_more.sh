#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_expiration_warning_days_7_more.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure password expiration warning days is 7 or more"
# Justin Brown       06/06/22    Updated to modern format
# 
 
ensure_expiration_warning_days_7_more()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   cde="$(date "+%s")"
   
   ensure_expiration_warning_days_7_more_chk()
	{
      echo -e "- Start check - Ensure minimum days between password changes is configured" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_test1="" l_test2=""
      
      # Check if PASS_WARN_AGE is configured in /etc/login.defs
      if grep -Eq '^\s*PASS_WARN_AGE\s+([7-9]|[1-9][0-9]+)\b' /etc/login.defs; then
         l_test1=passed
      elif [ -z "$(grep -E '^\s*PASS_WARN_AGE' /etc/login.defs)" ]; then
         l_output="- /etc/login.defs does NOT contain PASS_WARN_AGE"
      else
         l_output="- /etc/login.defs PASS_WARN_AGE set to: $(grep -Ps '^\s*PASS_WARN_AGE' /etc/login.defs | awk '{print $2}')"
      fi
      
      # Check users for their warnings
      for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $6}' /etc/shadow); do
         l_user="$(awk -F: '{print $1}'<<< $user)"
         l_days="$(awk -F: '{print $2}'<<< $user)"
         if [ -z "$l_days" ] || [ "$l_days" -lt "7" ]; then
            if [ -z "$l_output" ]; then
               l_output="- $l_user password warning is set to: $l_days"
               l_test2=failed
            else
                l_output="$l_output\n- $l_user password warning is set to: $l_days"
                l_test2=failed
            fi
         fi
		done
      
      if [ "$l_test1" = "passed" ] && [ -z "$l_test2" ]; then
			echo -e "- PASS:\n- /etc/login.defs and all users have password warnings set correctly" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password expiration warning days is 7 or more" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password expiration warning days is 7 or more" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi 
   
   }
   
   ensure_expiration_warning_days_7_more_fix()
	{
   
      echo -e "- Start remediation - Ensure password expiration warning days is 7 or more" | tee -a "$LOG" 2>> "$ELOG"
      l_user="" l_days=""
      
      # Set user warning in /etc/shadow"
		for user in $(awk -F : '/^[^:]+:[^!*]/ {print $1 ":" $6}' /etc/shadow); do
         l_user="$(awk -F: '{print $1}'<<< $user)"
         l_days="$(awk -F: '{print $2}'<<< $user)"
			if [ -z "$l_days" ] || [ "$l_days" -lt "7" ]; then
				echo "User: \"$l_user\" has PASS_WARN_AGE of: \"$l_days\", remediating user: \"$l_user\"" | tee -a "$LOG" 2>> "$ELOG"
				[ -n "$l_user" ] && chage --warndays 7 "$l_user"
			fi
		done
      
      # Set PASS_WARN_AGE in /etc/login.defs"
      if ! grep -Eq '^\s*PASS_WARN_AGE\s+([7-9]|[1-9][0-9]+)\b' /etc/login.defs; then
         if grep -Pq '^\s*PASS_WARN_AGE\h+\d+\b' /etc/login.defs; then
            echo -e "- Updating PASS_WARN_AGE entry in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(PASS_WARN_AGE\s+)(\S+)(.*)$/\1 7 \3/' /etc/login.defs
         else
            echo -e "- Inserting PASS_WARN_AGE entry in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*#\s*PASS_WARN_AGE/a PASS_WARN_AGE 7' /etc/login.defs
         fi
      fi
      
      echo -e "- End remediation - Ensure password expiration warning days is 7 or more" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_expiration_warning_days_7_more_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_expiration_warning_days_7_more_fix
         ensure_expiration_warning_days_7_more_chk
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