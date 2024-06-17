#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_selinux_state_enforcing_or_permissive.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/30/20    Recommendation "Ensure the SELinux mode is enforcing or permissive"
# David Neilson	     06/15/22	 Updated to latest standards.
# Justin Brown       07/04/22    Changed logic to properly handle remediation
# David Neilson	     07/22/22	 Changed to either pass, or require manual remediation

fed_ensure_selinux_state_enforcing_or_permissive()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	fed_ensure_selinux_state_enforcing_or_permissive_chk()
	{
		l_test1=""
		l_test2=""		

		# We don't determine if the output of getenforce is "Enforcing" or "Permissive", and if the string "SELINUX=enforcing|permissive" is in the file /etc/selinux/config using the following command:
		# 	if getenforce | grep -Eqs '(Enforcing|Permissive)' &&  grep -Eiqs '^\s*SELINUX=(enforcing|permissive)\b' /etc/selinux/config; then
		# because they could result in one value being "enforcing" and the other value being "permissive".  If both values are not the same, then we should require manual remediation.

		# Determine if the output of getenforce is "Enforcing", and if the string "SELINUX=enforcing" is in the file /etc/selinux/config
		if getenforce | grep -Eqs 'Enforcing' &&  grep -Eiqs '^\s*SELINUX=enforcing\b' /etc/selinux/config; then
			l_test1="passed"
		fi

		# Determine if the output of getenforce is "Permissive", and if the string "SELINUX=permissive" is in the file /etc/selinux/config
		if getenforce | grep -Eqs 'Permissive' &&  grep -Eiqs '^\s*SELINUX=permissive\b' /etc/selinux/config; then
			l_test2="passed"
		fi

		if [ "$l_test1" = "passed" -o "$l_test2" = "passed" ]; then
			echo -e "- PASSED:\n- SELinux state is set to enforcing or permissive" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SELinux state" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAILED:\n- SELinux state is NOT properly set" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SELinux state" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-106}"
		fi
	}

	fed_ensure_selinux_state_enforcing_or_permissive_chk
	if [ "$?" = "101" ]; then
		[ "$l_test" != "failed" ] && l_test="passed"
	else
		l_test="manual"
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