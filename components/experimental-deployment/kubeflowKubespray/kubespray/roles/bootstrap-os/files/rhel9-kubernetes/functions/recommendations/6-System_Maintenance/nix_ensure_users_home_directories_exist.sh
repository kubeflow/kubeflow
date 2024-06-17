#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_users_home_directories_exist.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/09/20    Recommendation "Ensure all users' home directories exist"
# Justin Brown		 04/25/22    Update to modern format
# Justin Brown       09/26/22    Updated to use valid shells
#
 
ensure_users_home_directories_exist()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_users_home_directories_exist_chk()
	{
		echo -e "- Start check - Ensure all users' home directories exist" | tee -a "$LOG" 2>> "$ELOG"
		l_output=""
   		l_valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
   
   		awk -v pat="$l_valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | (while read -r user home; do
      		[ ! -d "$home" ] && l_output="$l_output\n  - User \"$user\" home directory \"$home\" doesn't exist"
   			done
   
			if [ -z "$l_output" ]; then
				echo -e "\n-PASSED: - All local interactive users have a home directory\n"
				echo -e "- End check - Ensure all users' home directories exist" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
			else
				echo -e "\n- FAILED:\n$l_output\n"
				echo -e "- End check - All users home directories exist." | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_FAIL:-102}"
			fi
   		)
	}
	
	ensure_users_home_directories_exist_fix()
	{
		echo -e "- Start remediation - All users own their home directories." | tee -a "$LOG" 2>> "$ELOG"
		
		valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
		
		awk -v pat="$valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | while read -r user home; do
			if [ ! -d "$home" ]; then 
				echo -e "\n- User \"$user\" home directory \"$home\" doesn't exist\n- creating home directory \"$home\"\n" | tee -a "$LOG" 2>> "$ELOG"
				mkdir "$home"
				chmod g-w,o-wrx "$home"
				chown "$user" "$home"
			fi
		done
		
		echo -e "- End remediation - All users own their home directories." | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_users_home_directories_exist_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_users_home_directories_exist_fix
		ensure_users_home_directories_exist_chk
		if [ "$?" = "101" ] ; then
			[ "$l_test" != "failed" ] && l_test="remediated"
		else
			l_test="failed"
		fi
	fi

	# Set return code and return
	case "$l_test" in
		passed)
			echo -e "Recommendation \"$RNA\" No remediation required" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
			;;
		remediated)
			echo -e "Recommendation \"$RNA\" successfully remediated" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-103}"
			;;
		manual)
			echo -e "Recommendation \"$RNA\" requires manual remediation" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-106}"
			;;
		*)
			echo -e "Recommendation \"$RNA\" remediation failed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}