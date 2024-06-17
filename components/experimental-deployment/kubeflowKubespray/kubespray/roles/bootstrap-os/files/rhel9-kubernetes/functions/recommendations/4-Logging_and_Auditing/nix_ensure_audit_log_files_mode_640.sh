#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_audit_log_files_mode_640.sh
# 
# Name				Date		Description
# ------------------------------------------------------------------------------------------------
# Justin Brown		11/15/22	Recommendation "Ensure audit log files are mode 0640 or less permissive"
# Justin Brown		02/12/23	Updated to new style
# J. Brown			02/28/23	Updated method to gather log_file value from auditd.conf
# 

ensure_audit_log_files_mode_640()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	ensure_audit_log_files_mode_640_chk()
	{
		echo "- Start check - Ensure audit log files are mode 0640 or less permissive" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_output2="" l_log_file_val="" l_log_files=""
		l_log_file_val="$(awk -F"=" '/^\s*log_file\s*/ {print $2}' /etc/audit/auditd.conf | xargs)"
		l_log_files="$(find "$(dirname "${l_log_file_val:-/var/log/audit/audit.log}")" -type f)"
		if [ -n "$l_log_files" ]; then
			for file in $l_log_files; do
				l_tst_file="$(stat -Lc "%n %a" "$file" | grep -v -- '[0,2,4,6][0,4]0')"
				if [ -z "$l_tst_file" ]; then
					l_output="$l_output\n-  File: $file is properly configured"
				else
					l_output2="$l_output2\n-  File: \"$(awk '{print $1}' <<< "$l_tst_file")\" is mode: \"$(awk '{print $2}' <<< "$l_tst_file")\""
				fi
			done
		else
			l_output2="$l_output2\n- Could not find the location of audit log files"
		fi
		
		# If all files passed, then we pass
		if [ -z "$l_output2" ]; then
			echo -e "- PASS:\n- All audit log files are mode 0640 or less permissive\n- Passing values:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure audit log files are mode 0640 or less permissive" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo -e "- FAIL:\n- All audit log files are NOT mode 0640 or less permissive\n- Failing values:\n$l_output2" | tee -a "$LOG" 2>> "$ELOG"
			if [ -n "$l_output" ]; then
				echo -e "- Passing values:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			fi
			echo -e "- End check - Ensure audit log files are mode 0640 or less permissive" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}

	ensure_audit_log_files_mode_640_fix()
	{
		echo -e "- Start remediation - Ensure audit log files are mode 0640 or less permissive" | tee -a "$LOG" 2>> "$ELOG"

		for file in $l_log_files; do
			l_tst_file="$(stat -Lc "%n %a" "$file" | grep -v -- '[0,2,4,6][0,4]0')"
			if [ -n "$l_tst_file" ]; then
				echo "- Removing excess permissions from file: \"$(awk '{print $1}' <<< "$l_tst_file")\"" | tee -a "$LOG" 2>> "$ELOG"
				chmod u-x,g-wx,o-rwx "$(awk '{print $1}' <<< "$l_tst_file")"
			fi
		done
		
		echo -e "- End remediation - Ensure audit log files are mode 0640 or less permissive" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_audit_log_files_mode_640_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_audit_log_files_mode_640_fix
		ensure_audit_log_files_mode_640_chk
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