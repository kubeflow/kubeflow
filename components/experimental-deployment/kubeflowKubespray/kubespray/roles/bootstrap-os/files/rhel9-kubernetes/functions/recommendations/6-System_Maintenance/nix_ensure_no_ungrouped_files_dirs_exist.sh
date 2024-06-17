#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_no_ungrouped_files_dirs_exist.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/23/20    Recommendation "Ensure no ungrouped files or directories exist"
# Justin Brown		 04/27/22    Update to modern format. Added passing criteria.
# Justin Brown		 11/09/22	 Minor updates and refactoring
#

ensure_no_ungrouped_files_dirs_exist()
{
	# Checks for ungrouped files
	echo -e "- Start check - Ensure no ungrouped files or directories exist" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_no_ungrouped_files_dirs_exist_chk()
	{
		l_output="" l_output2=""

		l_output2=$(for i in $(df --local -P | awk '{if (NR!=1) print $6}' | xargs -I '{}' find '{}' -xdev -nogroup); do echo "$i does not have a valid group."; done)
		
		if [ -z "$l_output2" ]; then
			echo -e "- PASS: - No ungrouped files or directories were found."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure no ungrouped files or directories exist." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n$l_output2" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure no ungrouped files or directories exist." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_no_ungrouped_files_dirs_exist_fix()
	{
		echo -e "- Start remediation - Ensure no ungrouped files or directories exist." | tee -a "$LOG" 2>> "$ELOG"

		echo -e "- Making unverified changes to file ownership could have significant unintended consequences or result in outages and unhappy users.\n- It is recommended that the ungrouped file list be reviewed and determine the action to be taken in accordance with site policy." | tee -a "$LOG" 2>> "$ELOG"
      	l_test="manual"

		echo -e "- End remediation - Ensure no ungrouped files or directories exist." | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_no_ungrouped_files_dirs_exist_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_no_ungrouped_files_dirs_exist_fix
		if [ "$l_test" != "manual" ]; then
			ensure_no_ungrouped_files_dirs_exist_chk
            if [ "$?" = "101" ]; then
                [ "$l_test" != "failed" ] && l_test="remediated"
            else
                l_test="failed"
            fi
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