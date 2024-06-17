#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_systemd-journal-remote_service_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/16/22    Recommendation "Ensure systemd-journal-remote is enabled"
# 

ensure_systemd-journal-remote_service_enabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	
	l_test=""	

	ensure_systemd-journal-remote_service_enabled_chk()
	{
        echo -e "- Start Check - Ensure systemd-journal-remote is enabled" | tee -a "$LOG" 2>> "$ELOG"
		l_test1=""

		# Verify systemd-journal-remote is enabled
		if systemctl is-enabled systemd-journal-upload.service; then
			l_test1="passed"
		fi
		
		# If systemd-journal-remote is enabled and running, we pass.
		if [ "$l_test1" = "passed" ] ; then
			echo -e "- PASS:\n- systemd-journal-remote package is enabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure systemd-journal-remote is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- systemd-journal-remote package is NOT enabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure systemd-journal-remote is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_systemd-journal-remote_service_enabled_fix()
	{
		echo -e "- Start remediation - Ensure systemd-journal-remote is enabled" | tee -a "$LOG" 2>> "$ELOG"

		if [ "$l_test1" != "passed"  ] ; then
			if systemctl is-enabled systemd-journal-upload.service | grep -q 'masked'; then
				echo -e "- Unmasking systemd-journal-remote service" | tee -a "$LOG" 2>> "$ELOG"
				systemctl unmask systemd-journal-upload.service
				echo -e "- Starting systemd-journal-remote service" | tee -a "$LOG" 2>> "$ELOG"
				systemctl --now enable systemd-journal-upload.service
			else
				echo -e "- Starting systemd-journal-remote service" | tee -a "$LOG" 2>> "$ELOG"
				systemctl --now enable systemd-journal-upload.service
			fi
		fi

		echo -e "- End remediation - Ensure systemd-journal-remote is enabled" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_systemd-journal-remote_service_enabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_systemd-journal-remote_service_enabled_fix
		ensure_systemd-journal-remote_service_enabled_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="remediated"
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