#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_local_interactive_users_dot_files_not_group_world_writable.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/08/22    Recommendation "Ensure local interactive user dot files are not group or world writable"
#
 
ensure_local_interactive_users_dot_files_not_group_world_writable()
{
	# Checks for files in user home directories
	echo -e "- Start check - Ensure users' dot files are not group or world writable" | tee -a "$LOG" 2>> "$ELOG"
	
	ensure_local_interactive_users_dot_files_not_group_world_writable_chk()
	{
		l_output=""
        l_perm_mask='0022'
        l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask)) )"
        l_valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
	
		awk -v pat="$l_valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | (while read -r user home; do
            for dfile in $(find "$home" -type f -name '.*'); do 
                l_mode=$( stat -L -c '%#a' "$dfile" ) 
                [ $(( $l_mode & $l_perm_mask )) -gt 0 ] && l_output="$l_output\n- User $user file: \"$dfile\" is too permissive: \"$l_mode\" (should be: \"$l_maxperm\" or more restrictive)"
            done
        done
	
		if [ -z "$l_output" ]; then
			echo -e "- PASS: - Group or world writable dot files were not found in any user home directory."  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure users' dot files are not group or world writable" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: - \n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure users' dot files are not group or world writable" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
		)
	}
	
	ensure_local_interactive_users_dot_files_not_group_world_writable_fix()
	{
		test=""
			
		echo -e "- Start remediation - Ensure users' dot files are not group or world writable" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Making global modifications to users' files without alerting the user community can result in unexpected outages and unhappy users. Therefore, it is recommended that a monitoring policy be established to report user .rhosts files and determine the action to be taken in accordance with site policy. -" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End remediation - Ensure users' dot files are not group or world writable" | tee -a "$LOG" 2>> "$ELOG"
		test="manual"
		echo -e "$test"
	}

	ensure_local_interactive_users_dot_files_not_group_world_writable_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_local_interactive_users_dot_files_not_group_world_writable_fix
		if [ "$test" != "manual" ]; then
			ensure_local_interactive_users_dot_files_not_group_world_writable_chk
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