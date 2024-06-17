#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_audit_log_dir_750_or_more_restricted.sh
# 
# Name              Date		Description
# ------------------------------------------------------------------------------------------------
# Justin Brown      11/30/22	Recommendation "Ensure the audit log directory is 0750 or more restrictive"
# J. Brown			02/28/23	Updated method to gather log_file value from auditd.conf
# 

ensure_audit_log_dir_750_or_more_restricted()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_audit_log_dir_750_or_more_restricted_chk()
	{
		echo "- Start check - Ensure the audit log directory is 0750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
		l_log_file_val="" l_log_dir="" output=""
		
		l_log_file_val="$(awk -F"=" '/^\s*log_file\s*/ {print $2}' /etc/audit/auditd.conf | xargs)"
		l_log_dir="$(dirname "${l_log_file_val:-/var/log/audit/audit.log}")"
		if [ -n "$l_log_dir" ]; then
			output="$(stat -Lc "%n %a" "$l_log_dir" | grep -Pv -- '^\h*\H+\h+([0,5,7][0,5]0)')"
		else
			output="$output\n- Could not find the location of audit log directory"
		fi
		
		# If all files passed, then we pass
		if [ -z "$output" ]; then
			echo -e "- PASS\n- All audit log directories are mode 0750 or less permissive" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure the audit log directory is 0750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo -e "- FAIL:" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "$output" | while read -r filemode; do
				echo "- File: \"$(awk '{print $1}' <<< "$filemode")\" is mode: \"$(awk '{print $2}' <<< "$filemode")\"" | tee -a "$LOG" 2>> "$ELOG"
			done
			echo -e "- End check - Ensure the audit log directory is 0750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	ensure_audit_log_dir_750_or_more_restricted_fix()
	{
		echo -e "- Start remediation - Ensure the audit log directory is 0750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
		
		find "$l_log_dir" -type d -perm /027 | while read -r file; do
			echo "- Removing excess permissions from file: \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
			chmod g-w,o-rwx "$file"
		done
		
		echo -e "- End remediation - Ensure the audit log directory is 0750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_audit_log_dir_750_or_more_restricted_chk
	if [ "$?" = "101" ]; then
			[ -z "$l_test" ] && l_test="passed"
	else
		ensure_audit_log_dir_750_or_more_restricted_fix
		ensure_audit_log_dir_750_or_more_restricted_chk
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
	