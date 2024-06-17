#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_only_authorized_groups_assigned_ownership_audit_log_files.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell        05/12/22    Recommendation Ensure only authorized groups are assigned ownership of audit log files"
# 

ensure_only_authorized_groups_assigned_ownership_audit_log_files()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_only_authorized_groups_assigned_ownership_audit_log_files_chk()
	{
		echo "- Start check - Only authorized groups assigned ownership audit log files" | tee -a "$LOG" 2>> "$ELOG"
		output="" l_log_file_val="" l_log_dir="" output2="" tst=""

		output="$(grep -Piw -- '^\h*log_group\h*=\h*\H+\b' /etc/audit/auditd.conf)"
		grep -Pq '^\h*log_group\h*=\h*(adm|root)\b' <<< "$output" && tst="pass"
		
		l_log_file_val="$(awk -F"=" '/^\s*log_file\s*/ {print $2}' /etc/audit/auditd.conf | xargs)"
		l_log_dir="$(dirname "${l_log_file_val:-/var/log/audit/audit.log}")"
		output2="$(stat -c "%n %G" "$l_log_dir"/* | grep -Pv '^\h*\H+\h+(adm|root)\b')"
		
		# If all files passed, then we pass
		if [ "$tst" = "pass" ] && [ -z "$output2" ]; then
			{
				echo -e "- PASS:"
				echo -e "- The \"log_group\" parameter is set to: \"$(awk -F= '{print $2}' <<< "$output" | xargs)\" in \"/etc/audit/auditd.conf\""
				echo -e "- Only authorized groups are assigned ownership audit log files"
				echo -e "- End check - Only authorized users own audit log files"
			} | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo -e "- FAIL:" | tee -a "$LOG" 2>> "$ELOG"
			[ "$tst" != "pass" ] && echo -e "- The \"log_group\" parameter is set to: \"$(awk -F= '{print $2}' <<< "$output" | xargs)\" in \"/etc/audit/auditd.conf\""| tee -a "$LOG" 2>> "$ELOG"
			if [ -n "$output2" ]; then
				echo -e "$output2" | while read -r filegrp; do
					echo "- File: \"$(awk '{print $1}' <<< "$filegrp")\" is owned by group: \"$(awk '{print $2}' <<< "$filegrp")\"" | tee -a "$LOG" 2>> "$ELOG"
				done
			fi
			echo -e "- End check - Only authorized groups assigned ownership audit log files" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	ensure_only_authorized_groups_assigned_ownership_audit_log_files_fix()
	{
		echo -e "- Start remediation - Only authorized groups assigned ownership audit log files" | tee -a "$LOG" 2>> "$ELOG"
		if ! grep -Piwq -- '^\h*log_group\h*=\h*(adm|root)\b' /etc/audit/auditd.conf; then
			echo -e "- Setting \"log_group\" parameter to \"adm\" in \"/etc/audit/auditd.conf\""
			sed -ri 's/^\s*#?\s*log_group\s*=\s*\S+(\s*#.*)?.*$/log_group = adm \1/' /etc/audit/auditd.conf
		fi
		output="$(find "$l_log_dir" -type f \( ! -group adm -a ! -group root \))"
		if [ -n "$output" ]; then
			echo -e "$output" | while read -r file; do
				echo "- Changing group to \"adm\" on file: \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
				chgrp adm "$file"
			done
		fi
		echo -e "- End remediation - Only authorized groups assigned ownership audit log files" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_only_authorized_groups_assigned_ownership_audit_log_files_chk
	if [ "$?" = "101" ]; then
			[ -z "$l_test" ] && l_test="passed"
	else
		ensure_only_authorized_groups_assigned_ownership_audit_log_files_fix
		ensure_only_authorized_groups_assigned_ownership_audit_log_files_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="remediated"
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