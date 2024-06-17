#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_ipv6_status_identified.sh
# 
# Name                 Date         Description
# ------------------------------------------------------------------------------------------------
# J Brown              09/22/20     Recommendation "Ensure IPv6 status is identified"
# David Neilson		   04/29/23		Updated to Fedora 34 Benchmark

fed_ensure_ipv6_status_identified()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	
	fed_ensure_ipv6_status_identified_chk()
	{
		l_output=""
   
        if grep -Pqs -- '^\h*0\b' /sys/module/ipv6/parameters/disable; then
            l_output="- IPv6 is enabled on the system"
        else
            l_output="- IPv6 is not enabled on the system"
        fi

        # If l_output is empty, then we pass
        if [ -n "$l_output" ]; then
            echo -e "\n- Audit Results:\n ** Manual **\n$l_output"
            return "${XCCDF_RESULT_FAIL:-106}"
        else
            # print the reason why we are failing
            echo -e "\n- Audit Results:\n ** Fail **\n- Could not retrieve IPv6 status"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
	}

	fed_ensure_ipv6_status_identified_fix()
	{
		echo "- Start remediation - Identifying status of IPv6" | tee -a "$LOG" 2>> "$ELOG"

        echo "- Enable or disable IPv6 in accordance with system requirements and local site policy" | tee -a "$LOG" 2>> "$ELOG"
        l_test="manual"

        echo "- End remediation - Identifying status of IPv6" | tee -a "$LOG" 2>> "$ELOG"		
	}

	fed_ensure_ipv6_status_identified_chk
	if [ "$?" = "106" ]; then
		fed_ensure_ipv6_status_identified_fix
        if [ "$l_test" != "manual" ]; then
            l_test="failed"
        fi
	else
		l_test="failed"	
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