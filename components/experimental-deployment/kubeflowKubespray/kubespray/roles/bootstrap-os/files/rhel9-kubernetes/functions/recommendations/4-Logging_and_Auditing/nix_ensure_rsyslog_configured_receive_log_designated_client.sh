#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_rsyslog_configured_receive_log_designated_client.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Ensure remote rsyslog messages are only accepted on designated log hosts"
# Justin Brown       05/11/22    Updated to modern format. Added passing criteria.
#
 
ensure_rsyslog_configured_receive_log_designated_client()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_rsyslog_configured_receive_log_designated_client_chk()
   {
      l_output="" l_test1="" l_test2="" l_test3="" l_test4=""
      
      echo -e "- Start check - Ensure remote rsyslog messages are only accepted on designated log hosts" | tee -a "$LOG" 2>> "$ELOG"
   
      if grep -Pq '^\s*\$ModLoad imtcp' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
         l_output="$l_output\n- \$ModLoad imtcp was found in:\n$(grep -P '^\s*\$ModLoad imtcp' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)"
      else
         l_test1=passed
         l_output="$l_output\n- \$ModLoad imtcp was NOT found in /etc/rsyslog.conf or /etc/rsyslog.d/*.conf"
      fi
      
      if grep -Pq '^\s*\$InputTCPServerRun' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
         l_output="$l_output\n- \$InputTCPServerRun was found in:\n$(grep -P '^\s*\$InputTCPServerRun' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)"
      else
         l_test2=passed
         l_output="$l_output\n- \$InputTCPServerRun was NOT found in /etc/rsyslog.conf or /etc/rsyslog.d/*.conf"
      fi

      if grep -Pq '^\s*module\(load=\"imtcp\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
         l_output="$l_output\n- 'module(load=\"imtcp\")' was found in:\n$(grep -P '^\s*module\(load=\"imtcp\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)"
      else
         l_test3=passed
         l_output="$l_output\n- 'module(load=\"imtcp\")' was NOT found in /etc/rsyslog.conf or /etc/rsyslog.d/*.conf"
      fi
      
      if grep -Pq '^\s*input\(type=\"imtcp\" port=\"514\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
         l_output="$l_output\n- 'input(type=\"imtcp\" port=\"514\")' was found in:\n$(grep -P '^\s*input\(type=\"imtcp\" port=\"514\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)"
      else
         l_test4=passed
         l_output="$l_output\n- 'input(type=\"imtcp\" port=\"514\")' was NOT found in /etc/rsyslog.conf or /etc/rsyslog.d/*.conf"
      fi
      
      if [ "$l_test1" = passed ] && [ "$l_test2" = passed ] && [ "$l_test3" = passed ] && [ "$l_test4" = passed ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure remote rsyslog messages are only accepted on designated log hosts" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure remote rsyslog messages are only accepted on designated log hosts" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi   
   }
   
   ensure_rsyslog_configured_receive_log_designated_client_fix()
   {
      echo -e "- Start remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
      
      if [ "$l_test1" != "passed" ]; then
         if grep -Pq '\$ModLoad imtcp' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
            for l_file in $(grep '^\s*\$ModLoad imtcp' /etc/rsyslog.conf /etc/rsyslog.d/*.conf | awk -F: '{print $1}'); do
               echo -e "- Commenting out \$ModLoad imtcp from $l_file" | tee -a "$LOG" 2>> "$ELOG"
               sed -E -i 's/^\s*\$ModLoad imtcp/# $ModLoad imtcp/g' $l_file
            done
         fi
      fi
      
      if [ "$l_test2" != "passed" ]; then
         if grep -Pq '\$InputTCPServerRun' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
            for l_file in $(grep '^\s*\$InputTCPServerRun' /etc/rsyslog.conf /etc/rsyslog.d/*.conf | awk -F: '{print $1}'); do
               echo -e "- Commenting out \$InputTCPServerRun imtcp from $l_file" | tee -a "$LOG" 2>> "$ELOG"
               sed -E -i 's/^\s*\$InputTCPServerRun/# $InputTCPServerRun/g' $l_file
            done
         fi
      fi

      if [ "$l_test3" != "passed" ]; then
         if grep -Pq '^\s*module\(load=\"imtcp\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
            for l_file in $(grep -P '^\s*module\(load=\"imtcp\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf | awk -F: '{print $1}'); do
               echo -e "- Commenting out 'module(load=\"imtcp\")' from $l_file" | tee -a "$LOG" 2>> "$ELOG"
               sed -E -i 's/^\s*module\(load=\"imtcp\"\)/# module(load="imtcp")/g' $l_file
            done
         fi
      fi

      if [ "$l_test4" != "passed" ]; then   
         if grep -Pq '^\s*input\(type=\"imtcp\" port=\"514\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf 1>>/dev/null; then
            for l_file in $(grep -P '^\s*input\(type=\"imtcp\" port=\"514\"\)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf | awk -F: '{print $1}'); do
               echo -e "- Commenting out 'input(type=\"imtcp\" port=\"514\")' from $l_file" | tee -a "$LOG" 2>> "$ELOG"
               sed -E -i 's/^\s*input\(type=\"imtcp\" port=\"514\"\)/# input(type="imtcp" port="514")/g' $l_file
            done
         fi
      fi
      
      echo -e "- End remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_rsyslog_configured_receive_log_designated_client_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
      ensure_rsyslog_configured_receive_log_designated_client_fix
      if [ "$l_test" != "manual" ]; then
         ensure_rsyslog_configured_receive_log_designated_client_chk
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