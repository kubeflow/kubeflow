#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_rsyslog_service_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/03/20    Recommendation "Ensure rsyslog service is enabled"
# Justin Brown       05/11/22    Updated to modern format
#

ensure_rsyslog_service_enabled()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_rsyslog_service_enabled_chk()
   {
      	echo -e "- Start check - Ensure rsyslog service is enabled" | tee -a "$LOG" 2>> "$ELOG"
      	l_output="" l_test1=""
      
      	if systemctl is-enabled rsyslog | grep -q 'enabled'; then
        	l_output="rsyslog enabled status: $(systemctl is-enabled rsyslog)"
         	l_test1=passed
      	else 
         	l_output="rsyslog enabled status: $(systemctl is-enabled rsyslog)"
      	fi
      
      	if [ "$l_test1" = passed ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure rsyslog service is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- rsyslog package was found." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure rsyslog service is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   }
      
   ensure_rsyslog_service_enabled_fix()
   {
    	echo -e "- Start remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
      
	  	if systemctl is-enabled rsyslog | grep -q 'masked'; then
			echo -e "- Unmasking rsyslog service " | tee -a "$LOG" 2>> "$ELOG"
			systemctl unmask rsyslog
			echo -e "- Enabling and starting rsyslog service." | tee -a "$LOG" 2>> "$ELOG"
			systemctl --now enable rsyslog
		else
			echo -e "- Enabling and starting rsyslog service." | tee -a "$LOG" 2>> "$ELOG"
			systemctl --now enable rsyslog
		fi 
      
      	echo -e "- End remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
   }  

	ensure_rsyslog_service_enabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
    	ensure_rsyslog_service_enabled_fix
    	ensure_rsyslog_service_enabled_chk
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