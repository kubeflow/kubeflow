#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed28_ensure_password_hashing_algorithm_sha512.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/05/20    Recommendation "Ensure password hashing algorithm is SHA-512"
# Justin Brown       06/04/22    Updated to modern format
# David Neilson      04/01/23    Added checking for libuser.conf and login.defs
 
fed28_ensure_password_hashing_algorithm_sha512()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   l_link=""
   
   fed28_ensure_password_hashing_algorithm_sha512_chk()
	{
      echo -e "- Start check - Ensure password hashing algorithm is SHA-512" | tee -a "$LOG" 2>> "$ELOG"
      l_sa_test="" l_pa_test="" l_libuser_test="" l_login_test=""
      
      # Check system-auth file
      if grep -P -- '^\h*password\h+(requisite|required|sufficient)\h+pam_unix\.so(\h+[^#\n\r]+)?\h+(sha512|yescrypt)\b.*$' /etc/pam.d/system-auth; then
         echo -e "- $(grep -P -- '^\s*password\s+(\S+\s+)+pam_unix\.so\s+([^#]+\s+)?(sha512|yescrypt)\b' /etc/pam.d/system-auth) found in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
         l_sa_test=passed
      else
         echo -e "- 'password sufficient pam_unix.so sha512 shadow try_first_pass use_authtok remember=5' NOT found in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      # Check password-auth file
      if grep -P -- '^\h*password\h+(requisite|required|sufficient)\h+pam_unix\.so(\h+[^#\n\r]+)?\h+(sha512|yescrypt)\b.*$' /etc/pam.d/password-auth; then
         echo -e "- $(grep -P -- '^\s*password\s+(\S+\s+)+pam_unix\.so\s+([^#]+\s+)?(sha512|yescrypt)\b' /etc/pam.d/password-auth) found in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
         l_pa_test=passed
      else
         echo -e "- 'password sufficient pam_unix.so sha512 shadow try_first_pass use_authtok remember=5' NOT found in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
      fi
      
      # Check libuser.conf file
      if grep -Pi -- '^\h*crypt_style\h*=\h*(sha512|yescrypt)\b' /etc/libuser.conf; then
         echo -e "- $(grep -P -- '^\h*crypt_style\h*=\h*(sha512|yescrypt)\b' /etc/libuser.conf) found in /etc/libuser.conf" | tee -a "$LOG" 2>> "$ELOG"
         l_libuser_test=passed
      else
         echo -e "- 'crypt_style = sha512' NOT found in /etc/libuser.conf" | tee -a "$LOG" 2>> "$ELOG"
      fi

     # Check login.defs file
      if grep -Pi -- '^\h*ENCRYPT_METHOD\h+(SHA512|yescrypt)\b' /etc/login.defs; then
         echo -e "- $(grep -Pi -- '^\h*ENCRYPT_METHOD\h+(SHA512|yescrypt)\b' /etc/login.defs) found in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
         l_login_test=passed
      else
         echo -e "- 'ENCRYPT_METHOD SHA512' NOT found in /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
      fi

      if [ "$l_sa_test" = passed ] && [ "$l_pa_test" = passed ] && [ "$l_libuser_test" = passed ] && [ "$l_login_test" = passed ]; then
			echo -e "- PASS:\n- All password hashing settings are configured in /etc/pam.d/system-auth, /etc/pam.d/password-auth, /etc/libuser.conf, and /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password hashing algorithm is SHA-512" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
            echo -e "- FAIL:\n- Some password hashing settings are mis-configured in /etc/pam.d/system-auth and/or /etc/pam.d/password-auth and/or /etc/libuser.conf and/or /etc/login.defs" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure password hashing algorithm is SHA-512" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   }
   
   fed28_ensure_password_hashing_algorithm_sha512_fix()
	{
        echo -e "- Start remediation - Ensure password hashing algorithm is SHA-512" | tee -a "$LOG" 2>> "$ELOG"
             
        # Set libuser.conf file
        if [ -z "$l_libuser_test" ]; then
            if ! grep -Pi -- '^\h*crypt_style\h*=\h*(sha512|yescrypt)\b' /etc/libuser.conf; then
                if grep -Pq -- '^\h*crypt_style' /etc/libuser.conf; then
                    sed -ri 's/^\s*(crypt_style)(.*)$/\1 = sha512/' /etc/libuser.conf
                else
                    echo "crypt_style = sha512" >> /etc/libuser.conf
                fi
            fi
            grep -Pi -- '^\h*crypt_style\h*=\h*(sha512|yescrypt)\b' /etc/libuser.conf && l_libuser_test=remediated
        fi 

        if [ -z "$l_login_test" ]; then
            # Set login.defs file
            if ! grep -Pi -- '^\h*ENCRYPT_METHOD\h+(SHA512|yescrypt)\b' /etc/login.defs; then
                if grep -Pq -- '^\h*ENCRYPT_METHOD' /etc/login.defs; then
                    sed -ri 's/^\s*(ENCRYPT_METHOD)(.*)$/\1 SHA512/' /etc/login.defs
                else
                    echo "ENCRYPT_METHOD SHA512" >> /etc/login.defs
                fi
            fi
            grep -Pi -- '^\h*ENCRYPT_METHOD\h+(SHA512|yescrypt)\b' /etc/login.defs && l_login_test=remediated
        fi

        if [ -z "$l_sa_test" ] || [ -z "$l_pa_test" ]; then
            # Run the following script to configure pam_unix.so to use the sha512 hashing algorithm:
            for l_fn in system-auth password-auth; do
                # Determine whether /etc/pam.d/*-auth files are symbolic links.
                if [ -L "/etc/pam.d/$l_fn" ]; then
                        l_file="/etc/authselect/$(head -1 /etc/authselect/authselect.conf | grep 'custom/')/$l_fn"
                        l_link="yes"
                else
                        l_file=/etc/pam.d/$l_fn
                fi 
                if ! grep -Pq -- '^\h*password\h+(requisite|required|sufficient)\h+pam_unix\.so(\h+[^#\n\r]+)?\h+sha512\b.*$' "$l_file"; then
                    ###if grep -Pq -- '^\h*password\h+(requisite|required|sufficient)\h+pam_unix\.so(\h+[^#\n\r]+)?\h+(md5|blowfish|bigcrypt|sha256|yescrypt)\b.*$' "$l_file"; then  # doesn't work for sha128
                    if grep -Pq -- '^\h*password\h+(requisite|required|sufficient)\h+pam_unix\.so(\h+[^#\n\r]+)?\h+(md5|blowfish|bigcrypt|sha\d+|yescrypt)\b.*$' "$l_file"; then
                        ###sed -ri 's/(md5|blowfish|bigcrypt|sha256|yescrypt)/sha512/' "$l_file" # doesn't work with sha128
                        sed -ri 's/(md5|blowfish|bigcrypt|sha\S+|yescrypt)/sha512/' "$l_file" # "sha\d+" won't work because the sed command seems to see "sha128" or "sha256" as a string with no numbers
                    else
                        sed -ri 's/(^\s*password\s+(requisite|required|sufficient)\s+pam_unix.so\s+)(.*)$/\1sha512 \3/' "$l_file"
                    fi
                fi
            done
            [ -n "$l_link" ] && authselect apply-changes # Only run authselect if the /etc/pam.d/*-auth files are symbolic links.
            grep -Pq -- '^\s*password\s+(\S+\s+)+pam_unix\.so\s+([^#]+\s+)?sha512\b' /etc/pam.d/system-auth && l_sa_test=remediated
            grep -Pq -- '^\s*password\s+(\S+\s+)+pam_unix\.so\s+([^#]+\s+)?sha512\b' /etc/pam.d/password-auth && l_pa_test=remediated
        fi 

        if [ "$l_sa_test" = remediated -o "$l_sa_test" = passed ] && [ "$l_pa_test" = remediated -o "$l_pa_test" = passed ] && [ "$l_libuser_test" = remediated -o "$l_libuser_test" = passed ] && [ "$l_login_test" = remediated -o "$l_login_test" = passed ] ; then
            l_test=remediated
        fi
      
        echo -e "- Remediation only effects local users and passwords created after updating the files to use sha512.  Those users who did not use the SAH-512 password algorithm should change their passwords immediately." | tee -a "$LOG" 2>> "$ELOG"
        echo -e "- End remediation - Ensure password hashing algorithm is SHA-512" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   fed28_ensure_password_hashing_algorithm_sha512_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            fed28_ensure_password_hashing_algorithm_sha512_fix
            [ "$l_test" = "remediated" ] || l_test="failed"
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