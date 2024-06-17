#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_user_must_provide_password_for_escalation.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/26/22    Recommendation "Ensure users must provide password for escalation"
#
   
ensure_user_must_provide_password_for_escalation()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_user_must_provide_password_for_escalation_chk()
	{
		echo "- Start check - Ensure users must provide password for escalation" | tee -a "$LOG" 2>> "$ELOG"
		
		if grep -Pq "^[^#].*NOPASSWD" /etc/sudoers /etc/sudoers.d/*; then
			echo -e "- FAILED:" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- sudo NOPASSWD configuration found:\n- $(grep -P "^[^#].*NOPASSWD" /etc/sudoers /etc/sudoers.d/*)" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure users must provide password for escalation" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		else
			echo -e "- PASSED:\n- sudo NOPASSWD configuration NOT found." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure users must provide password for escalation" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-101}"
		fi	
	}
	
	ensure_user_must_provide_password_for_escalation_fix()
	{
		echo -e "- Start remediation - Ensure users must provide password for escalation" | tee -a "$LOG" 2>> "$ELOG"
		
		echo -e "- Changes to account's abilities to escalate privileges could result in unexpected outage and unhappy users.\n- Review any occurrences of 'NOPASSWD' tags in /etc/sudoers and /etc/sudoers.d/* and verify that they comply with all site policies." | tee -a "$LOG" 2>> "$ELOG"
		l_test="manual"

		echo -e "- End remediation - Ensure users must provide password for escalation" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_user_must_provide_password_for_escalation_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_user_must_provide_password_for_escalation_fix
        if [ "$l_test" != "manual" ]; then
            ensure_user_must_provide_password_for_escalation_chk
            if [ "$?" = "101" ]; then
                [ "$l_test" != "failed" ] && l_test="remediated"
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