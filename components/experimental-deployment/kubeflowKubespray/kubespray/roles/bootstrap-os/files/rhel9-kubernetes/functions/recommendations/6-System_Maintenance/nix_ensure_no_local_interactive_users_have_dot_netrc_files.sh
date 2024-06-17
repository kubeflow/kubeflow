#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_no_local_interactive_users_have_dot_netrc_files.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       08/03/22    Recommendation "Ensure no local interactive user has .netrc files"
#

ensure_no_local_interactive_users_have_dot_netrc_files()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""

   ensure_no_local_interactive_users_have_dot_netrc_files_chk()
   {
      echo -e "- Start check - Ensure no local interactive user has .netrc files" | tee -a "$LOG" 2>> "$ELOG"
      output="" output2=""
      perm_mask='0177'
      maxperm="$( printf '%o' $(( 0777 & ~$perm_mask)) )"
      valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
   
      awk -v pat="$valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | (while read -r user home; do
         if [ -f "$home/.netrc" ]; then
            mode="$( stat -L -c '%#a' "$home/.netrc" )"
            if [ $(( $mode & $perm_mask )) -gt 0 ]; then
               output="$output\n  - User \"$user\" file: \"$home/.netrc\" is too permissive: \"$mode\" (should be: \"$maxperm\" or more restrictive)"
            else
               output2="$output2\n  - User \"$user\" file: \"$home/.netrc\" exists and has file mode: \"$mode\" (should be: \"$maxperm\" or more restrictive)"
            fi
         fi
      done
   
      if [ -z "$output" ]; then
         if [ -z "$output2" ]; then
            echo -e "\n-PASSED: - No local interactive users have \".netrc\" files in their home directory\n" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure no local interactive user has .netrc files" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
         else
            echo -e "- FAIL:\n$output2\n" | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure no local interactive user has .netrc files" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_FAIL:-102}"
         fi
      else
         echo -e "- FAILED:\n$output\n" | tee -a "$LOG" 2>> "$ELOG"
         [ -n "$output2" ] && echo -e "\n- $output2\n" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure no local interactive user has .netrc files" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
      fi
      )
   }

   ensure_no_local_interactive_users_have_dot_netrc_files_fix()
   {
      echo -e "- Start remediation - Ensure no local interactive user has .netrc files" | tee -a "$LOG" 2>> "$ELOG"

      echo -e "- Making global modifications to users' files without alerting the user community can result in unexpected outages and unhappy users.\n- Therefore, it is recommended that a monitoring policy be established to report user .netrc file permissions and determine the action to be taken in accordance with local site policy." | tee -a "$LOG" 2>> "$ELOG"
      test=manual

      echo -e "- End remediation - Ensure no local interactive user has .netrc files" | tee -a "$LOG" 2>> "$ELOG"
   }
	
	ensure_no_local_interactive_users_have_dot_netrc_files_chk
   if [ "$?" = "101" ] || [ "$test" = "NA" ]; then
      [ -z "$test" ] && test="passed"
   else
      ensure_no_local_interactive_users_have_dot_netrc_files_fix
      if [ "$test" != "manual" ]; then
         ensure_no_local_interactive_users_have_dot_netrc_files_chk
      fi
   fi

	# Set return code and return
	case "$test" in
		passed)
			echo "Recommendation \"$RNA\" No remediation required" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
			;;
		remediated)
			echo "Recommendation \"$RNA\" successfully remediated" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-103}"
			;;
		manual)
			echo "Recommendation \"$RNA\" requires manual remediation" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-106}"
			;;
		NA)
			echo "Recommendation \"$RNA\" Chrony is not installed on the system - Recommendation is non applicable" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-104}"
			;;
		*)
			echo "Recommendation \"$RNA\" remediation failed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}