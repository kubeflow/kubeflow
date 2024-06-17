#!/usr/bin/env sh
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/fct/nix_ensure_perms_etc_passwd_dash.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/23/20     Recommendation "Ensure permissions on /etc/passwd- are configured"
# David Neilson	     04/16/22	  Update to modern format
ensure_perms_etc_passwd_dash()
{

	# Ensure permissions on /etc/passwd- are configured
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_perms_correct="0644"
	l_uid_correct="root"
	l_gid_correct="root"

	nix_ensure_perms_etc_passwd_dash_chk()
	{
		# Checks for correctly set permissions and ownership
		echo "- Start check - permissions and ownership on \"/etc/passwd-\"" | tee -a "$LOG" 2>> "$ELOG"
		l_buffer=$(stat /etc/passwd- | grep -i access | grep -i id)
		l_perms=$(echo $l_buffer | awk '{print $2}' | cut -d'/' -f1 | sed "s/(//g")
		l_uid=$(echo $l_buffer |  awk '{print $6}' | sed "s/)//g")
		l_gid=$(echo $l_buffer |  awk '{print $NF}' | sed "s/)//g")
		l_ownergroup=""
                l_permissions=""

		if [ "$l_perms" != "$l_perms_correct" ]; then
			l_permissions="failed"
		fi

		if [ "$l_uid" != "$l_uid_correct" -o "$l_gid" != "$l_gid_correct" ]; then
			l_ownergroup="failed"
		fi

		# If $l_perms does not equal "failed" and $l_uid does not equal "failed", we pass
		if [ "$l_permissions" != "failed" -a "$l_ownergroup" != "failed" ]; then
			echo -e "- PASS:\n- /etc/passwd- permissions set to \"$l_perms_correct\", ownership set to \"$l_uid_correct\", and group set to \"$l_gid_correct\""  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - /etc/passwd- permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
		   	echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			[ "$l_perms" != "$l_perms_correct" ] && echo "- /etc/passwd- permissions are set to \"$l_perms\"" | tee -a "$LOG" 2>> "$ELOG"
		   	[ "$l_uid" != "$l_uid_correct" -a "$l_gid" != "$l_gid_correct" ] && echo "- /etc/passwd- owner is \"$l_uid\" and group is \"$l_gid\"" | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - /etc/passwd- permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}

	nix_ensure_perms_etc_passwd_dash_fix()
	{
		echo "- Start remediation - set: /etc/passwd- permissions to \"$l_perms_correct\", ownership to \"$l_uid_correct\", and group to \"$l_gid_correct\"" | tee -a "$LOG" 2>> "$ELOG"
		if [ "$l_permissions" = "failed" ]; then
			echo "- Remediating /etc/passwd- permissions set incorrectly to \"$l_perms\"" | tee -a "$LOG" 2>> "$ELOG"	
			chmod u-x,go-wx /etc/passwd-
		fi

		if [ "$l_ownergroup" = "failed" ]; then
			echo "- Remediating /etc/passwd- owner and group set incorrectly to \"$l_uid\" and \"$l_gid\"" | tee -a "$LOG" 2>> "$ELOG"
 			chown root:root /etc/passwd-
		fi
	}

	nix_ensure_perms_etc_passwd_dash_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		nix_ensure_perms_etc_passwd_dash_fix
		nix_ensure_perms_etc_passwd_dash_chk
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