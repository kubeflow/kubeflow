#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_login_logout_events_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/01/20    Recommendation "Ensure login and logout events are collected"
# David Neilson	     07/27/22	 Updated to latest standards
# David Neilson	     09/24/22	 Sets up faillock or tally if necessary
fed_ensure_login_logout_events_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
		
	pam_faillock_lockout_chk()
	{
      		l_file="" l_faillock_t0="" l_faillock_t1="" l_faillock_t2="" l_faillock_t3="" l_faillock_t4="" l_faillock_t5=""
      
      		# Check /etc/pam.d/system-auth auth section
      		l_file="/etc/pam.d/system-auth"
      		echo -e "- Checking $l_file" | tee -a "$LOG" 2>> "$ELOG"
      
      		# Check preauth
      		if grep -Pq '^\s*auth\s+(?:required|requisite)\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(preauth|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(preauth|deny=[1-5])\b' "$l_file"; then
         	echo -e "- $(grep -P '^\s*auth\s+(?:required|requisite)\s+pam_faillock.so.*preauth\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_faillock_t0=passed
      		else
         		echo -e "- 'auth required pam_faillock.so preauth deny=5' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check authfail
		if grep -Pq '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(authfail|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(authfail|deny=[1-5])\b' "$l_file"; then
			echo -e "- $(grep -P '^\s*auth\s+\[default=die\]\s+pam_faillock.so.*authfail\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_faillock_t1=passed
      		else
         		echo -e "- 'auth [default=die] pam_faillock.so deny=5' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check /etc/pam.d/system-auth account section
		if grep -Eq '^\s*account\s+required\s+pam_faillock.so\s*' "$l_file"; then
			echo -e "- $(grep -P '^\s*account\s+required\s+pam_faillock.so\s*' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_faillock_t2=passed
      		else
         		echo -e "- 'account required pam_faillock.so' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check /etc/pam.d/password-auth auth section
		l_file="/etc/pam.d/password-auth"
      		echo -e "- Checking $l_file" | tee -a "$LOG" 2>> "$ELOG"
      
      		# Check preauth
		if grep -Pq '^\s*auth\s+(?:required|requisite)\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(preauth|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(preauth|deny=[1-5])\b' "$l_file"; then
			echo -e "- $(grep -P '^\s*auth\s+(?:required|requisite)\s+pam_faillock.so.*preauth\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_faillock_t3=passed
      		else
         		echo -e "- 'auth required pam_faillock.so preauth deny=5' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check authfail
		if grep -Pq '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(authfail|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(authfail|deny=[1-5])\b' "$l_file"; then
			echo -e "- $(grep -P '^\s*auth\s+\[default=die\]\s+pam_faillock.so.*authfail\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_faillock_t4=passed
      		else
         		echo -e "- 'auth [default=die] pam_faillock.so deny=5' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check /etc/pam.d/password-auth account section
      		if grep -Eq '^\s*account\s+required\s+pam_faillock.so\s*' "$l_file"; then
			echo -e "- $(grep -P '^\s*account\s+required\s+pam_faillock.so\s*' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_faillock_t5=passed
      		else
         		echo -e "- 'account required pam_faillock.so' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		if [ "$l_faillock_t0" = passed ] && [ "$l_faillock_t1" = passed ] && [ "$l_faillock_t2" = passed ]  && [ "$l_faillock_t3" = passed ] && [ "$l_faillock_t4" = passed ] && [ "$l_faillock_t5" = "passed" ]; then
			l_faillock="yes"
			echo -e "- PASS:\n- All lockout settings are configured in /etc/pam.d/system-auth and /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
         		echo -e "- FAIL:\n- Some lockout settings are mis-configured in /etc/pam.d/system-auth and /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   	}
	
	pam_tally2_lockout_chk()
	{
      		l_file="" l_tally2_t0="" l_tally2_t1="" l_tally2_t2="" l_tally2_t3=""
      
      		# Check /etc/pam.d/system-auth auth section
      		l_file="/etc/pam.d/system-auth"
      		echo -e "- Checking $l_file" | tee -a "$LOG" 2>> "$ELOG"
      
      		# Check auth required
      		if grep -P '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' "$l_file" | grep -Pq 'deny=[1-5]'; then
			echo -e "- $(grep -P '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_tally2_t0=passed
      		else
         		echo -e "- 'auth required pam_tally2.so deny=5' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check account section
		if grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' "$l_file"; then
			echo -e "- $(grep -P '^\s*account\s+required\s+pam_tally2.so\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_tally2_t1=passed
      		else
         		echo -e "- 'account required pam_tally2.so' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check /etc/pam.d/password-auth auth section
      		l_file="/etc/pam.d/password-auth"
      		echo -e "- Checking $l_file" | tee -a "$LOG" 2>> "$ELOG"
      
      		# Check auth required
      		if grep -P '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' "$l_file" | grep -Pq 'deny=[1-5]'; then
			echo -e "- $(grep -P '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_tally2_t2=passed
      		else
         		echo -e "- 'auth required pam_tally2.so deny=5' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		# Check account section
		if grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' "$l_file"; then
			echo -e "- $(grep -P '^\s*account\s+required\s+pam_tally2.so\b' "$l_file") found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
			l_tally2_t3=passed
      		else
        		echo -e "- 'account required pam_tally2.so' NOT found in $l_file" | tee -a "$LOG" 2>> "$ELOG"
      		fi
      
      		if [ "$l_tally2_t0" = passed ] && [ "$l_tally2_t1" = passed ] && [ "$l_tally2_t2" = passed ]  && [ "$l_tally2_t3" = passed ]; then
			l_tally2="yes"
			echo -e "- PASS:\n- All lockout settings are configured in /etc/pam.d/system-auth and /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
         		echo -e "- FAIL:\n- Some lockout settings are mis-configured in /etc/pam.d/system-auth and /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   	}

	pam_chk()
	{
		echo -e "- Start check - Determining if pam tally or pam faillock is configured" | tee -a "$LOG" 2>> "$ELOG"
      
		if grep -Eq '^\s*auth\s+required\s+pam_tally2.so\b' /etc/pam.d/system-auth && grep -Eq '^\s*auth\s+required\s+pam_tally2.so\b' /etc/pam.d/password-auth && grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/system-auth && grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/password-auth; then
      
         		pam_tally2_lockout_chk
      		else
         		pam_faillock_lockout_chk
      		fi
	}

	pam_fix()
	{
      		l_tally2_r0="" l_tally2_r1="" l_tally2_r2="" l_tally2_r3=""
      		l_faillock_r0="" l_faillock_r1="" l_faillock_r2="" l_faillock_r3="" l_faillock_r4="" l_faillock_r5=""
   
      		echo -e "- Start remediation - Configuring pam tally or pam faillock" | tee -a "$LOG" 2>> "$ELOG"
      
		if grep -Eq '^\s*auth\s+required\s+pam_tally2.so\b' /etc/pam.d/system-auth && grep -Eq '^\s*auth\s+required\s+pam_tally2.so\b' /etc/pam.d/password-auth && grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/system-auth && grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/password-auth; then
         		echo -e "- Modifying pam_tally2.so entries" | tee -a "$LOG" 2>> "$ELOG"
         
         		# Set /etc/pam.d/system-auth auth section
         		if grep -E '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' /etc/pam.d/system-auth | grep -Eq 'deny='; then
            			echo -e "- Updating deny entry in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_tally2.so\s+)([^#]+\s+)?(deny=\S+\s+)(.*)$/\1\3 deny=5 \5/' /etc/pam.d/system-auth
			else
            			echo -e "- Adding deny entry to /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_tally2.so\s+)([^#]+\s*)?(.*)?$/\1\3 deny=5 \4/' /etc/pam.d/system-auth
			fi
         
         		grep -E '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' /etc/pam.d/system-auth | grep -Eq 'deny=[1-5]' && l_tally2_r0=remediated
         
         		# Set /etc/pam.d/system-auth account section
         		if ! grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/system-auth; then
            			echo -e "- Adding account required entry to /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
            			sed -ri '/^\s*account\s+required\s+/i account     required     pam_tally2.so' /etc/pam.d/system-auth
                        	grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/system-auth && l_tally2_r1=remediated
         		else
            			l_tally2_r1=remediated
         		fi
         
         		# Set /etc/pam.d/password-auth auth section
         		if grep -E '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' /etc/pam.d/password-auth | grep -Eq 'deny='; then
            			echo -e "- Updating deny entry in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_tally2.so\s+)([^#]+\s+)?(deny=\S+\s+)(.*)$/\1\3 deny=5 \5/' /etc/pam.d/password-auth
			else
            			echo -e "- Adding deny entry to /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_tally2.so\s+)([^#]+\s*)?(.*)?$/\1\3 deny=5 \4/' /etc/pam.d/password-auth
			fi
         
         		grep -E '^\s*auth\s+(required|requisite)\s+pam_tally2.so\b' /etc/pam.d/password-auth | grep -Eq 'deny=[1-5]' && l_tally2_r2=remediated
         
         		# Set /etc/pam.d/password-auth account section
         		if ! grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/password-auth; then
            			echo -e "- Adding account required entry to /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            			sed -ri '/^\s*account\s+required\s+/i account     required     pam_tally2.so' /etc/pam.d/password-auth
            
            			grep -Eq '^\s*account\s+required\s+pam_tally2.so\s*' /etc/pam.d/password-auth && l_tally2_r3=remediated
         		else
            			l_tally2_r3=remediated
         		fi
         
         		if [ "$l_tally2_r0" = remediated ] && [ "$l_tally2_r1" = remediated ] && [ "$l_tally2_r2" = remediated ]  && [ "$l_tally2_r3" = remediated ]; then
            			l_test=remediated
				echo -e "- End remediation - pam tally is configured" | tee -a "$LOG" 2>> "$ELOG"
         		fi
      		else
         		echo -e "- Modifying pam_faillock.so entries" | tee -a "$LOG" 2>> "$ELOG"
         
         		# Set /etc/pam.d/system-auth auth section
         		# Set preauth         
         		if grep -E '^\s*auth\s+(required|requisite)\s+pam_faillock.so\s+([^#]+)?preauth\b' /etc/pam.d/system-auth | grep -Eq 'deny='; then
            		echo -e "- Updating preauth deny entry in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_faillock.so\s+)([^#]+\s+)?(deny=\S+\s+)(.*)$/\1\3 deny=5 \5/' /etc/pam.d/system-auth
				elif grep -Eq '^\s*auth\s+(required|requisite)\s+pam_faillock.so\s+([^#]+)?preauth\b' /etc/pam.d/system-auth; then
            		echo -e "- Adding preauth deny entry in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_faillock.so\s+)([^#]+\s*)?(.*)?$/\1\3 deny=5 \4/' /etc/pam.d/system-auth
			else
            			echo -e "- Inserting preauth entry in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri '/^\s*auth\s+required\s+pam_env.so\b/a auth        required      pam_faillock.so preauth silent audit deny=5 unlock_time=900' /etc/pam.d/system-auth
			fi
			grep -Pq '^\s*auth\s+(?:required|requisite)\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(preauth|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(preauth|deny=[1-5])\b' /etc/pam.d/system-auth && l_faillock_r0=remediated
          
         		# Set authfail
         		if grep -E '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+([^#]+)?authfail\b' /etc/pam.d/system-auth | grep -Eq 'deny='; then
            			echo -e "- Updating authfail deny entry in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+\[default=die\]\s+pam_faillock.so\s+)([^#]+\s+)?(deny=\S+\s+)(.*)$/\1\2 deny=5 \4/' /etc/pam.d/system-auth
			elif grep -Eq '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+([^#]+)?authfail\b' /etc/pam.d/system-auth; then
            			echo -e "- Adding authfail deny entry in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+\[default=die\]\s+pam_faillock.so\s+)([^#]+\s*)?(.*)?$/\1\2 deny=5 \3/' /etc/pam.d/system-auth
			else
            			echo -e "- Inserting authfail entry to /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri '/^\s*auth\s+(required|requisite)\s+pam_(succeed_if|deny).so\b/i auth        [default=die] pam_faillock.so authfail audit deny=5 unlock_time=900' /etc/pam.d/system-auth
			fi
         
			grep -Pq '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(authfail|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(authfail|deny=[1-5])\b' /etc/pam.d/system-auth && l_faillock_r1=remediated
          
         		# Set /etc/pam.d/system-auth account section
         		if ! grep -Eq '^\s*account\s+required\s+pam_faillock.so\s*' /etc/pam.d/system-auth; then
            			echo -e "- Inserting account required entry to /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
            			sed -ri '/^\s*account\s+required\s+/i account     required     pam_faillock.so' /etc/pam.d/system-auth
         		fi

         		grep -Eq '^\s*account\s+required\s+pam_faillock.so\s*' /etc/pam.d/system-auth && l_faillock_r2=remediated 
         
         		# Set /etc/pam.d/password-auth auth section
         		# Set preauth         
         		if grep -E '^\s*auth\s+(required|requisite)\s+pam_faillock.so\s+([^#]+)?preauth\b' /etc/pam.d/password-auth | grep -Eq 'deny='; then
            			echo -e "- Updating preauth deny entry in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_faillock.so\s+)([^#]+\s+)?(deny=\S+\s+)(.*)$/\1\3 deny=5 \5/' /etc/pam.d/password-auth
			elif grep -Eq '^\s*auth\s+(required|requisite)\s+pam_faillock.so\s+([^#]+)?preauth\b' /etc/pam.d/password-auth; then
            			echo -e "- Adding preauth deny entry in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+(required|requisite)\s+pam_faillock.so\s+)([^#]+\s*)?(.*)?$/\1\2 deny=5 \3/' /etc/pam.d/password-auth
			else
            			echo -e "- Inserting preauth entry in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri '/^\s*auth\s+required\s+pam_env.so\b/a auth        required      pam_faillock.so preauth silent audit deny=5 unlock_time=900' /etc/pam.d/password-auth
			fi
			
			grep -Pq '^\s*auth\s+(?:required|requisite)\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(preauth|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(preauth|deny=[1-5])\b' /etc/pam.d/password-auth && l_faillock_r3=remediated
          
          
         		# Set authfail
         		if grep -E '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+([^#]+)?authfail\b' /etc/pam.d/password-auth | grep -Eq 'deny='; then
            			echo -e "- Updating authfail deny entry in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+\[default=die\]\s+pam_faillock.so\s+)([^#]+\s+)?(deny=\S+\s+)(.*)$/\1\2 deny=5 \4/' /etc/pam.d/password-auth
			elif grep -Eq '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+([^#]+)?authfail\b' /etc/pam.d/password-auth; then
            			echo -e "- Adding authfail deny entry in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/^\s*(auth\s+\[default=die\]\s+pam_faillock.so\s+)([^#]+\s*)?(.*)?$/\1\2 deny=5 \3/' /etc/pam.d/password-auth
			else
            			echo -e "- Inserting authfail entry to /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri '/^\s*auth\s+(required|requisite)\s+pam_(succeed_if|deny).so\b/i auth        [default=die] pam_faillock.so authfail audit deny=5 unlock_time=900' /etc/pam.d/password-auth
			fi
         
			grep -Pq '^\s*auth\s+\[default=die\]\s+pam_faillock.so\s+(?:[^#]+\s+)?(?!\2)(authfail|deny=[1-5])\s*(?:[^#]+\s+)?(?!\1)(authfail|deny=[1-5])\b' /etc/pam.d/password-auth && l_faillock_r4=remediated
          
         		# Set /etc/pam.d/password-auth account section
         		if ! grep -Eq '^\s*account\s+required\s+pam_faillock.so\s*' /etc/pam.d/password-auth; then
            			echo -e "- Inserting account required entry to /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            			sed -ri '/^\s*account\s+required\s+/i account     required     pam_faillock.so' /etc/pam.d/password-auth
         		fi

         		grep -Eq '^\s*account\s+required\s+pam_faillock.so\s*' /etc/pam.d/password-auth && l_faillock_r5=remediated
         
			if [ "$l_faillock_r0" = remediated ] && [ "$l_faillock_r1" = remediated ] && [ "$l_faillock_r2" = remediated ]  && [ "$l_faillock_r3" = remediated ]  && [ "$l_faillock_r4" = remediated ]  && [ "$l_faillock_r5" = remediated ]; then
            			l_test=remediated
				echo -e "- End remediation - pam faillock is configured" | tee -a "$LOG" 2>> "$ELOG"
         		fi
      		fi
      
   	}
	
	fed_ensure_login_logout_events_collected_chk()
	{
		l_test1=""
		l_test2=""
			
		echo -e "- Start check - Ensure login and logout events are collected" | tee -a "$LOG" 2>> "$ELOG"
      
      		# Run these commands and verify the appropriate strings are in /etc/audit/rules.d/*.rules file, and is also part of the output of auditctl -l.
		if [ "$l_faillock" = "yes" ]; then
			if grep -Eqs '^\s*-w\s*/var/log/lastlog\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b' /etc/audit/rules.d/*.rules && grep -Eqs '^\s*-w\s*/var/run/faillock/\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b' /etc/audit/rules.d/*.rules; then
				l_test1="passed"
			fi
			if auditctl -l | grep -Eqs '^\s*-w\s*/var/log/lastlog\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b' && auditctl -l | grep -Eqs '^\s*-w\s*/var/run/faillock[/]*\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b'; then
				l_test2="passed"
			fi
		else # $l_tally2="yes"
			if grep -Eqs '^\s*-w\s*/var/log/lastlog\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b' /etc/audit/rules.d/*.rules && grep -Eqs '^\s*-w\s*/var/log/tallylog\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b' /etc/audit/rules.d/*.rules; then
				l_test1="passed"
			fi
			if auditctl -l | grep -Eqs '^\s*-w\s*/var/log/lastlog\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b' && auditctl -l | grep -Eqs '^\s*-w\s*/var/log/tallylog\s*([^#]*\s*)?-p\s*wa\s+-k\s+\S+([^#]*\s*)?\b'; then
				l_test2="passed"
			fi
		fi

		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" ]; then
			echo -e "- PASS:\n- ensure login and logout events are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - events are collected" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$l_test1" = "passed" ]; then
			echo -e "- Remediation required to ensure login and logout events are collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-106}"
		else
			echo "- FAILED:"  | tee -a "$LOG" 2>> "$ELOG"
			echo "- login and logout events are NOT being properly collected"  | tee -a "$LOG" 2>> "$ELOG"
		   	echo "- End check - events not collected" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	fed_ensure_login_logout_events_collected_fix()
	{
		echo "- Start remediation - Ensuring login and logout events are collected" | tee -a "$LOG" 2>> "$ELOG"

		if grep -Eqs '^\s*-w\s*/var/log/lastlog\s*[^#]*-p\s*wa\s+-k\s+\S+' /etc/audit/rules.d/*.rules; then
			:
		elif grep -Eqs '^\s*-w\s*/var/log/lastlog\s*' /etc/audit/rules.d/*.rules; then
			sed -ri 's/\s*(#*\s*)?(-w\s*\/var\/log\/lastlog\s*)(.*)$/\2 -p wa -k logins/' /etc/audit/rules.d/*.rules
		else
			echo "-w /var/log/lastlog -p wa -k logins" >> /etc/audit/rules.d/50-logins.rules
		fi

		if [ "$l_faillock" = "yes" ]; then
			if grep -Eqs '^\s*-w\s*/var/run/faillock/\s*[^#]*-p\s*wa\s+-k\s+\S+' /etc/audit/rules.d/*.rules; then
				:
			elif grep -Eqs '^\s*-w\s*/var/run/faillock/\s*' /etc/audit/rules.d/*.rules; then
				sed -ri 's/\s*(#*\s*)?(-w\s*\/var\/run\/faillock\/\s*)(.*)$/\2 -p wa -k logins/' /etc/audit/rules.d/*.rules
			else
				echo "-w /var/run/faillock/ -p wa -k logins" >> /etc/audit/rules.d/50-logins.rules
			fi
		else
			if grep -Eqs '^\s*-w\s*/var/log/tallylog\s*[^#]*-p\s*wa\s+-k\s+\S+' /etc/audit/rules.d/*.rules; then
				:
			elif grep -Eqs '^\s*-w\s*/var/log/tallylog\s*' /etc/audit/rules.d/*.rules; then
				sed -ri 's/\s*(#*\s*)?(-w\s*\/var\/log\/tallylog\s*)(.*)$/\2 -p wa -k logins/' /etc/audit/rules.d/*.rules
			else
				echo "-w /var/log/tallylog -p wa -k logins" >> /etc/audit/rules.d/50-logins.rules
			fi
		fi
		
		echo "- Reboot required to reload the active auditd configuration settings" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"
	}

	pam_chk
	if [ "$?" != "101" ]; then
		pam_fix
		pam_chk
		if [ "$?" != "101" ]; then
			l_test="failed"
		fi
	fi		

	if [ "$l_test" != "failed" ]; then
		fed_ensure_login_logout_events_collected_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="passed"
		else
			fed_ensure_login_logout_events_collected_fix
			[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
			fed_ensure_login_logout_events_collected_chk
			if [ "$?" = "101" -o "$?" != "106" ]; then
				l_test="failed" 
			fi
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