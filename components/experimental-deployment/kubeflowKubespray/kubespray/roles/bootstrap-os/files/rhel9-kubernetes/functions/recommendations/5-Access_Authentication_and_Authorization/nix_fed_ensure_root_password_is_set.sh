#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_root_password_is_set.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# David Neilson      04/22/23    Recommendation "Ensure root password is set"
# 

fed_ensure_root_password_is_set()
{
	# Checks all user passwords in /etc/passwd
	echo -e "- Start check - Ensure root password is set" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
   
	fed_ensure_root_password_is_set_chk()
	{
		
		if passwd -S root | grep -Pq -- 'Password set' ; then
			echo -e "- PASS: - The root password has been set."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure root password is set." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \nThe root password is NOT set" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure root password is set." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	fed_ensure_root_password_is_set_fix()
	{
		echo -e "- Start remediation - Ensure root password is set." | tee -a "$LOG" 2>> "$ELOG"
		
      	echo -e "- Set the root password manually using the command \"passwd root\" " | tee -a "$LOG" 2>> "$ELOG"
      	l_test="manual"
		
      	echo -e "- End remediation - Ensure root password is set." | tee -a "$LOG" 2>> "$ELOG"
	}
	
	fed_ensure_root_password_is_set_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		fed_ensure_root_password_is_set_fix
		if [ "$l_test" != "manual" ]; then
			ensure_root_password_is_set_chk
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