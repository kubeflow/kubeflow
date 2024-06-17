#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_rsyslog_configured_send_logs_remote_host.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Ensure rsyslog is configured to send logs to a remote log host"
# Justin Brown       05/11/22    Updated to modern format
# 

ensure_rsyslog_configured_send_logs_remote_host()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""

   ensure_rsyslog_configured_send_logs_remote_host_chk()
   {
      echo -e "- Start check - Ensure rsyslog Service is enabled and running" | tee -a "$LOG" 2>> "$ELOG"
      l_test=""
      
      if grep -E '^\s*([^#]+\s+)?action\(([^#]+\s+)?\btarget=\"?[^#"]+\"?\b' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
         	l_output="Remote log host entry found:\n$(grep -E '^\s*([^#]+\s+)?action\(([^#]+\s+)?\btarget=\"?[^#"]+\"?\b' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)"
         	l_test="passed"
      fi

      if grep -E '^[^#]\s*\S+\s+\@' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
         	l_output="$l_output\nRemote log host entry found:\n$(grep -E '^[^#]\s*\S+\s+\@' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)"
         	l_test="passed"
      fi         
      
      if [ "$l_test" = passed ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure rsyslog Service is enabled and running" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure rsyslog Service is enabled and running" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
      
   }
   
   ensure_rsyslog_configured_send_logs_remote_host_fix()
   {
      echo -e "- Start remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
      
      echo -e "- Making modifications to destination of log files could have significant unintended consequences or result in log files being lost or mis-directed.\n- Therefore, it is recommended that the rsyslog configuration be reviewed and determine the action to be taken in accordance with site policy." | tee -a "$LOG" 2>> "$ELOG"
      
      l_test="manual"
      
      echo -e "- End remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
      
   }
   
   ensure_rsyslog_configured_send_logs_remote_host_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
      	ensure_rsyslog_configured_send_logs_remote_host_fix
	  	if [ "$l_test" != "manual" ]; then
      		ensure_rsyslog_configured_send_logs_remote_host_chk
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