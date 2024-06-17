#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_sudo_logfile_exists.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/15/20    Recommendation "Ensure sudo log file exists"
# Justin Brown		 04/26/22    Update to modern format.
#
   
ensure_sudo_logfile_exists()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	
	test=""
	
	ensure_sudo_logfile_exists_chk()
	{
		echo "- Start check - Ensure sudo log file exists" | tee -a "$LOG" 2>> "$ELOG"
		
		if grep -Eisq '^\s*Defaults\s+([^#;]+,\s*)?logfile\s*=\s*(")?[^#;]+(")?' /etc/sudoers /etc/sudoers.d/*; then
			echo -e "- PASS:" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- sudo logfile configuration found:\n- $(grep -Ei '^\s*Defaults\s+([^#;]+,\s*)?logfile\s*=\s*(")?[^#;]+(")?' /etc/sudoers /etc/sudoers.d/*)" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure sudo log file exists" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- sudo logfile configuration NOT found." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure sudo log file exists" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_sudo_logfile_exists_fix()
	{
		echo -e "- Start remediation - Ensure sudo log file exists." | tee -a "$LOG" 2>> "$ELOG"
		
		for file in /etc/sudoers /etc/sudoers.d/*; do
			if grep -Esq '^(\s*Defaults\s+(?:[^#]+(?:,|\s+))?)(!logfile=\S+)((,|\s+).*)?$' "$file"; then
				sed -ri 's/^(\s*Defaults\s+([^#]+(,|\s+))?)(!logfile=\S+)((,|\s+).*)?$/\1logfile=\S+\5/' "$file"
			fi
		done
		! grep -Eisq '^\s*Defaults\s+([^#]+,\s*)?logfile=\S+' /etc/sudoers /etc/sudoers.d/* && echo "Defaults logfile=\"/var/log/sudo.log\"" >> /etc/sudoers.d/cis_sudoers.conf
		echo -e "- Inserting logfile=\"/var/log/sudo.log\" into /etc/sudoers.d/cis_sudoers.conf" | tee -a "$LOG" 2>> "$ELOG"
		grep -Eisq '^\s*Defaults\s+([^#;]+,\s*)?logfile\s*=\s*(")?[^#;]+(")?' /etc/sudoers /etc/sudoers.d/* && test=remediated
		
		echo -e "- End remediation - Ensure sudo log file exists." | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_sudo_logfile_exists_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_sudo_logfile_exists_fix
		ensure_sudo_logfile_exists_chk
		if [ "$?" = "101" ]; then
			[ "$test" != "failed" ] && test="remediated"
		fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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