#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_authselect_includes_faillock.sh
# 
# Name                Date       Description
# ----------------------------------------------------------------------------------------
# Justin Brown       03/08/23    Recommendation "Ensure custom authselect profile is used"
# David neilson	     03/31/23	 Checks for specific strings in two files.

fed_ensure_authselect_includes_faillock()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   	l_test=""

    fed_ensure_authselect_includes_faillock_chk()
	{
      	echo -e "- Start check - Ensure authselect includes with-faillock" | tee -a "$LOG" 2>> "$ELOG"
      	l_password_auth="" l_password_account="" l_system_auth="" l_system_account=""

        l_password_auth="$(grep -PHi -- '^\h*auth\h+(required|requisite)\h+pam_faillock.so' /etc/pam.d/password-auth)"
		l_password_account="$(grep -PHi -- '^\h*account\h+(required|requisite)\h+pam_faillock.so' /etc/pam.d/password-auth)"
        l_system_auth="$(grep -PHi -- '^\h*auth\h+(required|requisite)\h+pam_faillock.so' /etc/pam.d/system-auth)"
		l_system_account="$(grep -PHi -- '^\h*account\h+(required|requisite)\h+pam_faillock.so' /etc/pam.d/system-auth)"

		# Check files /etc/pam.d/password-auth and /etc/pam.d/system-auth to verify '^\h*auth\h+(required|requisite)\h+pam_faillock.so' and '^\h*account\h+(required|requisite)\h+pam_faillock.so' exist in both.
        if [ -n "$l_password_auth" ] && [ -n "$l_password_account" ] && [ -n "$l_system_auth" ] && [ -n "$l_system_account" ] ; then
			echo -e "- PASS:\n- 'pam_faillock.so' seems to be used in /etc/pam.d/password-auth and /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- Found Entries:\n$l_password_auth\n\n$l_password_account\n\n$l_system_auth\n\n$l_system_account" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure authselect includes with-faillock" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- 'pam_faillock.so' does NOT seem to be used in /etc/pam.d/password-auth and/or /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
            [ -z "$l_password_auth" ] && echo -e "- 'auth pam_faillock.so' NOT found in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            [ -z "$l_system_auth" ] && echo -e "- 'auth pam_faillock.so' NOT found in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
			[ -z "$l_password_account" ] && echo -e "- 'account pam_faillock.so' NOT found in /etc/pam.d/password-auth" | tee -a "$LOG" 2>> "$ELOG"
            [ -z "$l_system_account" ] && echo -e "- 'account pam_faillock.so' NOT found in /etc/pam.d/system-auth" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure authselect includes with-faillock" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   	}

    fed_ensure_authselect_includes_faillock_fix()
	{
		echo -e "- Start remediation - Ensure authselect includes with-faillock" | tee -a "$LOG" 2>> "$ELOG"

        echo -e "- Run the following commands to include the with-faillock option to the current authselect profile:" | tee -a "$LOG" 2>> "$ELOG"
        echo -e "  # authselect enable-feature with-faillock\n  # authselect apply-changes" | tee -a "$LOG" 2>> "$ELOG"
        l_test="manual"

        echo -e "- End remediation - Ensure authselect includes with-faillock" | tee -a "$LOG" 2>> "$ELOG"
   	}

    fed_ensure_authselect_includes_faillock_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        fed_ensure_authselect_includes_faillock_fix
        if [ "$l_test" != "manual" ]; then
            fed_ensure_authselect_includes_faillock_chk
            if [ "$?" = "101" ]; then
                [ "$l_test" != "failed" ] && l_test="remediated"
            else
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