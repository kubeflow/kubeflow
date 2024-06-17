#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_no_world_writable_files_exist.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/23/20    Recommendation "Ensure no world writable files exist"
# Justin Brown		 04/27/22    Update to modern format. Added passing criteria.
# Justin Brown		 11/09/22	 Minor updates and refactoring
#

ensure_no_world_writable_files_exist()
{
	# Checks for world writable files
	echo -e "- Start check - Ensure no world writable files exist" | tee -a "$LOG" 2>> "$ELOG"
   	test=""
	
	ensure_no_world_writable_files_exist_chk()
	{
		l_output="" l_output2=""
		
		l_output2=$(for i in $(df --local -P | awk '{if (NR!=1) print $6}' | xargs -I '{}' find '{}' -xdev -type f -perm -0002); do echo "$i is world writable."; done)
		
		if [ -z "$l_output2" ]; then
			echo -e "- PASS: - No world writable files were found."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure no world writable files exist." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n$l_output2" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure no world writable files exist." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_no_world_writable_files_exist_fix()
	{
		echo -e "- Start remediation - Ensure no world writable files exist." | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Making unverified changes to file ownership could have significant unintended consequences or result in outages and unhappy users. Therefore, it is recommended that the unowned file list be reviewed and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End remediation - Ensure no world writable files exist." | tee -a "$LOG" 2>> "$ELOG"
		test="manual"
	}
	
	ensure_no_world_writable_files_exist_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_no_world_writable_files_exist_fix
		if [ "$test" != "manual" ]; then
			ensure_no_world_writable_files_exist_chk
            if [ "$?" = "101" ]; then
                [ "$test" != "failed" ] && test="remediated"
            else
                test="failed"
            fi
		fi
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