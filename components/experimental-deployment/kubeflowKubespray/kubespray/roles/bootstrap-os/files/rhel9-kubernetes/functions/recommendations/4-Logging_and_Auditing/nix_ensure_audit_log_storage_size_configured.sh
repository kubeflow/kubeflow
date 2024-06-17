#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_audit_log_storage_size_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/01/20    Recommendation "Ensure audit log storage size is configured"
# David Neilson	     08/17/22	 Updated to latest standards
# David Neilson		 11/08/22	 Updated to standards in Ubuntu benchmark
ensure_audit_log_storage_size_configured()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_audit_log_storage_size_configured_chk()
	{
		if grep -Po -- '^\h*max_log_file\h*=\h*\d+\b' /etc/audit/auditd.conf; then
			echo -e "- PASS:\n- ensure audit log storage size is configured"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit log storage size" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- audit log storage size is NOT configured"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit log storage size" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_audit_log_storage_size_configured_fix()
	{
		echo "- Start remediation - Ensuring login and logout events are collected" | tee -a "$LOG" 2>> "$ELOG"

		if grep -Po -- '^\h*max_log_file\h*=\h*' /etc/audit/auditd.conf; then
			sed -ri 's/\s*(#+\s*)?(max_log_file\s*=\s*)(\S+\s*)?(.*)$/\28 \4/' /etc/audit/auditd.conf
		else
			echo "max_log_file = 8" >> /etc/audit/auditd.conf
		fi

		echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"
	}

	ensure_audit_log_storage_size_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_audit_log_storage_size_configured_fix
		[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
		ensure_audit_log_storage_size_configured_chk
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