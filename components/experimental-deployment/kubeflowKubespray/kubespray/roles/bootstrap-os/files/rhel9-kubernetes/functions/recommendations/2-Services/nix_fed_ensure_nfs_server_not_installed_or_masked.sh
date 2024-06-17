#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_nfs_server_not_installed_or_masked.sh
# 
# Name              Date		Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell      09/21/20    Recommendation "Ensure NFS is not enabled"
# David Neilson	    05/03/22	Updated to latest standards
# J. Brown			03/25/23	Updated function names to match convention

fed_ensure_nfs_server_not_installed_or_masked()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	fed_ensure_nfs_server_not_installed_or_masked_chk()
	{
		# If nfs-utils is not installed, we pass.	
		if rpm -q nfs-utils | grep "not installed" > /dev/null; then
			echo -e "- PASS \"$RNA\" No remediation required" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- Result - nfs-utils not installed\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-101}"
		# If nfs-utils is installed, we verify it is masked
		elif systemctl is-enabled nfs-server | grep -E "^masked$" > /dev/null; then
			echo -e "- PASS \"$RNA\" No remediation required" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- Result - nfs-utils is installed but nfs-server service is masked\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-101}"
		else
			echo -e "- Result - remediation required\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	fed_ensure_nfs_server_not_installed_or_masked_fix()
	{
		echo "- Start remediation - masking nfs-server service" | tee -a "$LOG" 2>> "$ELOG"
		systemctl --now mask nfs-server
	}

	fed_ensure_nfs_server_not_installed_or_masked_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		fed_ensure_nfs_server_not_installed_or_masked_fix
		fed_ensure_nfs_server_not_installed_or_masked_chk
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