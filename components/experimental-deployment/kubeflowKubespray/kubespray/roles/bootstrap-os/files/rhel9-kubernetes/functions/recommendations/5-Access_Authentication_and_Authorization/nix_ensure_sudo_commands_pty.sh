#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_sudo_commands_pty.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/14/20    Recommendation "Ensure sudo commands use pty"
# Justin Brown		 04/26/22    Update to modern format.
#
  
ensure_sudo_commands_pty()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	
	test=""
	
	ensure_sudo_commands_pty_chk()
	{
		echo "- Start check - Ensure sudo commands use pty" | tee -a "$LOG" 2>> "$ELOG"
		
		if grep -Eisq '^\s*Defaults\s+([^#]+,\s*)?use_pty' /etc/sudoers /etc/sudoers.d/*; then
			echo -e "- PASS:" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- sudo use_pty configuration found:\n- $(grep -Ei '^\s*Defaults\s+([^#]+,\s*)?use_pty' /etc/sudoers /etc/sudoers.d/*)" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure sudo commands use pty" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- sudo use_pty configuration NOT found." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure sudo commands use pty" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_sudo_commands_pty_fix()
	{
		echo -e "- Start remediation - Ensure sudo commands use pty." | tee -a "$LOG" 2>> "$ELOG"
		
		for file in /etc/sudoers /etc/sudoers.d/*; do
			if grep -Esq '^(\s*Defaults\s+(?:[^#]+(?:,|\s+))?)(!use_pty)((,|\s+).*)?$' "$file"; then
				sed -ri 's/^(\s*Defaults\s+([^#]+(,|\s+))?)(!use_pty)((,|\s+).*)?$/\1use_pty\5/' "$file"
			fi
		done
		echo -e "- Inserting use_pty into /etc/sudoers.d/cis_sudoers.conf" | tee -a "$LOG" 2>> "$ELOG"
		! grep -Eisq '^\s*Defaults\s+([^#]+,\s*)?use_pty' /etc/sudoers /etc/sudoers.d/* && echo "Defaults use_pty" >> /etc/sudoers.d/cis_sudoers.conf && test=remediated
		
		echo -e "- End remediation - Ensure sudo commands use pty." | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_sudo_commands_pty_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_sudo_commands_pty_fix
		ensure_sudo_commands_pty_chk
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