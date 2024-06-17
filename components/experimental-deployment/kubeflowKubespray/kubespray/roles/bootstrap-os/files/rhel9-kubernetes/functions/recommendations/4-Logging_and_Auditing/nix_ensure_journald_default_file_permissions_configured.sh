#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_journald_default_file_permissions_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/22/22    Recommendation "Ensure journald default file permissions configured"
# 

ensure_journald_default_file_permissions_configured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_journald_default_file_permissions_configured_chk()
   {
        echo -e "- Start check - Ensure journald default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
        
        echo -e "- Inspect the default /usr/lib/tmpfiles.d/systemd.conf or the override file in /etc/tmpfiles.d/systemd.conf against the site specific requirements for default file permissions." | tee -a "$LOG" 2>> "$ELOG"
        echo -e "- End check - Ensure journald default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
        return "${XCCDF_RESULT_FAIL:-102}"
   }
   
   ensure_journald_default_file_permissions_configured_fix()
   {
        echo -e "- Start remediation - Ensure journald default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
      
        echo -e "- If the default configuration is not appropriate for the site specific requirements, copy /usr/lib/tmpfiles.d/systemd.conf to /etc/tmpfiles.d/systemd.conf and modify as required.\n- Requirements is either 0640 or site policy if that is less restrictive." | tee -a "$LOG" 2>> "$ELOG" && l_test="manual"
      
        echo -e "- End remediation - Ensure journald default file permissions configured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_journald_default_file_permissions_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        ensure_journald_default_file_permissions_configured_fix
        if [ "$l_test" != "manual" ]; then
            ensure_journald_default_file_permissions_configured_chk
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