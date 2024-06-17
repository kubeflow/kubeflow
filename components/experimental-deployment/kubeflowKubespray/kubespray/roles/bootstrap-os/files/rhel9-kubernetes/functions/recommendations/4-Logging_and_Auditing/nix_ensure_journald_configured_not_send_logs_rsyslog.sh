#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_journald_configured_not_send_logs_rsyslog.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/17/22    Recommendation "Ensure journald is not configured to send logs to rsyslog"
# 

ensure_journald_configured_not_send_logs_rsyslog()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_journald_configured_not_send_logs_rsyslog_chk()
   {
      echo -e "- Start check - Ensure journald is not configured to send logs to rsyslog" | tee -a "$LOG" 2>> "$ELOG"
      
      if ! grep -Pq '^\s*ForwardToSyslog' /etc/systemd/journald.conf; then
         echo -e "- PASS:\n- ForwardToSyslog was not found in /etc/systemd/journald.conf" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure journald is not configured to send logs to rsyslog" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
      else
         if grep -Piq '^\s*ForwardToSyslog\s*=\s*no' /etc/systemd/journald.conf; then
            echo -e "- PASS:\n- /etc/systemd/journald.conf contains: $(grep -P '^\s*ForwardToSyslog\s*=\s*no' /etc/systemd/journald.conf)" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure journald is not configured to send logs to rsyslog" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-101}"
         else
            echo -e "- FAIL:\n- /etc/systemd/journald.conf contains: $(grep -P '^\s*ForwardToSyslog' /etc/systemd/journald.conf)" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure journald is not configured to send logs to rsyslog" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
         fi
      fi
   
   }
   
   ensure_journald_configured_not_send_logs_rsyslog_fix()
   {
      echo -e "- Start remediation - Ensure journald is not configured to send logs to rsyslog" | tee -a "$LOG" 2>> "$ELOG"
      
      echo -e "- Review /etc/systemd/journald.conf and verify that logs are being forwarded according to organizational requirements." | tee -a "$LOG" 2>> "$ELOG"
	  l_test="manual"
      
      echo -e "- End remediation - Ensure journald is not configured to send logs to rsyslog" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_journald_configured_not_send_logs_rsyslog_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
      	ensure_journald_configured_not_send_logs_rsyslog_fix
	  	if [ "$l_test" != "manual" ]; then
			ensure_journald_configured_not_send_logs_rsyslog_chk
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