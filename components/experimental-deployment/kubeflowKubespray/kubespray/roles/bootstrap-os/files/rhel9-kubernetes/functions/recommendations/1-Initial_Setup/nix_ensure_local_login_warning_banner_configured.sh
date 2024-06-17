#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_local_login_warning_banner_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/21/20    Recommendation "Ensure local login warning banner is configured properly"
# David Neilson	   04/09/22	 	Updated to run separate chk and fix functions
# Justin Brown			09/03/22		Small syntax changes

ensure_local_login_warning_banner_configured()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_local_login_warning_banner_configured_chk()
	{
		echo -e "- Start check - Ensure local login warning banner is configured properly" | tee -a "$LOG" 2>> "$ELOG"

		if [ -e /etc/issue ]; then
			if grep -E -i "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" /etc/issue > /dev/null; then
				# print the reason why we are failing
				echo -e "- FAILED:\n- /etc/issue contains $(grep -E -i "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" /etc/issue)"  | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure local login warning banner is configured properly" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_FAIL:-102}"
			else
				echo -e "- PASS:\n- /etc/issue is configured properly"  | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure local login warning banner is configured properly" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
			fi
		else
			echo -e "- FAIL:\n- /etc/issue  does NOT exist"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure local login warning banner is configured properly" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		fi
	}

	ensure_local_login_warning_banner_configured_fix()
	{
		echo -e "- Start remediation - Ensure local login warning banner is configured properly" | tee -a "$LOG" 2>> "$ELOG"

		echo "Authorized uses only. All activity may be monitored and reported." > /etc/issue

		echo -e "- End remediation - Ensure local login warning banner is configured properly" | tee -a "$LOG" 2>> "$ELOG"

	}

	ensure_local_login_warning_banner_configured_chk
	if [ "$?" = "101" ] ; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_local_login_warning_banner_configured_fix
		ensure_local_login_warning_banner_configured_chk
		if [ "$?" = "101" ] ; then
			[ "$l_test" != "failed" ] && l_test="remediated"
		else
			l_test="failed"
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