#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_system-wide_crypto_policy_not_legacy.sh
# 
# Name              Date        Description
# ------------------------------------------------------------------------------------------------
# Justin Brown      03/10/23    Recommendation "Ensure system-wide crypto policy is not legacy"
#

fed_ensure_system-wide_crypto_policy_not_legacy()
{
   	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   	l_test=""

    fed_ensure_system-wide_crypto_policy_not_legacy_chk()
	{
        echo -e "- Start check - Ensure system-wide crypto policy is not legacy" | tee -a "$LOG" 2>> "$ELOG"
        l_output=""

        l_output="$(grep -Pi -- '^\h*LEGACY\h*(\h+#.*)?$' /etc/crypto-policies/config)"       

        if [ -z "$l_output" ]; then
			echo -e "- PASS: The system-wide crypto policy is NOT set to LEGACY" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure system-wide crypto policy is not legacy" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL: The system-wide crypto policy IS set to LEGACY" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure system-wide crypto policy is not legacy" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi 
    }

    fed_ensure_system-wide_crypto_policy_not_legacy_fix()
	{
        echo -e "- Start remediation - Ensure system-wide crypto policy is not legacy" | tee -a "$LOG" 2>> "$ELOG"

        echo -e "- Setting system-wide crypto policy to DEFAULT" | tee -a "$LOG" 2>> "$ELOG"
        update-crypto-policies --set DEFAULT
        echo -e "- Activating updated system-wide crypto policy" | tee -a "$LOG" 2>> "$ELOG"
        update-crypto-policies
      
        echo -e "- End remediation - Ensure system-wide crypto policy is not legacy" | tee -a "$LOG" 2>> "$ELOG"
    }

    fed_ensure_system-wide_crypto_policy_not_legacy_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            fed_ensure_system-wide_crypto_policy_not_legacy_fix
            if [ "$l_test" != "manual" ]; then
                fed_ensure_system-wide_crypto_policy_not_legacy_chk
                if [ "$?" = "101" ] ; then
                    [ "$l_test" != "failed" ] && l_test="remediated"
                else
                    l_test="failed"
                fi
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