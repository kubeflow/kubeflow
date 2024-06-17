#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_password_reuse_limited.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/05/20    Recommendation "Ensure password reuse is limited"
# Justin Brown       06/04/22    Updated to modern format
# 
 
fed_ensure_password_reuse_limited()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   fed_ensure_password_reuse_limited_chk()
	{
      echo -e "- Start check - Ensure password reuse is limited" | tee -a "$LOG" 2>> "$ELOG"
      file="" l_sa_test="" l_pa_test=""
      
      # Check system-auth file
      file="/etc/pam.d/system-auth"
      if grep -Pqs '^\s*password\s+(sufficient|requisite|required)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         echo -e "- $(grep -P '^\s*password\s+(requisite|sufficient)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file") found in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
         l_sa_test=passed
      elif grep -Pqs '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         echo -e "- $(grep -P '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file") found in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
         l_sa_test=passed
      else
         echo -e "- 'password required pam_pwhistory.so remember=5' NOT found in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      # Check password-auth file
      file="/etc/pam.d/password-auth"
      if grep -Pqs '^\s*password\s+(sufficient|requisite|required)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         echo -e "- $(grep -P '^\s*password\s+(requisite|sufficient)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file") found in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
         l_pa_test=passed
      elif grep -Pqs '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         echo -e "- $(grep -P '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file") found in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
         l_pa_test=passed
      else
         echo -e "- 'password required pam_pwhistory.so remember=5' NOT found in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      if [ "$l_sa_test" = passed ] && [ "$l_pa_test" = passed ]; then
			echo -e "- PASS:\n- All password history settings are configured in /etc/pam.d/system-auth and /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password reuse is limited" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
         echo -e "- FAIL:\n- Some password history settings are mis-configured in /etc/pam.d/system-auth and /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password reuse is limited" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   }
   
   fed_ensure_password_reuse_limited_fix()
	{
      echo -e "- Start remediation - Ensure password hashing algorithm is SHA-512" | tee -a "$LOG" 2>> "$ELOG"
      file=""
      
      
      # Set system-auth file
      file="/etc/pam.d/system-auth"
      
      if ! grep -Eqs '^\s*password\s+(requisite|sufficient)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         if grep -Pqs '^\s*password\s+(sufficient|requisite|required)\s+pam_unix\.so\s+([^#]+\s+)?remember=' "$file"; then
            echo -e "- Updating pam_unix.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_unix\.so\s+)([^#]+\s+)?(remember=[0-9]+)(.*)/\2\3 remember=5 \5/' "$file"
         elif grep -Pqs '^\s*password\s+(sufficient|requisite|required)\s+pam_unix\.so' "$file"; then
            echo -e "- Adding pam_unix.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_unix\.so)(.*)/\2\3 remember=5/' "$file"
         else
            echo -e "- Inserting pam_unix.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/password\s+(\S+)\s+pam_deny\.so\s+/i password    required      pam_unix.so remember=5 use_authtok' "$file"
         fi   
      fi
      
      if ! grep -Eqs '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         if grep -Eqs 'password\s+(requisite|required)\s+pam_pwhistory\.so(\s+[^#]+\s+)?\s*remember=' "$file"; then
            echo -e "- Updating pam_pwhistory.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_pwhistory\.so\s+)([^#]+\s+)?(remember=[0-9]+)(.*)$/\2\3 remember=5 \5/' "$file"
         elif grep -Es 'password\s+(requisite|required)\s+pam_pwhistory\.so' "$file" | grep -vq 'remember='; then
            echo -e "- Adding pam_pwhistory.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_pwhistory\.so\s+)([^#]+\s*)?(#.*)?$/\2\3 remember=5 \4/' "$file"
         else
            echo -e "- Inserting pam_pwhistory.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/password\s+(\S+)\s+pam_unix\.so\s+/ i password    required      pam_pwhistory.so remember=5 use_authtok' "$file"
         fi
      fi     
      
      if grep -Eqs '^\s*password\s+(requisite|sufficient)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file" || grep -Eqs '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         l_sa_fix=remediated
      fi
               
      # Set password-auth file
      file="/etc/pam.d/password-auth"
      
      if ! grep -Eqs '^\s*password\s+(requisite|sufficient)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         if grep -Pqs '^\s*password\s+(sufficient|requisite|required)\s+pam_unix\.so\s+([^#]+\s+)?remember=' "$file"; then
            echo -e "- Updating pam_unix.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_unix\.so\s+)([^#]+\s+)?(remember=[0-9]+)(.*)/\2\3 remember=5 \5/' "$file"
         elif grep -Pqs '^\s*password\s+(sufficient|requisite|required)\s+pam_unix\.so' "$file"; then
            echo -e "- Adding pam_unix.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_unix\.so)(.*)/\2\3 remember=5/' "$file"
         else
            echo -e "- Inserting pam_unix.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/password\s+(\S+)\s+pam_deny\.so\s+/i password    required      pam_unix.so remember=5 use_authtok' "$file"
         fi   
      fi
      
      if ! grep -Eqs '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         if grep -Eqs 'password\s+(requisite|required)\s+pam_pwhistory\.so(\s+[^#]+\s+)?\s*remember=' "$file"; then
            echo -e "- Updating pam_pwhistory.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_pwhistory\.so\s+)([^#]+\s+)?(remember=[0-9]+)(.*)$/\2\3 remember=5 \5/' "$file"
         elif grep -Es 'password\s+(requisite|required)\s+pam_pwhistory\.so' "$file" | grep -vq 'remember='; then
            echo -e "- Adding pam_pwhistory.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri 's/^\s*(#\s*)?(password\s+\S+\s+pam_pwhistory\.so\s+)([^#]+\s*)?(#.*)?$/\2\3 remember=5 \4/' "$file"
         else
            echo -e "- Inserting pam_pwhistory.so password history entry in \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri '/password\s+(\S+)\s+pam_unix\.so\s+/ i password    required      pam_pwhistory.so remember=5 use_authtok' "$file"
         fi
      fi     
      
      if grep -Eqs '^\s*password\s+(requisite|sufficient)\s+pam_unix\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file" || grep -Eqs '^\s*password\s+(requisite|required)\s+pam_pwhistory\.so\s+([^#]+\s+)?remember=([5-9]|[1-9][0-9]+)\b' "$file"; then
         l_pa_fix=remediated
      fi
      
      if [ "$l_sa_fix" = remediated ] || [ "$l_pa_fix" = remediated ]; then
         test=remediated
      fi
   }
   
   fed_ensure_password_reuse_limited_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         fed_ensure_password_reuse_limited_fix
         fed_ensure_password_reuse_limited_chk
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