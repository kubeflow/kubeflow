#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed34_ensure_lockout_failed_password_attempts_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       1/2/23    Recommendation "Ensure lockout for failed password attempts is configured"
# 
   
fed34_ensure_lockout_failed_password_attempts_configured()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""
   
    fed34_ensure_lockout_failed_password_attempts_configured_chk()
	{
        echo -e "- Start check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
        l_output="" l_output2=""
        l_faillock_config="" l_config_tst=""

        # Verify settings in /etc/security/faillock.conf
        l_faillock_config="$(grep -P -- '^\s*(deny|unlock_time)\b' /etc/security/faillock.conf)"

        if [ -n "$l_faillock_config" ]; then
            if grep -Pq -- '^\h*deny\h*=\h*[1-5]\b' <<< "$l_faillock_config" && grep -Pq -- '^\h*unlock_time\h*=\h*(900|[1-8][0-9]{2}|[1-9][0-9]|[1-9])\b' <<< "$l_faillock_config"; then
                l_output="$l_output\n- lockout values configured correctly in /etc/security/faillock.conf:\n$l_faillock_config"
                l_config_tst="passed"
            else
                l_output2="$l_output2\n- lockout values NOT configured correctly in /etc/security/faillock.conf:\n$l_faillock_config"
            fi
        else
            l_output2="$l_output2\n- No pam_faillock values found in /etc/security/faillock.conf"
        fi

        if [ -z "$l_output2" ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Failing values:\n$l_output2" | tee -a "$LOG" 2>> "$ELOG"
            if [ -n "$l_output" ]; then
                echo -e "- Passing values:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
            fi
			echo -e "- End check - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
    }
   
    fed34_ensure_lockout_failed_password_attempts_configured_fix()
	{
        echo -e "- Start remediation - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"

        # Update the entries in /etc/security/faillock.conf
        if [ "$l_config_tst" != "passed" ]; then
            echo -e "- Updating /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
            if ! grep -Pq -- '^\h*deny\h*=\h*[1-5]\b' /etc/security/faillock.conf; then
                if grep -Pqs '^\h*(#\h*)?deny\h*=' /etc/security/faillock.conf; then
                    echo -e "- Updating 'deny =' value in /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
                    sed -ri 's/^\s*(#\s*)?(deny\s*=)(\s*\S+\b)(.*)?$/\2 5 \4/' /etc/security/faillock.conf
                else
                    if grep -Eq "^\h*#\h*The\h*default\h*is\h*3\." /etc/security/faillock.conf; then
                        echo -e "- Adding 'deny = 5' to /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
                        sed -ri '/^\s*#\s*The\s*default\s*is\s*3\./a deny = 5' /etc/security/faillock.conf
                    else
                        echo -e "- Inserting 'deny = 4' to end of /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
                        echo "deny = 4" >> /etc/security/faillock.conf
                    fi
                fi
            else
                echo -e "- 'deny =' value set correctly in /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
            fi

            if ! grep -Pq -- '^\h*unlock_time\h*=\h*(900|[1-8][0-9]{2}|[1-9][0-9]|[1-9])\b' /etc/security/faillock.conf; then
                if grep -Pqs '^\h*(#\h*)?unlock_time\h*=' /etc/security/faillock.conf; then
                    echo -e "- Updating 'unlock_time =' value in /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
                    sed -ri 's/^\s*(#\s*)?(unlock_time\s*=)(\s*\S+\b)(.*)?$/\2 900 \4/' /etc/security/faillock.conf
                else
                    if grep -Eq "^\h*#\h*The\h*default\h*is\h*600\h*\(10\h*minutes\)\." /etc/security/faillock.conf; then
                        echo -e "- Adding 'unlock_time = 900' to /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
                        sed -ri '/^\s*#\s*The\s*default\s*is\s*600\s*\(10\s*minutes\)\./a unlock_time = 900' /etc/security/faillock.conf
                    else
                        echo -e "- Inserting 'unlock_time = 900' to end of /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
                        echo "unlock_time = 900" >> /etc/security/faillock.conf
                    fi
                fi
            else
                echo -e "- 'unlock_time =' value set correctly in /etc/security/faillock.conf" | tee -a "$LOG" 2>> "$ELOG"
            fi
        fi

        echo -e "- End remediation - Ensure lockout for failed password attempts is configured" | tee -a "$LOG" 2>> "$ELOG"
    }
   
    fed34_ensure_lockout_failed_password_attempts_configured_chk
    if [ "$?" = "101" ]; then
        [ -z "$l_test" ] && l_test="passed"
    else
        if [ "$l_test" != "NA" ]; then
            fed34_ensure_lockout_failed_password_attempts_configured_fix
            if [ "$l_test" != "manual" ] ; then
                fed34_ensure_lockout_failed_password_attempts_configured_chk
                if [ "$?" = "101" ] ; then
                    [ "$l_test" != "failed" ] && l_test="remediated"
                else
                    l_test="failed"
                fi
            fi
        fi
    fi
	
	# Set return code and return
	case "$l_test" in
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
			echo "Recommendation \"$RNA\" Something went wrong - Recommendation is non applicable" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-104}"
			;;
		*)
			echo "Recommendation \"$RNA\" remediation failed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}