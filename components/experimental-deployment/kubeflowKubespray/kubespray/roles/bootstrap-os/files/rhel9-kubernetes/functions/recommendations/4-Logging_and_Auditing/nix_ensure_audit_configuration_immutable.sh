#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_audit_configuration_immutable.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/06/20    Recommendation "Ensure the audit configuration is immutable"
# David Neilson	     07/27/22	 Updated to latest standards
# David Neilson	     12/23/22	 Updated to Ubuntu standards
ensure_audit_configuration_immutable()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
		
	ensure_audit_configuration_immutable_chk()
	{	
		l_test1=""
		# Create the l_output variable because there may be more than one space between the "-e" and "2".  
		l_output=$(grep -Ph -- '^\h*-e\h+2\b' /etc/audit/rules.d/*.rules | tail -1)

		# Determine if the string "-e\h+2" is on the last line of a file in /etc/audit/rules.d/*.rules
		if echo "$l_output" | grep -Ph -- '^\h*-e\h+2\b'; then
      		l_test1="passed"
		fi
		
		if [ "$l_test1" = "passed" -a -z "$G_REBOOT_REQUIRED" ]; then
			echo -e "- PASS:\n- audit configuration is immutable"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit configuration" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$l_test1" = "passed" ]; then
			echo -e "- REMEDIATE:\n- remediation required to set audit configuration to immutable"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit configuration" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-106}"
		else
			# print the reason why we are failing
		   	echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- audit configuration is NOT immutable"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - audit configuration" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_audit_configuration_immutable_fix()
	{
		echo "- Start remediation - edit or create file /etc/audit/99-finalize.rules" | tee -a "$LOG" 2>> "$ELOG"
		echo "-e 2" >> /etc/audit/rules.d/99-finalize.rules
		# If the output of `auditctl -s | grep enabled is "enabled 2"`, a reboot is necessary to load the rules.  The =~ is a regex expression matching operator. 
		if [[ $(auditctl -s | grep "enabled") =~ "2" ]]; then
			G_REBOOT_REQUIRED="yes";
			echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		else 
			augenrules --load > /dev/null 2>&1
		fi 
	}

	ensure_audit_configuration_immutable_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_audit_configuration_immutable_fix
		ensure_audit_configuration_immutable_chk
		if [ "$?" = "101" -a -z "$G_REBOOT_REQUIRED" ]; then
			[ -z "$l_test" ] && l_test="remediated"
		elif [ "$l_test1" = "passed" -a "$G_REBOOT_REQUIRED" = "yes" ]; then	
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