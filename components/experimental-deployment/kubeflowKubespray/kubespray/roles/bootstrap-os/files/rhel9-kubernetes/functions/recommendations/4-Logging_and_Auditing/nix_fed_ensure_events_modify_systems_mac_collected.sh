#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_events_modify_systems_mac_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/05/20    Recommendation "Ensure events that modify the system's Mandatory Access Controls are collected"
# David Neilson	     08/17/22	 Updated to latest standards
fed_ensure_events_modify_systems_mac_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	fed_ensure_events_modify_systems_mac_collected_chk()
	{
		l_test1=""
		l_test2=""
		l_test1a=""
		l_test2a=""
		l_test3=""
		
		# Run these commands and verify the appropriate strings are in /etc/audit/rules.d/*.rules file, and is also part of the output of auditctl -l.
		if grep -Eqs '^\s*-w\s+\/etc\/selinux\/?\s+-p\s+wa\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules; then
        		l_test1="passed"
		fi

		if auditctl -l | grep -Eqs '^\s*-w\s+\/etc\/selinux\/?\s+-p\s+wa\s+-k\s+\S+\b'; then
			l_test1a="passed"
		fi

		if grep -Eqs '^\s*-w\s+\/usr\/share/selinux\/?\s+-p\s+wa\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules; then
			l_test2="passed"
		fi

		if auditctl -l | grep -Eqs '^\s*-w\s+\/usr\/share/selinux\/?\s+-p\s+wa\s+-k\s+\S+\b'; then		
			l_test2a="passed"
		fi
		
		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" ] && [ "$l_test1a" = "passed" -a "$l_test2a" = "passed" ]; then
			echo -e "- PASS:\n- ensure events that modify the system's Mandatory Access Controls are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - Mandatory Access Controls are collected" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$l_test1" = "passed" -a "$l_test2" = "passed" ]; then
			l_test3="failed"
			echo -e "- MANUAL:\n- Reboot required to ensure events that modify the system's Mandatory Access Controls are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - Mandatory Access Controls" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-106}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- events that modify the system's Mandatory Access Controls are NOT being properly collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - Mandatory Access Controls" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi		
	}

	fed_ensure_events_modify_systems_mac_collected_fix()
	{
		echo "- Start remediation - ensure events that modify the system's Mandatory Access Controls are being collected" | tee -a "$LOG" 2>> "$ELOG"

		# The empty IF statements below are in case there is a situation where the files are set correctly but the output of auditctl is not.  In such a case, a reboot is still required.
		if ! grep -Eqs '^\s*-w\s+\/etc\/selinux\/?\s+-p\s+wa\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules; then
			echo "-w /etc/selinux/ -p wa -k MAC-policy" >> /etc/audit/rules.d/50-MAC_policy.rules
		fi
		
		if ! grep -Eqs '^\s*-w\s+\/usr\/share/selinux\/?\s+-p\s+wa\s+-k\s+\S+\b' /etc/audit/rules.d/*.rules; then
			echo "-w /usr/share/selinux/ -p wa -k MAC-policy" >> /etc/audit/rules.d/50-MAC_policy.rules
		fi
		
		echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"			
	}

	fed_ensure_events_modify_systems_mac_collected_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	elif [ "$l_test3" = "failed" ]; then
		G_REBOOT_REQUIRED="yes"			
		l_test="manual"
	else
		fed_ensure_events_modify_systems_mac_collected_fix
		[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
		fed_ensure_events_modify_systems_mac_collected_chk
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