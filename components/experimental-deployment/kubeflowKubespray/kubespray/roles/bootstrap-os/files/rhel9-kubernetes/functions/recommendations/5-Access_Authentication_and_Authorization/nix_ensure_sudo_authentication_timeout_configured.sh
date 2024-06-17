#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_sudo_authentication_timeout_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/26/22    Recommendation "Ensure sudo authentication timeout is configured correctly"
#
   
ensure_sudo_authentication_timeout_configured()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_sudo_authentication_timeout_configured_chk()
	{
		echo "- Start check - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
		
		if grep -Pq "^[^#]?Defaults\s+.*timestamp_timeout\s*=" /etc/sudoers /etc/sudoers.d/*; then
            if grep -Pq "^[^#]?Defaults\s+.*timestamp_timeout\s*=(-1|1[6-9]|[2-9][0-9]|[1-9][0-9]{2,})\b" /etc/sudoers /etc/sudoers.d/*; then
                echo -e "- FAILED:" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- sudo authentication timeout configuration found:\n- $(grep -P "^[^#]?Defaults\s+.*timestamp_timeout\s*=(-1|1[6-9]|[2-9][0-9]|[1-9][0-9]{2,})\b" /etc/sudoers /etc/sudoers.d/*)" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- End check - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_PASS:-102}"
            else
                echo -e "- PASSED:\n- sudo authentication timeout configuration configured correctly" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- End check - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_FAIL:-101}"
            fi
        else
            if  sudo -V | grep "Authentication timestamp timeout:\s*(-1|1[6-9]|[2-9][0-9]|[1-9][0-9]{2,})"; then
                echo -e "- FAILED:" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- sudo authentication timeout configuration found:\n- $(sudo -V | grep "Authentication timestamp timeout:\s*(-1|1[6-9]|[2-9][0-9]|[1-9][0-9]{2,})")" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- End check - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_PASS:-102}"
            else
                echo -e "- PASSED:\n- sudo authentication timeout configuration configured correctly" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- End check - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_FAIL:-101}"
            fi
        fi
	}
	
	ensure_sudo_authentication_timeout_configured_fix()
	{
		echo -e "- Start remediation - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
		
		echo -e "- Setting timestamp_timeout to 15 in /etc/sudoers" | tee -a "$LOG" 2>> "$ELOG"
		if grep -Piq '^[^#]?Defaults\s+.*timestamp_timeout\s*=' /etc/sudoers; then
			echo -e "- Updatinging timestamp_timeout to 15 in /etc/sudoers" | tee -a "$LOG" 2>> "$ELOG"
			sed -ri 's/^\s*(#\s*)?(Defaults\s+.*timestamp_timeout\s*=)(\s*\S+\s*)(\s*#.*)?$/\215\4/' /etc/sudoers
		else
			echo -e "- Adding timestamp_timeout=15 to /etc/sudoers" | tee -a "$LOG" 2>> "$ELOG"
			echo "Defaults    timestamp_timeout=15" >> /etc/sudoers
		fi

		echo -e "- End remediation - Ensure sudo authentication timeout is configured correctly" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_sudo_authentication_timeout_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_sudo_authentication_timeout_configured_fix
        if [ "$l_test" != "manual" ]; then
            ensure_sudo_authentication_timeout_configured_chk
            if [ "$?" = "101" ]; then
                [ "$l_test" != "failed" ] && l_test="remediated"
			else
				l_test="failed"
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