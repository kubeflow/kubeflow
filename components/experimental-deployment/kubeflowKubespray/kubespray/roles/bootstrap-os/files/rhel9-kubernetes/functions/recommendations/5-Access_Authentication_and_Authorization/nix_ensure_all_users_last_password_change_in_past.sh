#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_all_users_last_password_change_in_past.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure all users last password change date is in the past"
# Justin Brown		   05/15/22    Update to modern format.
#
 
ensure_all_users_last_password_change_in_past()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""	
	
	ensure_all_users_last_password_change_in_past_chk()
	{
      echo -e "- Start check - Ensure all users last password change date is in the past" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_test=""
      
		for usr in $(cut -d: -f1 /etc/shadow); do
         if [ "$(date --date="$(chage --list "$usr" | grep '^Last password change' | cut -d: -f2)" +%s)" -le "$(date "+%s")" ]; then
            [ -z "$l_output" ] && l_test=passed
         else
            if [ -z "$l_output" ]; then
               l_output="   $usr - $(chage --list "$usr" | grep '^Last password change' |  sed -e 's/\s*:/:/g')"
            else
               l_output="$l_output\n   $usr - $(chage --list "$usr" | grep '^Last password change' |  sed -e 's/\s*:/:/g')"
            fi
            l_test=failed
         fi
      done
         
		
		if [ -z "$l_output" ] && [ "$l_test" = "passed" ]; then
			echo -e "- PASS: - All users last password change date is in the past"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure all users last password change date is in the past" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n- Some users last password change date is NOT in the past\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure all users last password change date is in the past" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_all_users_last_password_change_in_past_fix()
	{
		test=""
		echo -e "- Start remediation - Ensure all users last password change date is in the past" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Making modifications to /etc/passwd could have significant unintended consequences or result in outages and unhappy users. Therefore, it is recommended that the current user list be reviewed and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End remediation - Ensure all users last password change date is in the past" | tee -a "$LOG" 2>> "$ELOG"
		test="manual"
	}
	
	ensure_all_users_last_password_change_in_past_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_all_users_last_password_change_in_past_fix
		ensure_all_users_last_password_change_in_past_chk
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