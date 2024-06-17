#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_audit_logs_not_automatically_deleted.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/01/20    Recommendation "Ensure audit logs are not automatically deleted"
# David Neilson	     08/17/22	 Updated to latest standards
# David Neilson	     11/09/22	 Run in bash shell
ensure_audit_logs_not_automatically_deleted()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	ensure_audit_logs_not_automatically_deleted_chk()
	{
		if grep -Eqs 'max_log_file_action\s*=\s*keep_logs\b' /etc/audit/auditd.conf; then
			echo -e "- PASS:\n- ensure audit logs are not automatically deleted"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit log deletion" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- audit logs may be automatically deleted"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit log deletion" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_audit_logs_not_automatically_deleted_fix()
	{
		echo "- Start remediation - Ensuring audit logs are not automatically deleted" | tee -a "$LOG" 2>> "$ELOG"		

		if grep -Eqs '\s*(#+\s*)?max_log_file_action\s*=\s*' /etc/audit/auditd.conf; then
			sed -ri 's/\s*(#+\s*)?(max_log_file_action\s*=\s*)(\S+\s*)?(.*)$/\2keep_logs \4/' /etc/audit/auditd.conf
		else
			echo "max_log_file_action = keep_logs" >> /etc/audit/auditd.conf
		fi

		echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"
	}

	ensure_audit_logs_not_automatically_deleted_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_audit_logs_not_automatically_deleted_fix
		[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
		ensure_audit_logs_not_automatically_deleted_chk
		if [ "$?" != "101" ]; then
			l_test="failed" 
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