#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_perms_etc_shadow.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/23/20    Recommendation "Ensure permissions on /etc/shadow are configured"
# David Neilson	   04/16/22	  	Update to modern format
# Justin Brown			09/08/22		Small syntax changes
# David Neilson	     09/24/22	Minor syntax change

fed_ensure_perms_etc_shadow()
{

	# Ensure permissions on /etc/shadow are configured
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_perms_correct="0000"
	l_uid_correct="root"
	l_gid_correct="root"

	fed_ensure_perms_etc_shadow_chk()
	{
		# Checks for correctly set permissions and ownership
		echo "- Start check - permissions and ownership on \"/etc/shadow\"" | tee -a "$LOG" 2>> "$ELOG"
		l_buffer=$(stat /etc/shadow | grep -i access | grep -i id)
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

		# If $l_permissions does not equal "failed" and $l_ownergroup does not equal "failed", we pass
		if [ "$l_permissions" != "failed" -a "$l_ownergroup" != "failed" ]; then
			echo -e "- PASS:\n- /etc/shadow permissions set to \"$l_perms_correct\", ownership set to \"$l_uid_correct\", and group set to \"$l_gid_correct\""  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - /etc/shadow permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
		   	echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			[ "$l_perms" != "$l_perms_correct" ] && echo "- /etc/shadow permissions are set to \"$l_perms\"" | tee -a "$LOG" 2>> "$ELOG"
		   	[ "$l_uid" != "$l_uid_correct" -a "$l_gid" != "$l_gid_correct" ] && echo "- /etc/shadow owner is \"$l_uid\" and group is \"$l_gid\"" | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - /etc/shadow permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}

	fed_ensure_perms_etc_shadow_fix()
	{
		echo "- Start remediation - set: /etc/shadow permissions to \"$l_perms_correct\", ownership to \"$l_uid_correct\", and group to \"$l_gid_correct\"" | tee -a "$LOG" 2>> "$ELOG"
		if [ "$l_permissions" = "failed" ]; then
			echo "- Remediating /etc/shadow permissions set incorrectly to \"$l_perms\"" | tee -a "$LOG" 2>> "$ELOG"	
			chmod $l_perms_correct /etc/shadow
		fi

		if [ "$l_ownergroup" = "failed" ]; then
			echo "- Remediating /etc/shadow owner and group set incorrectly to \"$l_uid\" and \"$l_gid\"" | tee -a "$LOG" 2>> "$ELOG"
 			chown root:root /etc/shadow
		fi
	}

	fed_ensure_perms_etc_shadow_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		fed_ensure_perms_etc_shadow_fix
		fed_ensure_perms_etc_shadow_chk
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