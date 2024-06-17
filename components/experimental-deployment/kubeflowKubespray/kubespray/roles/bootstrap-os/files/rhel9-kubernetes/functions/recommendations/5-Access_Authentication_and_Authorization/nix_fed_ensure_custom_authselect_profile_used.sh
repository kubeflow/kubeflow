#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_custom_authselect_profile_used.sh
# 
# Name                Date       Description
# ----------------------------------------------------------------------------------------
# Justin Brown       03/08/23    Recommendation "Ensure custom authselect profile is used"
# 

fed_ensure_custom_authselect_profile_used()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   	l_test=""

    fed_ensure_custom_authselect_profile_used_chk()
	{
      	echo -e "- Start check - Ensure custom authselect profile is used" | tee -a "$LOG" 2>> "$ELOG"
      	l_custom_profiles="" l_profile_in_use=""

        l_custom_profiles="$(authselect list | grep -P -- '^-\s*custom')"
        l_profile_in_use="$(head -1 /etc/authselect/authselect.conf | grep -P -- 'custom/')"

        if [ -n "$l_custom_profiles" ] && [ -n "$l_profile_in_use" ]; then
			echo -e "- PASS:\n- A custom authselect profile appears to be in use" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- Custom Profile:\n$l_custom_profiles" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure custom authselect profile is used" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- No custom authselect profile appears to be in use" | tee -a "$LOG" 2>> "$ELOG"
            [ -z "$l_custom_profiles" ] && echo -e "- No custom profile defined" | tee -a "$LOG" 2>> "$ELOG"
            [ -z "$l_profile_in_use" ] && echo -e "- No custom profile in use\n $(cat /etc/authselect/authselect.conf)" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure custom authselect profile is used" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   	}

    fed_ensure_custom_authselect_profile_used_fix()
	{
		echo -e "- Start remediation - Ensure custom authselect profile is used" | tee -a "$LOG" 2>> "$ELOG"

        echo -e "- Run the following command to create a custom authselect profile:\n  authselect create-profile <custom-profile name> <options>" | tee -a "$LOG" 2>> "$ELOG"
        echo -e "- Run the following command to select a custom authselect profile:\n  authselect select custom/<CUSTOM PROFILE NAME> {with-<OPTIONS>}" | tee -a "$LOG" 2>> "$ELOG"
        l_test="manual"

        echo -e "- End remediation - Ensure custom authselect profile is used" | tee -a "$LOG" 2>> "$ELOG"
   	}

    fed_ensure_custom_authselect_profile_used_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        fed_ensure_custom_authselect_profile_used_fix
        if [ "$l_test" != "manual" ]; then
            fed_ensure_custom_authselect_profile_used_chk
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