#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_system_disabled_audit_logs_full.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/01/20    Recommendation "Ensure system is disabled when audit logs are full"
# David Neilson	     07/27/22	 Updated to current standards
# David Neilson		 11/09/22	 Addressed space_left_action vs admin_space_left_action
ensure_system_disabled_audit_logs_full()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	ensure_system_disabled_audit_logs_full_chk()
	{
		l_test1=""
		l_test2=""
		l_test3=""	

		# Check space_left_action
		if grep -Eqs '^\s*space_left_action\s*=\s*email\b' /etc/audit/auditd.conf; then
			l_test1=passed
		fi

		if grep -Eqs '^\s*action_mail_acct\s*=\s*root\b' /etc/audit/auditd.conf; then
			l_test2=passed
		fi

		# Check admin_space_left_action
		if grep -Eqs '^\s*admin_space_left_action\s*=\s*(halt|single)\b' /etc/audit/auditd.conf; then
			l_test3=passed
		fi
		
		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" -a "$l_test3" = "passed" ]; then
			echo -e "- PASS:\n- system will be disabled when audit logs are full"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - system will be disabled" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
		   	echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- system will NOT be disabled when audit logs are full"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - system will NOT be disabled" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}

	ensure_system_disabled_audit_logs_full_fix()
	{
		echo "- Start remediation - editing /etc/audit/auditd.conf" | tee -a "$LOG" 2>> "$ELOG"
		if [ -z "$l_test1" ]; then
			if grep -Eqs '^\s*(#*\s*)?space_left_action\s*=\s*' /etc/audit/auditd.conf; then
				sed -ri 's/^\s*(#*\s*)?(space_left_action\s*=\s*)(\S+\s*)?(.*)$/\2email \4/' /etc/audit/auditd.conf
			else
				echo "space_left_action = email" >> /etc/audit/auditd.conf
			fi
		fi	

		if [ -z "$l_test2" ]; then
			if grep -Eqs '\s*(#*\s*)?action_mail_acct\s*=\s*' /etc/audit/auditd.conf; then
				sed -ri 's/\s*(#*\s*)?(action_mail_acct\s*=\s*)(\S+\s*)?(.*)$/\2root \4/' /etc/audit/auditd.conf
			else
				echo "action_mail_acct = root" >> /etc/audit/auditd.conf
			fi
		fi

		if [ -z "$l_test3" ]; then
			if grep -Eqs '\s*(#*\s*)?admin_space_left_action\s*=\s*' /etc/audit/auditd.conf; then
				sed -ri 's/\s*(#*\s*)?(admin_space_left_action\s*=\s*)(\S+\s*)?(.*)$/\2halt \4/' /etc/audit/auditd.conf
			else
				echo "admin_space_left_action = halt" >> /etc/audit/auditd.conf
			fi
		fi

		echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"
	}

	ensure_system_disabled_audit_logs_full_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_system_disabled_audit_logs_full_fix
		[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
		ensure_system_disabled_audit_logs_full_chk
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