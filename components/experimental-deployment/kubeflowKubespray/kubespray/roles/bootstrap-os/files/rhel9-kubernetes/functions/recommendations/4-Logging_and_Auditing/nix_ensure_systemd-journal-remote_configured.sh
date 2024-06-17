#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_systemd-journal-remote_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/22/22    Recommendation "Ensure systemd-journal-remote is configured"
# 

ensure_systemd-journal-remote_configured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_systemd-journal-remote_configured_chk()
   {
        echo -e "- Start check - Ensure systemd-journal-remote is configured" | tee -a "$LOG" 2>> "$ELOG"
        
        echo -e "- Currently configured settings are:\n$(grep -P "^\s*URL=|^\s*ServerKeyFile=|^\s*ServerCertificateFile=|^\s*TrustedCertificateFile=" /etc/systemd/journal-upload.conf)" | tee -a "$LOG" 2>> "$ELOG"
        
        echo -e "- End check - Ensure systemd-journal-remote is configured" | tee -a "$LOG" 2>> "$ELOG"
        return "${XCCDF_RESULT_FAIL:-102}"
   }
   
   ensure_systemd-journal-remote_configured_fix()
   {
        echo -e "- Start remediation - Ensure systemd-journal-remote is configured" | tee -a "$LOG" 2>> "$ELOG"
      
        echo -e "- Edit the /etc/systemd/journal-upload.conf file and ensure the following lines are set per your environment:" | tee -a "$LOG" 2>> "$ELOG"
        echo -e "  URL=192.168.50.42\n  ServerKeyFile=/etc/ssl/private/journal-upload.pem\n  ServerCertificateFile=/etc/ssl/certs/journal-upload.pem\n  TrustedCertificateFile=/etc/ssl/ca/trusted.pem" | tee -a "$LOG" 2>> "$ELOG"
        echo -e "- Restart the service:\n  # systemctl restart systemd-journal-upload" | tee -a "$LOG" 2>> "$ELOG"
        l_test="manual"
      
        echo -e "- End remediation - Ensure systemd-journal-remote is configured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_systemd-journal-remote_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        ensure_systemd-journal-remote_configured_fix
        if [ "$l_test" != "manual" ]; then
            ensure_systemd-journal-remote_configured_chk
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