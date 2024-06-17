#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_running_and_disk_configuration.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/06/20    Recommendation "Ensure the running and on disk configuration is the same"
# David Neilson	     07/27/22	 Updated to latest standards
# David Neilson	     12/23/22	 Updated to Ubuntu standards
ensure_running_and_disk_configuration()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
		
	ensure_running_and_disk_configuration_chk()
	{	
		l_test1=""
		
		# Ensure that all rules in /etc/audit/rules.d have been merged into /etc/audit/audit.rules
		if augenrules --check | grep -Pqs -- '^(\/usr)?\/sbin\/augenrules:\s+No\s+change'; then
      		l_test1="passed"
		fi
		
		if [ "$l_test1" = "passed" ] && [ -z "$G_REBOOT_REQUIRED" ]; then
			echo -e "- PASS:\n- audit system is the same for both disk and running configuration"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit configuration" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$l_test1" = "passed" ]; then
			echo -e "- REMEDIATE:\n- remediation required to merge disk and running audit configuration"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit configuration" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-106}"
		else
			# print the reason why we are failing
		   	echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- audit system is different between the disk and running configuration"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit configuration" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_running_and_disk_configuration_fix()
	{
		echo "- Start remediation - merging disk and running audit configurations" | tee -a "$LOG" 2>> "$ELOG"
		augenrules --load > /dev/null 2>&1
        # If the output of `auditctl -s | grep enabled is "enabled 2"`, a reboot is necessary to load the rules.  The =~ is a regex expression matching operator. 
		if [[ $(auditctl -s | grep "enabled") =~ "2" ]]; then
			G_REBOOT_REQUIRED="yes";
			echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		fi 
	}

	ensure_running_and_disk_configuration_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_running_and_disk_configuration_fix
		ensure_running_and_disk_configuration_chk
		if [ "$?" = "101" ] && [ -z "$G_REBOOT_REQUIRED" ]; then
			[ -z "$l_test" ] && l_test="remediated"
		elif [ "$l_test1" = "passed" ] && [ "$G_REBOOT_REQUIRED" = "yes" ]; then	
			[ -z "$l_test" ] && l_test="manual"
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