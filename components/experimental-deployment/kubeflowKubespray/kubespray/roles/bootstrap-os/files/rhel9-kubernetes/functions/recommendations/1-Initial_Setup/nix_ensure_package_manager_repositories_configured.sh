#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_package_manager_repositories_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Ensure package manager repositories are configured"
# Justin Brown       04/18/22    Updated to modern format
#
 
ensure_package_manager_repositories_configured()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	test=""
	manual_chk()
	{
		# Set return code and return
		echo -e "- Recommendation \"$RNA\" Manual remediation required" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Result - requires manual remediation\n- End Recommendation \"$RN - $RNA\"\n**************************************************\n" | tee -a "$LOG" 2>> "$ELOG"
		return "${XCCDF_RESULT_FAIL:-106}"
	}
	manual_chk
   
	if [ "$?" != "106" ]; then
		test=failed
	else
		test=manual
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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
