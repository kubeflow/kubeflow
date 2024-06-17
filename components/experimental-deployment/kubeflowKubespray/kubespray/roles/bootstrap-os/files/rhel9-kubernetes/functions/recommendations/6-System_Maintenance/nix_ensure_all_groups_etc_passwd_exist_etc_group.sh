#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_all_groups_etc_passwd_exist_etc_group.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/09/20    Recommendation "Ensure all groups in /etc/passwd exist in /etc/group"
# Justin Brown		 04/27/22    Update to modern format. Added passing criteria.
#

ensure_all_groups_etc_passwd_exist_etc_group()
{
	# Checks all groups exist in /etc/group
	echo -e "- Start check - Ensure all groups in /etc/passwd exist in /etc/group" | tee -a "$LOG" 2>> "$ELOG"
    test="" 
	
	ensure_all_groups_etc_passwd_exist_etc_group_chk()
	{
		l_output=""
		l_output=$(for i in $(cut -s -d: -f4 /etc/passwd | sort -u ); do grep -q -P "^.*?:[^:]*:$i:" /etc/group; if [ $? -ne 0 ]; then echo "Group $i is referenced by /etc/passwd but does not exist in /etc/group"; fi; done)
		
		if [ -z "$l_output" ]; then
			echo -e "- PASS: - All groups in /etc/passwd exist in /etc/group."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure all groups in /etc/passwd exist in /etc/group." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure all groups in /etc/passwd exist in /etc/group." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_all_groups_etc_passwd_exist_etc_group_fix()
	{
		echo -e "- Start remediation - All groups in /etc/passwd exist in /etc/group." | tee -a "$LOG" 2>> "$ELOG"

		echo -e "- Making modifications to /etc/passwd or /etc/group could have significant unintended consequences or result in outages and unhappy users. Therefore, it is recommended that the current user and group list be reviewed and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
      test="manual"
           
		echo -e "- End remediation - All groups in /etc/passwd exist in /etc/group." | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_all_groups_etc_passwd_exist_etc_group_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_all_groups_etc_passwd_exist_etc_group_fix
		if [ "$test" != "manual" ]; then
			ensure_all_groups_etc_passwd_exist_etc_group_chk
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