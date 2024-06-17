#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_default_user_umask_027_more_restrictive_v2.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure default user umask is 027 or more restrictive"
# Eric Pinnell       11/30/20    created v2 to be case insensitive, add /etc/login.defs to search, and change setting to /etc/login.defs
# Justin Brown       06/22/22    Updated to modern format
# 
 
ensure_default_user_umask_027_more_restrictive_v2()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   ensure_default_user_umask_027_more_restrictive_v2_chk()
	{
      echo -e "- Start check - Ensure default user shell timeout is configured" | tee -a "$LOG" 2>> "$ELOG"
      l_test1="" l_test2="" l_output=""
      
      if grep -Eiq '^\s*UMASK\s+[0-7][2-7]7\b' /etc/login.defs; then
         echo -e "- UMASK configured correctly in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
         if grep -Eqi '^\s*USERGROUPS_ENAB\s*"?no"?\b' /etc/login.defs; then
            echo -e "- USERGROUP_ENAB configured correctly in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            if grep -Eq '^\s*session\s+(optional|requisite|required)\s+pam_umask\.so\b' /etc/pam.d/password-auth; then
               echo -e "- pam_umask.so configured correctly in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
               if grep -Eq '^\s*session\s+(optional|requisite|required)\s+pam_umask\.so\b' /etc/pam.d/system-auth; then
                  echo -e "- pam_umask.so configured correctly in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
                  l_test1="passed"
               else
                  echo -e "- pam_umask.so NOT configured correctly in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
               fi
            else
               echo -e "- pam_umask.so NOT configured correctly in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            fi
         else
            echo -e "- USERGROUP_ENAB NOT configured correctly in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
         fi
      else
         echo -e "- UMASK settings NOT found in /etc/login.defs, etc/profile* or /etc/bashrc*" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      if grep -REiq '^\s*UMASK\s+\s*(0[0-7][2-7]7|[0-7][2-7]7|u=(r?|w?|x?)(r?|w?|x?)(r?|w?|x?),g=(r?x?|x?r?),o=)\b' /etc/profile* /etc/bashrc*; then
         echo -e "- UMASK configured correctly in:\n$(grep -REi '^\s*UMASK\s+\s*(0[0-7][2-7]7|[0-7][2-7]7|u=(r?|w?|x?)(r?|w?|x?)(r?|w?|x?),g=(r?x?|x?r?),o=)\b' /etc/profile* /etc/bashrc*)" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      l_output="$(grep -RPi '(^|^[^#]*)\s*umask\s+([0-7][0-7][01][0-7]\b|[0-7][0-7][0-7][0-6]\b|[0-7][01][0-7]\b|[0-7][0-7][0-6]\b|(u=[rwx]{0,3},)?(g=[rwx]{0,3},)?o=[rwx]+\b|(u=[rwx]{1,3},)?g=[^rx]{1,3}(,o=[rwx]{0,3})?\b)' /etc/login.defs /etc/profile* /etc/bashrc*)"

      if [ -z "$l_output" ]; then
         l_test2="passed"
         echo -e "- No less restrictive UMASK setting was found" | tee -a "$LOG" 2>> "$ELOG"
      else
         echo -e "- A less restrictive UMASK setting WAS found in:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      if [ "$l_test1" = "passed" ] && [ "$l_test2" = "passed" ]; then
			echo -e "- PASS: UMASK is set correctly" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure default user shell timeout is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: UMASK is NOT set correctly" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure default user shell timeout is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
         
   }
   
   ensure_default_user_umask_027_more_restrictive_v2_fix()
	{
      echo -e "- Start remediation - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
      l_test1_rem="" l_test2_rem=""
      
      if ! grep -Eiq '^\s*UMASK\s+(0[0-7][2-7]7|[0-7][2-7]7)\b' /etc/login.defs; then
         if grep -Eiq '^\s*UMASK\s+' /etc/login.defs; then
            echo -e "- Updating UMASK setting in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^([^#]+\s+)?(UMASK\s+)([0-9]+)(.*)$/\1\2027\4/' /etc/login.defs && l_test1_rem=remediated
         elif grep -Eiq '^\s*#\s*the permission mask will be initialized to 022' /etc/login.defs; then            
            echo -e "- Inserting UMASK setting in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*#\s*the permission mask will be initialized to 022/a UMASK 027' /etc/login.defs && l_test1_rem=remediated
         else
            echo -e "- Adding UMASK setting to /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            echo "UMASK 027" >> /etc/login.defs && l_test1_rem=remediated
         fi
      fi
      
      if ! grep -Eiq '^\s*USERGROUPS_ENAB\s*"?no"?\b' /etc/login.defs; then
         if grep -Eiq '^\s*USERGROUPS_ENAB\s+' /etc/login.defs; then
            echo -e "- Updating USERGROUPS_ENAB setting in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^([^#]+\s+)?(USERGROUPS_ENAB\s+)(yes|no)(.*)$/\1\2no \4/' /etc/login.defs && l_test1_rem=remediated
         elif grep -Eiq '^\s*UMASK\s+' /etc/login.defs; then            
            echo -e "- Inserting USERGROUPS_ENAB setting in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*UMASK\s+/a USERGROUPS_ENAB no' /etc/login.defs && l_test1_rem=remediated
         else
            echo -e "- Adding USERGROUPS_ENAB setting to /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
            echo "USERGROUPS_ENAB no" >> /etc/login.defs && l_test1_rem=remediated
         fi
      fi
      
      if ! grep -Eiq '^\s*session\s+(optional|requisite|required)\s+pam_umask\.so\b' /etc/pam.d/password-auth; then
         if grep -Eiq '^\s*session\s+optional' /etc/pam.d/password-auth; then
            echo -e "- Inserting pam_umask.so setting into /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*session\s+optional/a session optional        pam_umask.so' /etc/pam.d/password-auth && l_test1_rem=remediated
         else
            echo -e "- Adding pam_umask.so setting to /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            echo "session optional        pam_umask.so" >> /etc/pam.d/password-auth && l_test1_rem=remediated
         fi
      fi
      
      if ! grep -Eiq '^\s*session\s+(optional|requisite|required)\s+pam_umask\.so\b' /etc/pam.d/system-auth; then
         if grep -Eiq '^\s*session\s+optional' /etc/pam.d/system-auth; then
            echo -e "- Inserting pam_umask.so setting into /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/^\s*session\s+optional/a session optional        pam_umask.so' /etc/pam.d/system-auth && l_test1_rem=remediated
         else
            echo -e "- Adding pam_umask.so setting to /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
            echo "session optional        pam_umask.so" >> /etc/pam.d/system-auth && l_test1_rem=remediated
         fi
      fi
      
      if [ -n "$(grep -RPi '(^|^[^#]*)\s*umask\s+([0-7][0-7][01][0-7]\b|[0-7][0-7][0-7][0-6]\b|[0-7][01][0-7]\b|[0-7][0-7][0-6]\b|(u=[rwx]{0,3},)?(g=[rwx]{0,3},)?o=[rwx]+\b|(u=[rwx]{1,3},)?g=[^rx]{1,3}(,o=[rwx]{0,3})?\b)' /etc/login.defs /etc/profile* /etc/bashrc*)" ]; then
         for file in /etc/login.defs /etc/profile* /etc/bashrc*; do
            echo -e "- Updating UMASK setting in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^([^#]+\s+)?(umask\s+)(\S+\s*)(\s+.*)?$/\1\2027\4/gI' "$file"
         done
         l_test2_rem=remediated
      fi
      
      if [ "$l_test1_rem" = remediated ] || [ "$l_test2_rem" = remediated ]; then
         test=remediated
      fi
      
      echo -e "- End remediation - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_default_user_umask_027_more_restrictive_v2_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_default_user_umask_027_more_restrictive_v2_fix
         ensure_default_user_umask_027_more_restrictive_v2_chk
      fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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