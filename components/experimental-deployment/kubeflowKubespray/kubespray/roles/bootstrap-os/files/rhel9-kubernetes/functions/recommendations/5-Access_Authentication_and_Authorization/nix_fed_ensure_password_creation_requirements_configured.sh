#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_password_creation_requirements_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/05/20    Recommendation "Ensure password creation requirements are configured"
# Justin Brown       05/14/22    Updated to modern format
# 
   
fed_ensure_password_creation_requirements_configured()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   fed_ensure_password_creation_requirements_configured_chk()
	{
      echo -e "- Start check - Ensure password creation requirements are configured" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_test1="" l_test2="" l_test3=""
      
      # Check password length
      if grep -Eqs '^\s*minlen\s*=\s*(1[4-9]|[2-9][0-9]|[1-9][0-9]{2,})\b' /etc/security/pwquality.conf; then
         l_output="- Correct password length setting found in /etc/security/pwquality.conf: $(grep -Es '^\s*minlen\s*=\s*(1[4-9]|[2-9][0-9]|[1-9][0-9]{2,})\b' /etc/security/pwquality.conf)"
         l_test1=passed
      elif grep -Eqs '^\s*(#\s*)?minlen\s*=' /etc/security/pwquality.conf; then
         l_output="- Incorrect password length setting found in /etc/security/pwquality.conf: $(grep -Es '^\s*(#\s*)?minlen\s*=' /etc/security/pwquality.conf)"
      else
         l_output="- No minlen setting found in /etc/security/pwquality.conf"
      fi
      
      # Check password complexity
      if grep -Eqs '^\s*minclass\s*=\s*4\b' /etc/security/pwquality.conf; then
         l_output="$l_output\n- Correct minclass setting found in /etc/security/pwquality.conf: $(grep -Es '^\s*minclass\s*=\s*4\b' /etc/security/pwquality.conf)"
         l_test2=passed
      elif grep -Eqs '^\s*(#\s*)?minclass\s*=' /etc/security/pwquality.conf; then
         l_output="$l_output\n- Incorrect minclass setting found in /etc/security/pwquality.conf: $(grep -Es '^\s*(#\s*)?minclass\s*=' /etc/security/pwquality.conf)"
      else
         l_output="$l_output\n- No minclass setting found in /etc/security/pwquality.conf"
      fi   
      
      if [ -z "$l_test2" ]; then
         if grep -Eqs '^\s*dcredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf && grep -Eqs '^\s*ucredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf && grep -Eqs '^\s*ocredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf && grep -Eqs '^\s*lcredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf; then
            l_output="$l_output\n- Correct dcredit, ucredit, ocredit and lcredit settings found in /etc/security/pwquality.conf:\n$( grep -Es '^\s*[duol]credit\s*=' /etc/security/pwquality.conf)"
            l_test2=passed
         elif grep -Eqs '^\s*(#\s*)?dcredit\s*=' /etc/security/pwquality.conf || grep -Eqs '^\s*(#\s*)?ucredit\s*=' /etc/security/pwquality.conf && grep -Eqs '^\s*(#\s*)?ocredit\s*=' /etc/security/pwquality.conf || grep -Eqs '^\s*(#\s*)?lcredit\s*=' /etc/security/pwquality.conf; then
            l_output="$l_output\n- Incorrect dcredit, ucredit, ocredit and lcredit settings found in /etc/security/pwquality.conf:\n$( grep -Es '^\s*(#\s*)?[duol]credit\s*=' /etc/security/pwquality.conf)"
         else
            l_output="$l_output\n- No dcredit, ucredit, ocredit or lcredit settings found in /etc/security/pwquality.conf"
         fi
      fi
      
      # Check password retry and try_first_pass
      for file in /etc/pam.d/system-auth /etc/pam.d/password-auth; do
         if grep -Pq '^\s*password\s+(?:requisite|required)\s+pam_pwquality\.so\s+(?:\S+\s+)*(?!\2)(retry=[1-3]|try_first_pass)\s+(?:\S+\s+)*(?!\1)(retry=[1-3]|try_first_pass)\s*(?:\s+\S+\s*)*(?:\s+#.*)?$' "$file"; then
            l_output="$l_output\n- retry and try_first pass found in $file :\n  $(grep -P '^\s*password\s+(?:requisite|required)\s+pam_pwquality\.so\s+(?:\S+\s+)*(?!\2)(retry=[1-3]|try_first_pass)\s+(?:\S+\s+)*(?!\1)(retry=[1-3]|try_first_pass)\s*(?:\s+\S+\s*)*(?:\s+#.*)?$' $file)"
            if [ "$l_test3" != "failed" ]; then
               l_test3=passed
            fi
         else
            l_output="$l_output\n- retry and try_first pass NOT found in $file"
            l_test3=failed
         fi
      done
      
      if [ "$l_test1" = "passed" ] && [ "$l_test2" = "passed" ] && [ "$l_test3" = "passed" ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure permissions on $cron_file are configured." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure permissions on $cron_file are configured." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi

      echo -e "- End check - Ensure password creation requirements are configured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   fed_ensure_password_creation_requirements_configured_fix()
	{
      echo -e "- Start remediation - Ensure password creation requirements are configured" | tee -a "$LOG" 2>> "$ELOG"
      
      if ! grep -Eqs '^\s*minlen\s*=\s*(1[4-9]|[2-9][0-9]|[1-9][0-9][0-9]+)\b' /etc/security/pwquality.conf; then
         if grep -Eqs '^\s*(#\s*)?minlen\s*=' /etc/security/pwquality.conf; then
            echo -e "- Updating minlen entry in /etc/security/pwquality.conf" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(minlen\s*=)(\s*\S+\s*)(\s+#.*)?$/\2 14\4/' /etc/security/pwquality.conf
         else
            echo -e "- Adding minlen entry to /etc/security/pwquality.conf" | tee -a "$LOG" 2>> "$ELOG"
            echo "minlen = 14" >> /etc/ssh/sshd_config
         fi
      fi
      
      if ! grep -Eqs '^\s*dcredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf && ! grep -Eqs '^\s*ucredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf && ! grep -Eqs '^\s*ocredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf && ! grep -Eqs '^\s*lcredit\s*=\s*-[1-9]\b' /etc/security/pwquality.conf; then
         if grep -Eqs '^\s*[duol]credit\s*=' /etc/security/pwquality.conf; then
            echo -e "- Commenting out any dcredit, ucredit, ocredit and lcredit entries in /etc/security/pwquality.conf" | tee -a "$LOG" 2>> "$ELOG"
            grep -Eqs '^\s*dcredit\s*=' /etc/security/pwquality.conf && sed -i 's/^\s*dcredit\s*=/# &/' /etc/security/pwquality.conf
            grep -Eqs '^\s*ucredit\s*=' /etc/security/pwquality.conf && sed -i 's/^\s*ucredit\s*=/# &/' /etc/security/pwquality.conf
            grep -Eqs '^\s*ocredit\s*=' /etc/security/pwquality.conf && sed -i 's/^\s*ocredit\s*=/# &/' /etc/security/pwquality.conf
            grep -Eqs '^\s*lcredit\s*=' /etc/security/pwquality.conf && sed -i 's/^\s*lcredit\s*=/# &/' /etc/security/pwquality.conf
         fi
      fi
      
      if ! grep -Eqs '^\s*minclass\s*=\s*4\b' /etc/security/pwquality.conf; then
         if grep -Eqs '^\s*(#\s*)?minclass\s*=' /etc/security/pwquality.conf; then
            echo -e "- Updating minclass entry in /etc/security/pwquality.conf" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(minclass\s*=)(\s*\S+\s*)(\s+#.*)?$/\2 4\4/' /etc/security/pwquality.conf
         else
            echo -e "- Adding minclass entry to /etc/security/pwquality.conf" | tee -a "$LOG" 2>> "$ELOG"
            echo "minclass = 4" >> /etc/ssh/sshd_config
         fi
      fi
      
      for file in /etc/pam.d/system-auth /etc/pam.d/password-auth; do
         if ! grep -Pq '^\s*password\s+(?:requisite|required)\s+pam_pwquality\.so\s+(?:\S+\s+)*(?!\2)(retry=[1-3]|try_first_pass)\s+(?:\S+\s+)*(?!\1)(retry=[1-3]|try_first_pass)\s*(?:\s+\S+\s*)*(?:\s+#.*)?$' "$file"; then
            if grep -Eqs 'pam_pwquality\.so(\s+[^#]+)?\s*retry=' "$file"; then
               echo -e "- Updating retry entry in $file" | tee -a "$LOG" 2>> "$ELOG"
               sed -ri 's/(^\s*#\s*)?(password\s+(requisite|required)\s+pam_pwquality\.so)(\s+[^#]+\s+)?(retry=)(\S+)?(\s+[^#]+)?$/\2\4\53 \7/' "$file"
            elif grep -Eqs 'password\s+(requisite|required)\s+pam_pwquality\.so' "$file"; then
               echo -e "- Adding retry entry to $file" | tee -a "$LOG" 2>> "$ELOG"
               sed -ri 's/^\s*(#\s*)?(password\s+(requisite|required)\s+pam_pwquality\.so)(\s+[^#]+)?(#.*)?$/\2\4 retry=3 \5/' "$file"
            else
               if grep -Eqs 'password\s+(S+)\s+pam_pwhistory\.so\b' "$file"; then
                  echo -e "- Adding password    requisite     pam_pwquality.so local_users_only retry=3 entry to $file" | tee -a "$LOG" 2>> "$ELOG"
                  sed -ri '/^\s*password\s+(requisite|required|sufficient)\s+(pam_pwhistory\.so)\b.*$/i password    requisite     pam_pwquality.so local_users_only retry=3 ' "$file"
               else
                  echo -e "- Adding password    requisite     pam_pwquality.so local_users_only retry=3 entry to $file" | tee -a "$LOG" 2>> "$ELOG"
                  sed -ri '/^\s*password\s+(requisite|required|sufficient)\s+(pam_unix\.so)\b.*$/i password    requisite     pam_pwquality.so local_users_only retry=3 ' "$file"
               fi
            fi
            
            if ! grep -Eqs 'pam_pwquality\.so(\s+[^#]+)?\s*try_first_pass' "$file"; then
               echo -e "- Adding try_first_pass entry to $file" | tee -a "$LOG" 2>> "$ELOG"
               sed -ri 's/^\s*(#\s*)?(password\s+(requisite|required)\s+pam_pwquality\.so)(\s+[^#]+)?(#.*)?$/\2\4 try_first_pass \5/' "$file"
            fi
         fi
      done
      
      test=remediated
       
      echo -e "- End remediation - Ensure password creation requirements are configured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   fed_ensure_password_creation_requirements_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         fed_ensure_password_creation_requirements_configured_fix
         fed_ensure_password_creation_requirements_configured_chk
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