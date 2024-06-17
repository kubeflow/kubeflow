#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_selinux_state_enforcing.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/30/20    Recommendation "Ensure the SELinux state is enforcing"
# David Neilson	     07/22/22	 Updated to current standards
fed_ensure_selinux_state_enforcing()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	fed_ensure_selinux_state_enforcing_chk()
	{
		# Determine if the output of getenforce is "Enforcing", and if the string "SELINUX=enforcing" is in the file /etc/selinux/config
		if getenforce | grep -Eqs 'Enforcing' &&  grep -Eiqs '^\s*SELINUX=enforcing\b' /etc/selinux/config; then
			echo -e "- PASSED:\n- SELinux state is enforcing" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SELinux state" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAILED:\n- SELinux state is NOT set to enforcing " | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SELinux state" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-106}"
		fi
	}
	
	fed_ensure_selinux_state_enforcing_chk
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