#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_only_authorized_users_own_audit_log_files.sh
# 
# Name				Date		Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell		05/11/22	Recommendation "Ensure only authorized users own audit log files"
# J. Brown			02/28/23	Updated method to gather log_file value from auditd.conf
# 

ensure_only_authorized_users_own_audit_log_files()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	authorized_users_own_audit_log_files_chk()
	{
		echo "- Start check - Only authorized users own audit log files" | tee -a "$LOG" 2>> "$ELOG"
		l_log_file_val="" l_log_dir="" output=""
		
		l_log_file_val="$(awk -F"=" '/^\s*log_file\s*/ {print $2}' /etc/audit/auditd.conf | xargs)"
		l_log_dir="$(dirname "${l_log_file_val:-/var/log/audit/audit.log}")"
		if [ -n "$l_log_dir" ]; then
			output="$(stat -Lc "%n %U" "$l_log_dir"/* | grep -Pv -- '^\H+\h+root\b')"
		else
			output="$output\n- Could not find the location of audit log directory"
		fi
		
		# If all files passed, then we pass
		if [ -z "$output" ]; then
			echo -e "- PASS\n- All audit log files are owned by the root user" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Only authorized users own audit log files" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo -e "- FAIL:" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "$output" | while read -r fileown; do
				echo "- File: \"$(awk '{print $1}' <<< "$fileown")\" is owned by: \"$(awk '{print $2}' <<< "$fileown")\"" | tee -a "$LOG" 2>> "$ELOG"
			done
			echo -e "- End check - Only authorized users own audit log files" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	authorized_users_own_audit_log_files_fix()
	{
		echo -e "- Start remediation - Only authorized users own audit log files" | tee -a "$LOG" 2>> "$ELOG"
		find "$l_log_dir" -type f ! -user root | while read -r file; do
			echo "- Changing owner to root user for file: \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
			chown root "$file"
		done
		echo -e "- End remediation - Only authorized users own audit log files" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	authorized_users_own_audit_log_files_chk
	if [ "$?" = "101" ]; then
			[ -z "$l_test" ] && l_test="passed"
	else
		authorized_users_own_audit_log_files_fix
		authorized_users_own_audit_log_files_chk
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