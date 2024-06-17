#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_nonempty_pw_fields.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/25/20    Recommendation "Ensure password fields are not empty"
# David Neilson	   04/18/22	  	Update to modern format
# Justin Brown			09/08/22		Small syntax changes

nonempty_pw_field()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_status=""

	nonempty_pw_field_chk()
	{
		# Checks for accounts with an empty password field in /etc/shadow
		echo "- Start check - looking for empty password fields in /etc/shadow" | tee -a "$LOG" 2>> "$ELOG"
		l_status=$(awk -F: '($2 == "" ) { print $1 " does not have a password "}' /etc/shadow)
		
		# If $l_status is empty, all accounts have a password, and we pass
		if [ -z "$l_status" ]; then
			echo -e "- PASS:\n- all accounts in /etc/shadow have passwords"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - /etc/shadow" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
		   	echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - /etc/shadow has account(s) with an empty password field" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	nonempty_pw_field_fix()
	{
		echo "- Start remediation - locking accounts in /etc/shadow that have empty password fields" | tee -a "$LOG" 2>> "$ELOG"
		if [ -n "$l_status" ]; then
			for l_user in $(awk -F: '($2 == "" ) { print $1 }' /etc/shadow); do
	 			passwd -l $l_user
			done
		fi
	}

	nonempty_pw_field_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		nonempty_pw_field_fix
		nonempty_pw_field_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="remediated"
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