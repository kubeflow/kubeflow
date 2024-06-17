#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_local_interactive_users_home_dir_mode_750.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      09/25/20    Recommendation "Ensure local interactive user home directories are mode 750 or more restrictive"
# Justin Brown		   04/27/22    Update to modern format. Added passing criteria.
# Justin Brown       08/30/22    Updated to use better functions
#

ensure_local_interactive_users_home_dir_mode_750()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""

   ensure_local_interactive_users_home_dir_mode_750_chk()
   {
      echo -e "- Start check - Ensure local interactive user home directories are mode 750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
      l_output=""
      l_perm_mask='0027'
      l_maxperm="$( printf '%o' $(( 0777 & ~$l_perm_mask)) )"
      l_valid_shells="^($( sed -rn '/^\//{s,/,\\\\/,g;p}' /etc/shells | paste -s -d '|' - ))$"
   
      awk -v pat="$l_valid_shells" -F: '$(NF) ~ pat { print $1 " " $(NF-1) }' /etc/passwd | (while read -r user home; do
         if [ -d "$home" ]; then
            mode=$( stat -L -c '%#a' "$home" )
            [ $(( $mode & $l_perm_mask )) -gt 0 ] && l_output="$l_output\n- User $user home directory: \"$home\" is too permissive: \"$mode\" (should be: \"$l_maxperm\" or more restrictive)"
         fi
      done

   if [ -n "$l_output" ]; then
      echo -e "\n- Failed:$l_output" | tee -a "$LOG" 2>> "$ELOG"
      echo -e "- End check - Ensure local interactive user home directories are mode 750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
		return "${XCCDF_RESULT_FAIL:-102}"
   else
      echo -e "\n- Passed:\n- All user home directories are mode: \"$l_maxperm\" or more restrictive"
      echo -e "- End check - Ensure local interactive user home directories are mode 750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
		return "${XCCDF_RESULT_PASS:-101}"
   fi
   )
   }

   ensure_local_interactive_users_home_dir_mode_750_fix()
   {
      echo -e "- Start remediation - Ensure local interactive user home directories are mode 750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"

      echo -e "- Making global modifications to user home directories without alerting the user community can result in unexpected outages and unhappy users. Therefore, it is recommended that a monitoring policy be established to report user file permissions and determine the action to be taken in accordance with site policy." | tee -a "$LOG" 2>> "$ELOG"
      test=manual

      echo -e "- End remediation - Ensure local interactive user home directories are mode 750 or more restrictive" | tee -a "$LOG" 2>> "$ELOG"
   }
	
	ensure_local_interactive_users_home_dir_mode_750_chk
   if [ "$?" = "101" ] || [ "$test" = "NA" ]; then
      [ -z "$test" ] && test="passed"
   else
      ensure_local_interactive_users_home_dir_mode_750_fix
      if [ "$test" != "manual" ]; then
         ensure_local_interactive_users_home_dir_mode_750_chk
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