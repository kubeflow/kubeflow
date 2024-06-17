#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_udf_filesystem_disabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       05/06/20    Recommendation "Ensure mounting of udf filesystems is disabled"
# Eric Pinnell       04/19/22    Modified corrected false positive and enhanced logging
# David Neilson      11/19/22    Updated to conform to latest Ubunut benchmark
ensure_udf_filesystem_disabled()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_mname="udf"
			
	ensure_udf_filesystem_disabled_chk()
	{
		# Set variables and module name
		l_output="" l_output2=""
 		
		# Check if the module exists on the system
   		if [ -z "$(modprobe -n -v "$l_mname" 2>&1 | grep -Pi -- "\h*modprobe:\h+FATAL:\h+Module\h+$l_mname\h+not\h+found\h+in\h+directory")" ] || [ -n "$( find /lib/modules/ -type d -name "\\$l_mname" -exec ls -l {} +)" ] || [ -n "$( find /usr/lib/modules/ -type d -name "\\$l_mname" -exec ls -l {} +)" ]; then
		
			# Check how module will be loaded.  If l_output has a value, the module is not loadable.  l_output2 indicates it is loadable
 			l_loadable="$(modprobe -n -v "$l_mname")"
			[ "$(wc -l <<< "$l_loadable")" -gt "1" ] && l_loadable="$(grep -P -- "(^\h*install|\b$l_mname)\b" <<< "$l_loadable")"
			if grep -Pq -- '^\h*install \/bin\/false' <<< "$l_loadable"; then
 				l_output="$l_output\n - module: \"$l_mname\" is not loadable: \"$l_loadable\""
 			else
		 		l_output2="$l_output2\n - module: \"$l_mname\" is loadable: \"$l_loadable\""
 			fi

			# Check if the module currently loaded
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
 			echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - $l_mname driver" | tee -a "$LOG" 2>> "$ELOG"
		   	return "${XCCDF_RESULT_PASS:-101}"
 		else
 			echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"  | tee -a "$LOG" 2>> "$ELOG"
			[ -n "$l_output" ] && echo -e "- Correctly set:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			echo "- End check - $l_mname driver" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
 		fi
	}

	ensure_udf_filesystem_disabled_fix()
	{
		# Check if the module exists on the system
   		if [ -z "$(modprobe -n -v "$l_mname" 2>&1 | grep -Pi -- "\h*modprobe:\h+FATAL:\h+Module\h+$l_mname\h+not\h+found\h+in\h+directory")" ] || [ -n "$( find /lib/modules/ -type d -name "\\$l_mname" -exec ls -l {} +)" ] || [ -n "$( find /usr/lib/modules/ -type d -name "\\$l_mname" -exec ls -l {} +)" ]; then
			l_loadable="$(modprobe -n -v "$l_mname")"
			[ "$(wc -l <<< "$l_loadable")" -gt "1" ] && l_loadable="$(grep -P -- "(^\h*install|\b$l_mname)\b" <<< "$l_loadable")" 
			
			echo -e "\n- Start remediation - edit or create file /etc/modprobe.d/$l_mname.conf" | tee -a "$LOG" 2>> "$ELOG"

			# Remediate loadable.  
			if ! grep -Pq -- '^\h*install \/bin\/false' <<< "$l_loadable"; then
				echo -e " - setting module: \"$l_mname\" to be not loadable"
				if grep -P -- "^\h*install \S+" /etc/modprobe.d/"$l_mname".conf; then
					sed -ri 's/^\s*(install\s+)('"$l_mname"'\s+)(\S+)/\1\2\/bin\/false/' /etc/modprobe.d/"$l_mname".conf
				else
					echo -e "install $l_mname /bin/false" >> /etc/modprobe.d/"$l_mname".conf
				fi
			fi		

			# Remediate loaded
			if lsmod | grep "$l_mname" > /dev/null 2>&1; then
 				echo -e " - unloading module \"$l_mname\""
 				modprobe -r "$l_mname"
 			fi

			# Remediate deny list
 			if ! modprobe --showconfig | grep -Pq -- "^\h*blacklist\h+$l_mname\b"; then
 				echo -e " - deny listing \"$l_mname\""
 				echo -e "blacklist $l_mname" >> /etc/modprobe.d/"$l_mname".conf
 			fi
		else
			echo -e "- Nothing to remediate\n - Module\"$l_mname\" doesn't exist on the system"
		fi 	
	}
	
	ensure_udf_filesystem_disabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_udf_filesystem_disabled_fix
		ensure_udf_filesystem_disabled_chk
		if [ "$?" = "101" ]; then
			l_test="remediated"
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