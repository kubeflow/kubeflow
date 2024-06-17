#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_journald_configured_write_logfiles_disk.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/22/20    Recommendation "Ensure journald is configured to write logfiles to persistent disk"
# Justin Brown       05/11/22    Updated to modern format
# 

ensure_journald_configured_write_logfiles_disk()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_journald_configured_write_logfiles_disk_chk()
   {
      echo -e "- Start check - Ensure journald is configured to write logfiles to persistent disk" | tee -a "$LOG" 2>> "$ELOG"
      
      if grep -Eq '^\s*[Ss]torage\s*=\s*persistent\b' /etc/systemd/journald.conf; then
         echo -e "- PASS:\n- /etc/systemd/journald.conf contains: $(grep -E '^\s*[Ss]torage\s*=\s*persistent\b' /etc/systemd/journald.conf)" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure journald is configured to write logfiles to persistent disk" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
      else
         if grep -Eq '^\s*(#)?\s*[Ss]torage' /etc/systemd/journald.conf; then
            echo -e "- FAIL:\n- /etc/systemd/journald.conf contains: $(grep -E '^\s*(#)?\s*[Ss]torage' /etc/systemd/journald.conf)" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure journald is configured to write logfiles to persistent disk" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
         else
            echo -e "- FAIL:\n- Storage was not found in /etc/systemd/journald.conf" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure journald is configured to write logfiles to persistent disk" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
         fi
      fi
   
   }
   
   ensure_journald_configured_write_logfiles_disk_fix()
   {
      echo -e "- Start remediation - Ensure journald is configured to write logfiles to persistent disk" | tee -a "$LOG" 2>> "$ELOG"
      
      if grep -Eq '^\s*(#)?\s*[Ss]torage' /etc/systemd/journald.conf; then
         echo -e "- Fixing Storage entry in /etc/systemd/journald.conf" | tee -a "$LOG" 2>> "$ELOG"
         sed -E -i 's/^\s*(#)?\s*[Ss]torage.*$/Storage=persistent/g' /etc/systemd/journald.conf
      else
         echo -e "- Adding Storage entry to /etc/systemd/journald.conf" | tee -a "$LOG" 2>> "$ELOG"
         echo "Storage=persistent" >> /etc/systemd/journald.conf
      fi

      echo -e "- Restarting systemd-journald" | tee -a "$LOG" 2>> "$ELOG"
      systemctl restart systemd-journald
      
      echo -e "- End remediation - Ensure journald is configured to write logfiles to persistent disk" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_journald_configured_write_logfiles_disk_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
      ensure_journald_configured_write_logfiles_disk_fix
      ensure_journald_configured_write_logfiles_disk_chk
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