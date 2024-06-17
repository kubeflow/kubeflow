#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_access_su_command_restricted.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/24/20    Recommendation "Ensure access to the su command is restricted"
# Justin Brown		 12/31/22	 Updated to modern format
#

ensure_access_su_command_restricted()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_group="sugroup"

	ensure_access_su_command_restricted_chk()
	{
		l_test1=""
		l_test2=""
		
		# Verify a line like this exists in the /etc/pam.d/su file:  "auth required pam_wheel.so use_uid group=<group name>"
		if grep -Piq '^\h*auth\h+(?:required|requisite)\h+pam_wheel\.so\h+(?:[^#\n\r]+\h+)?((?!\2)(use_uid\b|group=\H+\b))\h+(?:[^#\n\r]+\h+)?((?!\1)(use_uid\b|group=\H+\b))(\h+.*)?$' /etc/pam.d/su ; then
			l_test1="passed"
		fi

		# Determine 1) if group <group_name> exists, and 2) if the group does exist, verify that it doesn't contain any users
		l_group="$(grep -Pi '^\h*auth\h+(?:required|requisite)\h+pam_wheel\.so\h+(?:[^#\n\r]+\h+)?((?!\2)(use_uid\b|group=\H+\b))\h+(?:[^#\n\r]+\h+)?((?!\1)(use_uid\b|group=\H+\b))(\h+.*)?$' /etc/pam.d/su | cut -d'=' -f2)"
		[ -n "$l_group" ] && [ $(awk "/$l_group/" /etc/group | wc -c) -gt 0 ] && [ -z "$(grep $l_group /etc/group | cut -d':' -f4)" ] && l_test2="passed"

		# If both l_test1 and l_test2 equals "passed", we pass.  
		if [ "$l_test1" = "passed" ] && [ "$l_test2" = "passed" ]; then
			echo -e "- PASSED:\n- access to the su command is restricted" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure access to the su command is restricted" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}" 
		else
			echo -e "- FAILED:\n- access to the su command is not properly restricted" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure access to the su command is restricted" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		fi	
	}

	ensure_access_su_command_restricted_fix()
	{
        echo -e "- Start remediation - Ensure access to the su command is restricted" | tee -a "$LOG" 2>> "$ELOG"

		echo -e "- Create an empty group that will be specified for use of the su command. The group should be named according to site policy.\n  # groupadd sugroup\n- Add the following line to the /etc/pam.d/su file, specifying the empty group:\n  auth required pam_wheel.so use_uid group=sugroup" | tee -a "$LOG" 2>> "$ELOG"
		l_test="manual"

        echo -e "- End remediation - Ensure access to the su command is restricted" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_access_su_command_restricted_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_access_su_command_restricted_fix
		if [ "$l_test" != "manual" ]; then
			ensure_access_su_command_restricted_chk
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