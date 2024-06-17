#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_events_modify_user_group_information_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/05/20    Recommendation "Ensure events that modify user/group information are collected"
# David Neilson	     08/24/22	 Updated to current standards
# David Neilson	     01/10/23	 Updated to Ubuntu benchmarks
ensure_events_modify_user_group_information_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_events_modify_user_group_information_collected_chk()
	{
		l_test1=""
		l_test2=""
		l_test3=""
		l_test4=""
		l_test5=""
		l_test1=""
		l_test2=""
		l_test3=""
		l_test4=""
		l_test5=""
		
		# Check rule "-w /etc/group -p wa -k identity"
		if grep -Pqs -- '^\h*-w\h+\/etc\/group\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			l_test1="passed"
		fi
		
		if auditctl -l | grep -Pqs -- '^\h*-w\h+\/etc\/group\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b'; then
			l_test1a="passed"
		fi

		# Check rule "-w /etc/passwd -p wa -k identity"
		if grep -Pqs -- '^\h*-w\h+\/etc\/passwd\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			l_test2="passed"
		fi

		if auditctl -l | grep -Pqs -- '^\h*-w\h+\/etc\/passwd\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b'; then
			l_test2a="passed"
		fi

		# Check rule "-w /etc/gshadow -p wa -k identity"
		if grep -Pqs -- '^\h*-w\h+\/etc\/gshadow\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			l_test3="passed"
		fi

		if auditctl -l | grep -Pqs -- '^\h*-w\h+\/etc\/gshadow\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b'; then
			l_test3a="passed"
		fi

		# Check rule "-w /etc/shadow -p wa -k identity"
		if grep -Pqs -- '^\h*-w\h+\/etc\/shadow\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			l_test4="passed"
		fi

		if auditctl -l | grep -Pqs -- '^\h*-w\h+\/etc\/shadow\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b'; then
			l_test4a="passed"
		fi

		# Check rule "-w /etc/security/opasswd -p wa -k identity"
		if grep -Pqs -- '^\h*-w\h+\/etc\/security\/opasswd\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			l_test5="passed"
		fi
	
		if auditctl -l | grep -Pqs -- '^\h*-w\h+\/etc\/security\/opasswd\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b'; then
			l_test5a="passed"
		fi

		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" -a "$l_test3" = "passed" -a "$l_test4" = "passed" -a "$l_test5" = "passed" ] && [ "$l_test1a" = "passed" -a "$l_test2a" = "passed" -a "$l_test3a" = "passed" -a "$l_test4a" = "passed" -a "$l_test5a" = "passed" ]; then
			echo -e "- PASS:\n- ensure events that modify user/group information are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - user/group information collected" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$l_test1" = "passed" -a "$l_test2" = "passed" -a "$l_test3" = "passed" -a "$l_test4" = "passed" -a "$l_test5" = "passed" ]; then
			echo -e "- REMEDIATE:\n- Remediation required to ensure events that modify user/group information are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - user/group information collected" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-106}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- events that modify user/group information are NOT being properly collected"  | tee -a "$LOG" 2>> "$ELOG"
		 	echo "- End check - user/group information" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_events_modify_user_group_information_collected_fix()
	{
		echo "- Start remediation - ensure events that modify user/group information are being collected" | tee -a "$LOG" 2>> "$ELOG"

		# Check and fix rule "-w /etc/group -p wa -k identity"
		if ! grep -Pqs -- '^\h*-w\h+\/etc\/group\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			if grep -Pqs -- '^(#+|\h*)\h*-w\h+\/etc\/group(\h+|$)' /etc/audit/rules.d/*.rules; then
                sed -ri 's/^(#+|\s*)\s*?(-w\s+\/etc\/group( |$))(.*)$/\2 -p wa -k identity/' /etc/audit/rules.d/50-identity.rules
			else
				echo "-w /etc/group -p wa -k identity" >> /etc/audit/rules.d/50-identity.rules
			fi
		fi

		# Check and fix rule "-w /etc/passwd -p wa -k identity"
		if ! grep -Pqs -- '^\h*-w\h+\/etc\/passwd\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			if grep -Pqs -- '^(#+|\h*)\h*-w\h+\/etc\/passwd(\h+|$)' /etc/audit/rules.d/*.rules; then
                sed -ri 's/^(#+|\s*)\s*?(-w\s+\/etc\/passwd( |$))(.*)$/\2 -p wa -k identity/' /etc/audit/rules.d/50-identity.rules
			else
				echo "-w /etc/passwd -p wa -k identity" >> /etc/audit/rules.d/50-identity.rules
			fi
		fi

		# Check and fix rule "-w /etc/gshadow -p wa -k identity"
		if ! grep -Pqs -- '^\h*-w\h+\/etc\/gshadow\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			if grep -Pqs -- '^(#+|\h*)\h*-w\h+\/etc\/gshadow(\h+|$)' /etc/audit/rules.d/*.rules; then
                sed -ri 's/^(#+|\s*)\s*?(-w\s+\/etc\/gshadow( |$))(.*)$/\2 -p wa -k identity/' /etc/audit/rules.d/50-identity.rules
			else
				echo "-w /etc/gshadow -p wa -k identity" >> /etc/audit/rules.d/50-identity.rules
			fi
		fi

		# Check and fix rule "-w /etc/shadow -p wa -k identity"
		if ! grep -Pqs -- '^\h*-w\h+\/etc\/shadow\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			if grep -Pqs -- '^(#+|\h*)\h*-w\h+\/etc\/shadow(\h+|$)' /etc/audit/rules.d/*.rules; then
                sed -ri 's/^(#+|\s*)\s*?(-w\s+\/etc\/shadow( |$))(.*)$/\2 -p wa -k identity/' /etc/audit/rules.d/50-identity.rules
			else
				echo "-w /etc/shadow -p wa -k identity" >> /etc/audit/rules.d/50-identity.rules
			fi
		fi

		# Check and fix rule "-w /etc/security/opasswd -p wa -k identity"
		if ! grep -Pqs -- '^\h*-w\h+\/etc\/security\/opasswd\h+-p\h+wa\h+(-k\h+\S+|-F\h+key=\S+)\b' /etc/audit/rules.d/*.rules; then
			if grep -Pqs -- '^(#+|\h*)\h*-w\h+\/etc\/security\/opasswd(\h+|$)' /etc/audit/rules.d/*.rules; then
                sed -ri 's/^(#+|\s*)\s*?(-w\s+\/etc\/security\/opasswd( |$))(.*)$/\2 -p wa -k identity/' /etc/audit/rules.d/50-identity.rules
			else	
				echo "-w /etc/security/opasswd -p wa -k identity" >> /etc/audit/rules.d/50-identity.rules
			fi
		fi

		if [[ $(auditctl -s | grep "enabled") =~ "2" ]]; then
			G_REBOOT_REQUIRED="yes";
			echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		else 
			augenrules --load > /dev/null 2>&1
		fi 	
	}

	ensure_events_modify_user_group_information_collected_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_events_modify_user_group_information_collected_fix
		ensure_events_modify_user_group_information_collected_chk
		if [ "$?" = "101" -a -z "$G_REBOOT_REQUIRED" ]; then
			[ -z "$l_test" ] && l_test="remediated"
		elif [ "$l_test1" = "passed" -a "$l_test2" = "passed" -a "$l_test3" = "passed" -a "$l_test4" = "passed" -a "$l_test5" = "passed" -a "$G_REBOOT_REQUIRED" = "yes" ]; then
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