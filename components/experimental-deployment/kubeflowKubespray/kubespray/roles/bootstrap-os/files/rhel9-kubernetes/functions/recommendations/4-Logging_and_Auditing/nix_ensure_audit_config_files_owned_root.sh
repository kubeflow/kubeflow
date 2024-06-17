#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_audit_config_files_owned_root.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/22/22     Recommendation "Ensure audit configuration files are owned by root"
# 

ensure_audit_config_files_owned_root()
{

	# Ensure permissions on /etc/group- are configured
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	ensure_audit_config_files_owned_root_chk()
	{
		echo "- Start check - Ensure audit configuration files are owned by root" | tee -a "$LOG" 2>> "$ELOG"
		l_output=""
		l_output="$(find /etc/audit/ -type f \( -name '*.conf*' -o -name '*.rules*' \) -exec stat -Lc "%n %U/%u" {} + | grep -Pv -- '^\h*\H+\h*root/0\h*$')"
		
		# If all files passed, then we pass
		if [ -z "$l_output" ]; then
			echo -e "- PASS\n- All audit config files are owned by root" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure audit configuration files are owned by root" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo -e "- FAIL:" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "$l_output" | while read -r fileowner; do
				echo "- File: \"$(awk '{print $1}' <<< "$fileowner")\" is owned by: \"$(awk '{print $2}' <<< "$fileowner")\"" | tee -a "$LOG" 2>> "$ELOG"
			done
			echo -e "- End check - Ensure audit configuration files are owned by root" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}

	ensure_audit_config_files_owned_root_fix()
	{
		echo -e "- Start remediation - Ensure audit configuration files are owned by root" | tee -a "$LOG" 2>> "$ELOG"

		find /etc/audit/ -type f \( -name '*.conf*' -o -name '*.rules*' \) ! -user root | while read -r file; do
			echo "- Changing owner for file: \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
			chown root "$file"
		done
		
		echo -e "- End remediation - Ensure audit configuration files are owned by root" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_audit_config_files_owned_root_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_audit_config_files_owned_root_fix
		ensure_audit_config_files_owned_root_chk
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