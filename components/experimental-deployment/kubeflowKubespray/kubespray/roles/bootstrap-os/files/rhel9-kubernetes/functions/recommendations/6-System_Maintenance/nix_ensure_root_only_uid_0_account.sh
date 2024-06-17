#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/nix_ensure_root_only_uid_0_account.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/25/20    Recommendation "Ensure root is the only UID 0 account"
# Justin Brown		 04/25/22    Update to modern format. Added passing criteria.
# Justin Brown		 09/08/22 	 Small syntax changes

ensure_root_only_uid_0_account()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""	
	
	ensure_root_only_uid_0_account_chk()
	{
      echo -e "- Start check - Ensure root is the only UID 0 account" | tee -a "$LOG" 2>> "$ELOG"
      output=""
      
		for user in $(awk -F: '($3 == 0) { print $1 }' /etc/passwd); do
			if [ "$user" != "root" ]; then
				output="$output $user has a UID of 0\n"
			fi
		done
		
		if [ -z "$output" ]; then
			echo -e "- PASS: - Root is the only UID 0 account."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure root is the only UID 0 account." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n$output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure root is the only UID 0 account." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_root_only_uid_0_account_fix()
	{
		echo -e "- Start remediation - Root is the only UID 0 account." | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Making modifications to /etc/passwd could have significant unintended consequences or result in outages and unhappy users. Therefore, it is recommended that the current user list be reviewed and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End remediation - Root is the only UID 0 account." | tee -a "$LOG" 2>> "$ELOG"
		test="manual"
	}
	
	ensure_root_only_uid_0_account_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_root_only_uid_0_account_fix
        if [ "$test" != "manual" ]; then
		    ensure_root_only_uid_0_account_chk
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