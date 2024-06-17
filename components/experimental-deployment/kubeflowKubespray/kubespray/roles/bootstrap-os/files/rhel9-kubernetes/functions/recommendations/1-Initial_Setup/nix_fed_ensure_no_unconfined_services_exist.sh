#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_no_unconfined_services_exist.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/30/20    Recommendation "Ensure no unconfined services exist"
# David Neilson	     06/16/22	 Updated to current standards.
fed_ensure_no_unconfined_services_exist()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"

	fed_ensure_no_unconfined_services_exist_chk()
	{
		echo -e "- Start check - Ensure no unconfined processes exist" | tee -a "$LOG" 2>> "$ELOG"
      		l_test=""

		if ! ps -eZ | grep -q unconfined_service_t; then
			l_test=passed
		else
			l_test=manual
		fi

		if [ "$l_test" = "passed" ]; then
			echo -e "- PASS:\nEnsure no unconfined processes exist" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$l_test" = "manual" ]; then
			echo -e "- Remediation Required:\nInvestigate unconfined processes" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-106}"
		else
			echo -e "- FAIL:\nUnable to determine if no unconfined processes exist" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
   
	fed_ensure_no_unconfined_services_exist_chk
		
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