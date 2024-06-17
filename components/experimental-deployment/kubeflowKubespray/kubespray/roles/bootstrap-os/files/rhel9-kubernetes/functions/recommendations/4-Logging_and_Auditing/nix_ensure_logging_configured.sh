#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_logging_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Ensure logging is configured"
# Justin Brown       04/18/22    Updated for modern format
# 

ensure_logging_configured()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	ensure_logging_configured_chk()
	{
		echo -e "- Start check - Ensure logging is configured" | tee -a "$LOG" 2>> "$ELOG"

		echo -e "- Result - requires manual remediation\n- Review the contents of /etc/rsyslog.conf and /etc/rsyslog.d/*.conf files to ensure appropriate logging is set.\n- In addition, run the following command and verify that the log files are logging information as expected:\n  # ls -l /var/log/" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End check - Ensure logging is configured" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_logging_configured_fix()
	{
		echo -e "- Start remediation - Ensure logging is configured" | tee -a "$LOG" 2>> "$ELOG"

		echo -e "- Edit /etc/rsyslog.conf and /etc/rsyslog.d/*.conf files as appropriate for your environment.\n- Once logging is configured for your environment run the following command to reload the rsyslogd configuration:\n  # systemctl restart rsyslog" | tee -a "$LOG" 2>> "$ELOG"
		l_test="manual"

		echo -e "- End remediation - Ensure logging is configured" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_logging_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_logging_configured_fix
        if [ "$l_test" != "manual" ]; then
            ensure_logging_configured_chk
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