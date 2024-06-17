#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_motd_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/20/20    Recommendation "Ensure message of the day is configured properly"
# Eric Pinnell       11/25/20    Modified "Updated to use a case insensitive sed search and replace"
# Justin Brown			09/05/22		Updated to modern format
#

ensure_motd_configured()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	ensure_motd_configured_chk()
	{
		echo -e "- Start check - Ensure message of the day is configured properly" | tee -a "$LOG" 2>> "$ELOG"

		if [ -e /etc/motd ]; then
			if grep -E -i "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" /etc/motd > /dev/null; then
				# print the reason why we are failing
				echo -e "- FAILED:\n- /etc/motd contains $(grep -E -i "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" /etc/motd)"  | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure message of the day is configured properly" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_FAIL:-102}"
			else
				echo -e "- PASS:\n- /etc/motd  is configured properly"  | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure message of the day is configured properly" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
			fi
		else
			echo -e "- PASS:\n- /etc/motd  does NOT exist"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure message of the day is configured properly" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		fi
	}

	ensure_motd_configured_fix()
	{
		echo -e "- Start remediation - Ensure message of the day is configured properly" | tee -a "$LOG" 2>> "$ELOG"

		echo "Authorized uses only. All activity may be monitored and reported." > /etc/motd

		echo -e "- End remediation - Ensure message of the day is configured properly" | tee -a "$LOG" 2>> "$ELOG"

	}

	ensure_motd_configured_chk
	if [ "$?" = "101" ] ; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_motd_configured_fix
		ensure_motd_configured_chk
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