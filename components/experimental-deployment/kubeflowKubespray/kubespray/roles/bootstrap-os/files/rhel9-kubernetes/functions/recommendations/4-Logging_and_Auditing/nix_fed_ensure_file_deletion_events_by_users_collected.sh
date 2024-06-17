#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_file_deletion_events_by_users_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/06/20    Recommendation "Ensure file deletion events by users are collected"
# David Neilson	     09/02/22	 Updated to current standards
# David Neilson	     09/14/22    Made minor syntax changes
# David Neilson  	 03/17/23	 auditctl -l was checking for b64 in the 32 bit section
fed_ensure_file_deletion_events_by_users_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	# Check if system is 32 or 64 bit
	arch | grep -q "x86_64" && l_sysarch=b64 || l_sysarch=b32	

	# Check UID_MIN for the system
	l_umin=$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)
	
	fed_ensure_file_deletion_events_by_users_collected_chk()
	{
		l_test1=""
		l_test1a=""
		l_test2=""
		l_test2a=""
		l_test3=""

		# For 64-bit architectures
		if [ "$l_sysarch" = "b64" ]; then
			# Check rule "-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k {key name}"
			if grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b64\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules || grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b64\s+-S\s+(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-F\s+key=\S+\b' /etc/audit/rules.d/*.rules ; then
				l_test1="passed"
			fi
			if auditctl -l | grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b64\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' || auditctl -l | grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b64\s+-S\s+(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-F\s+key=\S+\b'; then
				l_test1a="passed"
			fi
		fi

		# Check rule "-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k {key name}"
		if grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b32\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules || grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b32\s+-S\s+(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-F\s+key=\S+\b' /etc/audit/rules.d/*.rules; then
			l_test2="passed"
		fi
		if auditctl -l | grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b32\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' || auditctl -l | grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b32\s+-S\s+(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-F\s+key=\S+\b'; then
			l_test2a="passed"
		fi

		if [ "$l_sysarch" = "b64" ]; then
			if [ "$l_test1" = "passed" -a "$l_test2" = "passed" ] && [ "$l_test1a" = "passed" -a "$l_test2a" = "passed" ]; then
				echo -e "- PASS:\n- ensure file deletion events by user are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   		echo "- End check - file deletion events" | tee -a "$LOG" 2>> "$ELOG"
		   		return "${XCCDF_RESULT_PASS:-101}"
			elif [ "$l_test1" = "passed" -a "$l_test2" = "passed" ]; then
				l_test3="failed"
				echo -e "- MANUAL:\n- Reboot required to ensure file deletion events by user are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   		echo "- End check - file deletion events" | tee -a "$LOG" 2>> "$ELOG"
		   		return "${XCCDF_RESULT_PASS:-106}"
			else
				echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
				echo "- file deletion events by user are NOT being collected"  | tee -a "$LOG" 2>> "$ELOG"
		   		echo "- End check - file deletion events" | tee -a "$LOG" 2>> "$ELOG"
		   		return "${XCCDF_RESULT_FAIL:-102}"
			fi
		else
			if [ "$l_test2" = "passed" ] && [ "$l_test2a" = "passed" ]; then
				echo -e "- PASS:\n- ensure file deletion events by user are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   		echo "- End check - file deletion events" | tee -a "$LOG" 2>> "$ELOG"
		   		return "${XCCDF_RESULT_PASS:-101}"
			elif [ "$l_test2" = "passed" ]; then
				l_test3="failed"
				echo -e "- MANUAL:\n- Reboot required to ensure file deletion events by user are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   		echo "- End check - file deletion events" | tee -a "$LOG" 2>> "$ELOG"
		   		return "${XCCDF_RESULT_PASS:-106}"
			else
				echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
				echo "- file deletion events by user are NOT being collected"  | tee -a "$LOG" 2>> "$ELOG"
		   		echo "- End check - file deletion events" | tee -a "$LOG" 2>> "$ELOG"
		   		return "${XCCDF_RESULT_FAIL:-102}"
			fi
		fi
	}

	fed_ensure_file_deletion_events_by_users_collected_fix()
	{
		echo "- Start remediation - ensure file deletion events by user are collected" | tee -a "$LOG" 2>> "$ELOG"

		if [ "$l_sysarch" = "b64" ]; then	
			if ! grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b64\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules && ! grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b64\s+-S\s+(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-F\s+key=\S+\b' /etc/audit/rules.d/*.rules; then
				echo "-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=$l_umin -F auid!=4294967295 -k delete" >> /etc/audit/rules.d/50-deletion.rules
			fi
		fi

		if ! grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b32\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-S\s+(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules && ! grep -Eqs '^-a\s+(always,exit|exit,always)\s+-F\s+arch=b32\s+-S\s+(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat),(unlink|unlinkat|rename|renameat)\s+-F\s+auid>=1000\s+-F\s+auid!=(unset|-1|4294967295)\s+-F\s+key=\S+\b' /etc/audit/rules.d/*.rules; then
				echo "-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=$l_umin -F auid!=4294967295 -k delete" >> /etc/audit/rules.d/50-deletion.rules
			fi

		echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"			
	}

	fed_ensure_file_deletion_events_by_users_collected_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	elif [ "$l_test3" = "failed" ]; then
		G_REBOOT_REQUIRED="yes"			
		l_test="manual"
	else
		fed_ensure_file_deletion_events_by_users_collected_fix
		[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
		fed_ensure_file_deletion_events_by_users_collected_chk
		if [ "$?" = "102" ]; then
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