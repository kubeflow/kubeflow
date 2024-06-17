#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_wireless_interfaces_disabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/03/20    Recommendation "Ensure wireless interfaces are disabled"
# Justin Brown		 05/06/22    Update to modern format.
#
 
ensure_wireless_interfaces_disabled()
{

	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	
	test=""
	
	ensure_wireless_interfaces_disabled_chk()
	{
		echo -e "- Start check - Ensure wireless interfaces are disabled." | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_test=""
	
		if command -v nmcli >/dev/null 2>&1 ; then
			if nmcli radio all | grep -Eq '\s*\S+\s+disabled\s+\S+\s+disabled\b'; then
				l_output="$l_output\nWireless is not enabled\n$(nmcli radio all)"
			else
				l_output="$l_output\nWireless IS enabled\n$(nmcli radio all)"
				l_test=fail
			fi
		elif [ -n "$(find /sys/class/net/*/ -type d -name wireless)" ]; then
			l_mname=$(for driverdir in $(find /sys/class/net/*/ -type d -name wireless | xargs -0 dirname); do basename "$(readlink -f "$driverdir"/device/driver/module)";done | sort -u)
			
			for dm in $l_mname; do
				if grep -Eq "^\s*install\s+$dm\s+/bin/(true|false)" /etc/modprobe.d/*.conf; then
					l_output="$l_output\nModule: $dm is not enabled"
				else
					l_output="$l_output\nModule: $dm IS enabled)"
					l_test=fail
				fi
			done
		else
			l_output="$l_output\nnmcli command was NOT found"
		fi
		
		#echo -e "$l_output" | tee -a "$LOG" 2>> "$ELOG"
		
		if [ -z "$l_test" ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure wireless interfaces are disabled." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure wireless interfaces are disabled." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi		
	}
	
	ensure_wireless_interfaces_disabled_fix()
	{
		echo -e "- Start remediation - Ensure wireless interfaces are disabled" | tee -a "$LOG" 2>> "$ELOG"
		
		if command -v nmcli >/dev/null 2>&1 ; then
			echo -e "- Disabling radios." | tee -a "$LOG" 2>> "$ELOG"
			nmcli radio all off
			test="remediated"
		else
			if [ -n "$(find /sys/class/net/*/ -type d -name wireless)" ]; then
				mname=$(for driverdir in $(find /sys/class/net/*/ -type d -name wireless | xargs -0 dirname); do basename "$(readlink -f "$driverdir"/device/driver/module)";done | sort -u)
				for dm in $mname; do
					echo -e "- Disabling module: $dm." | tee -a "$LOG" 2>> "$ELOG"
					echo "install $dm /bin/true" >> /etc/modprobe.d/disable_wireless.conf
					test="remediated"
				done
			fi
		fi
		
		echo -e "- End remediation - Ensure wireless interfaces are disabled" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_wireless_interfaces_disabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_wireless_interfaces_disabled_fix
		ensure_wireless_interfaces_disabled_chk
		if [ "$?" = "101" ]; then
			[ "$test" != "failed" ] && test="remediated"
		fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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