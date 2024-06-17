#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_permissions_issue_net_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/21/20    Recommendation "Ensure permissions on /etc/issue.net are configured"
# David Neilson	    04/30/22	Added chk and fix subfunctions, return code/recommendation entry, able to deal with links.
# Justin Brown			09/05/22		Small syntax changes

ensure_permissions_issue_net_configured()
{
	# Ensure permissions on /etc/issue.net are configured
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_perms_correct="644"
	l_uid_correct="root"
	l_gid_correct="root"

	ensure_permissions_issue_net_configured_chk()
	{
		# Checks for correctly set permissions and ownership
		echo "- Start check - Ensure permissions on /etc/issue.net are configured" | tee -a "$LOG" 2>> "$ELOG"

		if [ -e /etc/issue.net ]; then
			if [ -L $l_file ]; then
				l_perms=$(stat -Lc "%a" /etc/issue.net)
				l_uid=$(stat -Lc "%U" /etc/issue.net)
				l_gid=$(stat -Lc "%G" /etc/issue.net)
			else
				l_perms=$(stat -c "%a" /etc/issue.net)
				l_uid=$(stat -c "%U" /etc/issue.net)
				l_gid=$(stat -c "%G" /etc/issue.net)
			fi		
			
			l_ownergroup=""
			l_permissions=""

			# If permissions aren't 644 or more strict, set l_perms = "failed"  so the permissions will eventually get set to 644.
			case $l_perms in
				[640][40][40])
					;;
				*)
					l_permissions="failed"
					;;
			esac

			if [ "$l_uid" != "$l_uid_correct" ] || [ "$l_gid" != "$l_gid_correct" ]; then
				l_ownergroup="failed"
			fi

			# If $l_permissions does not equal "failed" and $l_ownergroup does not equal "failed", we pass
			if [ "$l_permissions" != "failed" ] && [ "$l_ownergroup" != "failed" ]; then
				echo -e "- PASS:\n- /etc/issue.net permissions set to \"$l_perms_correct\" or below, ownership set to \"$l_uid_correct\", and group set to \"$l_gid_correct\""  | tee -a "$LOG" 2>> "$ELOG"
				echo "- End check - Ensure permissions on /etc/issue.net are configured" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
			else
				# print the reason why we are failing
				echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
				case $l_perms in
					[640][40][40])
						;;
					*)
						echo "- /etc/issue.net permissions are set to \"$l_perms\"" | tee -a "$LOG" 2>> "$ELOG"
						;;
				esac
				[ "$l_uid" != "$l_uid_correct" ] || [ "$l_gid" != "$l_gid_correct" ] && echo "- /etc/issue.net owner is \"$l_uid\" and group is \"$l_gid\"" | tee -a "$LOG" 2>> "$ELOG"
				echo "- End check - Ensure permissions on /etc/issue.net are configured" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_FAIL:-102}"
			fi
		else
			echo -e "- FAIL:\n- /etc/issue.net does NOT exist"  | tee -a "$LOG" 2>> "$ELOG"
			l_permissions="failed"
			l_ownergroup="failed"
			echo -e "- End check - Ensure permissions on /etc/issue.net are configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		fi	
	}

	ensure_permissions_issue_net_configured_fix()
	{
		echo "- Start remediation - Ensure permissions on /etc/issue.net are configured" | tee -a "$LOG" 2>> "$ELOG"
		
		if [ ! -e /etc/issue.net ]; then
			echo "- Creating /etc/issue.net file" | tee -a "$LOG" 2>> "$ELOG"
			touch /etc/issue.net
		fi

		if [ "$l_permissions" = "failed" ]; then
			echo "- Remediating /etc/issue.net permissions set incorrectly to \"$l_perms\"" | tee -a "$LOG" 2>> "$ELOG"	
			chmod u-x,go-wx /etc/issue.net
		fi

		if [ "$l_ownergroup" = "failed" ]; then
			echo "- Remediating /etc/issue.net owner and group set incorrectly to \"$l_uid\" and \"$l_gid\"" | tee -a "$LOG" 2>> "$ELOG"
 			chown root:root /etc/issue.net
		fi

		echo "- End remediation - Ensure permissions on /etc/issue.net are configured" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_permissions_issue_net_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_permissions_issue_net_configured_fix
		ensure_permissions_issue_net_configured_chk
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