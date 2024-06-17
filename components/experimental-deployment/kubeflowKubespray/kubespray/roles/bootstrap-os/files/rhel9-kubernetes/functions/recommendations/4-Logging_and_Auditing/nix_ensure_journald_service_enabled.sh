#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_journald_service_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/17/22    Recommendation "Ensure journald service is enabled"
# 

ensure_journald_service_enabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"	
	l_test=""	

	ensure_journald_service_enabled_chk()
	{
        echo -e "- Start remediation - Ensure journald service is enabled" | tee -a "$LOG" 2>> "$ELOG"
		l_test1=""

		# Verify auditd is enabled
		if systemctl is-enabled systemd-journald.service | grep 'static'; then
			l_test1="passed"
		fi
		
		# If auditd is enabled and running, we pass.
		if [ "$l_test1" = "passed" ] ; then
			echo -e "- PASS:\n- systemd-journald.service is enabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure journald service is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- systemd-journald.service is NOT enabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure journald service is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi

        echo -e "- Start remediation - Ensure journald service is enabled" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_journald_service_enabled_fix()
	{
		echo -e "- Start remediation - Ensure journald service is enabled" | tee -a "$LOG" 2>> "$ELOG"

		if [ "$l_test1" != "passed" ] ; then
            echo -e "- By default the systemd-journald service does not have an [Install] section and thus cannot be enabled / disabled.\n- It is meant to be referenced as Requires or Wants by other unit files.\n- As such, if the status of systemd-journald is not static, investigate why." | tee -a "$LOG" 2>> "$ELOG"
            l_test="manual"
        fi

		echo -e "- End remediation - Ensure journald service is enabled" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_journald_service_enabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_journald_service_enabled_fix
        if [ "$l_test" != "manual" ]; then
            ensure_journald_service_enabled_chk
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