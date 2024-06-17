#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_accounts_in_etc_passwd_use_shadowed_passwords.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       12/01/20    Recommendation "Ensure accounts in /etc/passwd use shadowed passwords"
# Justin Brown		 04/27/22    Update to modern format.
#

ensure_accounts_in_etc_passwd_use_shadowed_passwords()
{
	# Checks all user passwords in /etc/passwd
	echo -e "- Start check - Ensure accounts in /etc/passwd use shadowed passwords" | tee -a "$LOG" 2>> "$ELOG"
	test="" output=""
   
	ensure_accounts_in_etc_passwd_use_shadowed_passwords_chk()
	{
		output=$(awk -F: '($2 != "x" ) { print $1 " is not set to use a shadowed password"}' /etc/passwd)
		
		if [ -z "$output" ]; then
			echo -e "- PASS: - All users in /etc/passwd use a shadowed password."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure accounts in /etc/passwd use shadowed passwords." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n$output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure accounts in /etc/passwd use shadowed passwords." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_accounts_in_etc_passwd_use_shadowed_passwords_fix()
	{
		echo -e "- Start remediation - Ensure accounts in /etc/passwd use shadowed passwords" | tee -a "$LOG" 2>> "$ELOG"
		
      	echo -e "- Making modifications to /etc/passwd or /etc/group could have significant unintended consequences or result in outages and unhappy users. Therefore, it is recommended that the current user and group list be reviewed and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
      	test="manual"
		
      	echo -e "- End remediation - Ensure accounts in /etc/passwd use shadowed passwords" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_accounts_in_etc_passwd_use_shadowed_passwords_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_accounts_in_etc_passwd_use_shadowed_passwords_fix
		if [ "$test" != "manual" ]; then
			ensure_accounts_in_etc_passwd_use_shadowed_passwords_chk
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