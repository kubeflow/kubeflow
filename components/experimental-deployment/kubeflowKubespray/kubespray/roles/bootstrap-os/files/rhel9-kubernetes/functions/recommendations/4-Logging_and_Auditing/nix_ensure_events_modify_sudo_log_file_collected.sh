#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_events_modify_sudo_log_file_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/01/20    Recommendation "Ensure events that modify the sudo log file are collected"
# David Neilson	     09/02/22 	 Update to current standards
# David Neilson	     09/24/22	 minor syntax change
# David Neilson      01/05/23    Created for Ubuntu.
ensure_events_modify_sudo_log_file_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
    # If the log file doesn't exist, the variable below will be a single space (so [ -z variable ] will be false).
    l_sudo_log_file_escaped=$(grep -r logfile /etc/sudoers* | sed -e 's/.*logfile=//;s/,? .*//' -e 's/"//g' -e 's|/|\\/|g')
    [[ "$l_sudo_log_file_escaped" =~ [a-Z0-9] ]] || l_sudo_log_file_escaped="\/var\/log\/sudo.log"

   	ensure_events_modify_sudo_log_file_collected_chk()
	{
		
		l_test1=""
		l_test2=""
	
		# Check rules file for a string similar to "-w /var/log/sudo.log -p wa -k {key name}" 
		if grep -Pqs -- "^\h*-w\h+$l_sudo_log_file_escaped\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b" /etc/audit/rules.d/*.rules ;then
		   	l_test1="passed"
		fi

		# Check output of the command "auditctl -l"  for a string similar to "-w /var/log/sudo.log -p wa -k {key name}"
		if auditctl -l | grep -Pqs -- "^\h*-w\h+$l_sudo_log_file_escaped\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b"; then	
			l_test2="passed"
		fi

		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" ]; then
			echo -e "- PASS:\n- ensure events that modify the sudo log file are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - sudo log file" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		# If this case the output of "auditctl -l" is not correct, because $l_test2 != "passed"
		elif [ "$l_test1" = "passed" ]; then
			echo -e "- REMEDIATE:\n- Remediation required to ensure events that modify the sudo log file are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - sudo log file" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-106}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- events that modify the sudo log file are NOT being collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - sudo log file" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi		
	}

	ensure_events_modify_sudo_log_file_collected_fix()
	{
		echo "- Start remediation - ensure events that modify the sudo log file are collected" | tee -a "$LOG" 2>> "$ELOG"

		if ! grep -Pqs -- "^\h*-w\h+$l_sudo_log_file_escaped\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b" /etc/audit/rules.d/*.rules; then
		    if grep -Pqs -- "^(#+|\h*)\h*-w\h+$l_sudo_log_file_escaped(\h+|$)" /etc/audit/rules.d/*.rules; then
                sed -ri "s/^(#+|\s*)\s*?(-w\s+$l_sudo_log_file_escaped( |$))(.*)$/\2 -p wa -k sudo_log_file/" /etc/audit/rules.d/50-sudo.rules
            else
                l_sudo_log_file=$(echo $l_sudo_log_file_escaped | sed 's/\\//g')
               	echo "-w $l_sudo_log_file -p wa -k sudo_log_file" >> /etc/audit/rules.d/50-sudo.rules
			fi
        fi

        if [[ $(auditctl -s | grep "enabled") =~ "2" ]]; then
			G_REBOOT_REQUIRED="yes";
			echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		else 
			augenrules --load > /dev/null 2>&1
		fi 
							
	}

	ensure_events_modify_sudo_log_file_collected_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_events_modify_sudo_log_file_collected_fix
		ensure_events_modify_sudo_log_file_collected_chk
		if [ "$?" = "101" -a -z "$G_REBOOT_REQUIRED" ]; then
			[ -z "$l_test" ] && l_test="remediated"
		elif [ "$l_test1" = "passed" -a "$G_REBOOT_REQUIRED" = "yes" ]; then
			l_test="manual"
		else
			l_test="failed" 
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