#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_journald_log_rotation_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/22/22    Recommendation "Ensure journald log rotation is configured per site policy"
#        05/11/22    Updated to modern format
# 

ensure_journald_log_rotation_configured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   l_test=""
   
   ensure_journald_log_rotation_configured_chk()
   {
        echo -e "- Start check - Ensure journald log rotation is configured per site policy" | tee -a "$LOG" 2>> "$ELOG"
        l_params="SystemMaxUse SystemKeepFree RuntimeMaxUse RuntimeKeepFree MaxFileSec"
        l_output1="" l_output2=""

        for param in $l_params; do
            l_paramtest=$(grep -P "^\s*$param\s*=\s*\S+" /etc/systemd/journald.conf)
            if [ -n "$l_paramtest" ]; then
                l_output1="$l_output1\n$l_paramtest"
            else
                l_output2="$l_output2\n$param"
            fi
        done

        if [ -z "$l_output2" ]; then
            echo -e "- PASS:\n- journald log rotation is configured:\n$l_output1" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure journald log rotation is configured per site policy" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "- FAIL:\n- Some journald log rotation settings are NOT configured:\n- CORRECT:\n$l_output1\n- INCORRECT:\n$l_output2" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure journald log rotation is configured per site policy" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
   }
   
   ensure_journald_log_rotation_configured_fix()
   {
        echo -e "- Start remediation - Ensure journald log rotation is configured per site policy" | tee -a "$LOG" 2>> "$ELOG"
      
        echo -e "- Review /etc/systemd/journald.conf and verify logs are rotated according to site policy." | tee -a "$LOG" 2>> "$ELOG" && l_test="manual"
      
        echo -e "- End remediation - Ensure journald log rotation is configured per site policy" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_journald_log_rotation_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        ensure_journald_log_rotation_configured_fix
        if [ "$l_test" != "manual" ]; then
            ensure_journald_log_rotation_configured_chk
            if [ "$?" = "101" ]; then
                [ "$l_test" != "failed" ] && l_test="remediated"
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