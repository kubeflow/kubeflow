#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_tipc_disabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/19/22    Recommendation "Ensure TIPC is disabled"
# David Neilson		 04/29/23	 Updated to Fedora 34 Benchmark

ensure_tipc_disabled()
{

	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
			
	ensure_tipc_disabled_chk()
	{
		l_output="" l_output2=""

		# set module name 
		l_mname="tipc"

		echo "- Start check - Ensure TIPC is disabled" | tee -a "$LOG" 2>> "$ELOG" 
		
		if [ -z "$(modprobe -n -v "$l_mname" 2>&1 | grep -Pi -- "\h*modprobe:\h+FATAL:\h+Module\h+$l_mname\h+not\h+found\h+in\h+directory")" ]; then
			
			# Check how module will be loaded
			l_loadable="$(modprobe -n -v "$l_mname")" 
			[ "$(wc -l <<< "$l_loadable")" -gt "1" ] && l_loadable="$(grep -P -- "(^\h*install|\b$l_mname)\b" <<< "$l_loadable")"
			if grep -Pq -- '^\h*install \/bin\/(true|false)' <<< "$l_loadable"; then
				l_output="$l_output\n - module: \"$l_mname\" is not loadable: \"$l_loadable\""
			else
				l_output2="$l_output2\n - module: \"$l_mname\" is loadable: \"$l_loadable\""
			fi

			# Check is the module currently loaded
			if ! lsmod | grep "$l_mname" > /dev/null 2>&1; then
				l_output="$l_output\n - module: \"$l_mname\" is not loaded" 
			else 
				l_output2="$l_output2\n - module: \"$l_mname\" is loaded" 
			fi 
		
			# Check if the module is deny listed 
			if modprobe --showconfig | grep -Pq -- "^\h*blacklist\h+$l_mname\b"; then
				l_output="$l_output\n - module: \"$l_mname\" is deny listed in: \"$(grep -Pl -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*)\"" 
			else 
				l_output2="$l_output2\n - module: \"$l_mname\" is not deny listed" 
			fi 
		
		else
			l_output="$l_output\n - Module \"$l_mname\" doesn't exist on the system"
		fi

		# Report results. If no failures output in l_output2, we pass 
		if [ -z "$l_output2" ]; then 
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - Ensure TIPC is disabled" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}" 
		else 
			echo -e "- FAIL:\n- Reason(s) for audit failure:\n$l_output2" | tee -a "$LOG" 2>> "$ELOG"
			[ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - Ensure TIPC is disabled" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_FAIL:-102}" 
		fi
	}


	ensure_tipc_disabled_fix()
	{
		echo "- Start remediation - Ensure TIPC is disabled" | tee -a "$LOG" 2>> "$ELOG"
		
		l_mname="tipc" # set module name

		# Check if the module exists on the system
		if [ -z "$(modprobe -n -v "$l_mname" 2>&1 | grep -Pi -- "\h*modprobe:\h+FATAL:\h+Module\h+$l_mname\h+not\h+found\h+in\h+directory")" ]; then
			# Remediate loadable
			l_loadable="$(modprobe -n -v "$l_mname")"
			[ "$(wc -l <<< "$l_loadable")" -gt "1" ] && l_loadable="$(grep -P -- "(^\h*install|\b$l_mname)\b" <<< "$l_loadable")"
			if ! grep -Pq -- '^\h*install \/bin\/(true|false)' <<< "$l_loadable"; then
				echo -e " - setting module: \"$l_mname\" to be not loadable"
				echo -e "install $l_mname /bin/false" >> /etc/modprobe.d/"$l_mname".conf
			fi
		
			# Remediate loaded
			if lsmod | grep "$l_mname" > /dev/null 2>&1; then 
				echo -e " - Unloading module \"$l_mname\""
				modprobe -r "$l_mname"
			fi 
		
			# Remediate deny list
      		if ! modprobe --showconfig | grep -Pq -- "^\h*blacklist\h+$l_mname\b"; then
				echo -e " - Deny listing \"$l_mname\"" 
				echo -e "blacklist $l_mname" >> /etc/modprobe.d/"$l_mname".conf 
			fi
		else
			echo -e " - Nothing to remediate\n - Module \"$l_mname\" doesn't exist on the system"
   		fi

		echo "- End remediation - Ensure TIPC is disabled" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_tipc_disabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_tipc_disabled_fix
		if [ "$l_test" != "manual" ]; then
			ensure_tipc_disabled_chk
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