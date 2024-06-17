#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_rsyslog_default_file_permissions_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/22/20    Recommendation "Ensure rsyslog default file permissions configured"
# Justin Brown       05/11/22    Updated to modern format
#

ensure_rsyslog_default_file_permissions_configured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""

   ensure_rsyslog_default_file_permissions_configured_chk()
   {
      echo -e "- Start check - Ensure rsyslog default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
      
      if grep -Eq '^\s*\$[Ff]ile[Cc]reate[Mm]ode\s+0[6420][04]0\b' /etc/rsyslog.conf /etc/rsyslog.d/*.conf; then
         echo -e "- PASS:\n- \$FileCreateMode entry found: $(grep -E '^\s*\$[Ff]ile[Cc]reate[Mm]ode\s+0[6420][04]0\b' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure rsyslog default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
      else
         if grep -Eq '^\s*(#)?\s*\$[Ff]ile[Cc]reate[Mm]ode' /etc/rsyslog.conf /etc/rsyslog.d/*.conf; then
            echo -e "- FAIL:\n- \$FileCreateMode entry found:\n- $(grep -E '^\s*(#)?\s*\$[Ff]ile[Cc]reate[Mm]ode' /etc/rsyslog.conf /etc/rsyslog.d/*.conf)" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure rsyslog default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
         else
            echo -e "- FAIL:\n- \$FileCreateMode was NOT found in /etc/rsyslog.conf or /etc/rsyslog.d/*.conf" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure rsyslog default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
         fi
      fi
      
   }
   
   ensure_rsyslog_default_file_permissions_configured_fix()
   {
      echo -e "- Start remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
      
      if grep -Eq '^\s*(#)?\s*\$[Ff]ile[Cc]reate[Mm]ode' /etc/rsyslog.conf /etc/rsyslog.d/*.conf; then
         for l_file in $(grep -E '^\s*(#)?\s*\$[Ff]ile[Cc]reate[Mm]ode' /etc/rsyslog.conf /etc/rsyslog.d/*.conf | awk -F: '{print $1}'); do
            echo -e "- Fixing \$FileCreateMode entry in $l_file" | tee -a "$LOG" 2>> "$ELOG"
            sed -E -i 's/^\s*(#)?\s*\$[Ff]ile[Cc]reate[Mm]ode.*$/$FileCreateMode 0640/g' $l_file
         done
      else
         echo -e "- Adding \$FileCreateMode entry in /etc/rsyslog.conf" | tee -a "$LOG" 2>> "$ELOG"
         if grep -Eq '^\s*\#+\s*GLOBAL DIRECTIVES' /etc/rsyslog.conf; then
            sed -E -i '/^\s*\#+\s*GLOBAL DIRECTIVES/a $FileCreateMode 0640' /etc/rsyslog.conf
         else
            echo "$FileCreateMode 0640" >> /etc/rsyslog.conf
         fi
      fi
      
      echo -e "- End remediation - Ensure rsyslog is installed" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_rsyslog_default_file_permissions_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
      ensure_rsyslog_default_file_permissions_configured_fix
      ensure_rsyslog_default_file_permissions_configured_chk
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