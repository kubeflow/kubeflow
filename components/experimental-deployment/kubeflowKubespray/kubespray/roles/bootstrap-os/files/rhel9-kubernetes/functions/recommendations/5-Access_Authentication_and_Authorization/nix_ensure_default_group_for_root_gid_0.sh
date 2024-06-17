#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_default_group_for_root_gid_0.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure default group for the root account is GID 0"
# Justin Brown		   05/15/22    Update to modern format.
#
 
ensure_default_group_for_root_gid_0()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""	
	
	ensure_default_group_for_root_gid_0_chk()
	{
      echo -e "- Start check - Ensure default group for the root account is GID 0" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_test=""
      
		if [ "$(grep "^root:" /etc/passwd | cut -f4 -d:)" = "0" ]; then
         l_output="Root default group GID is: $(grep "^root:" /etc/passwd | cut -f4 -d:)"
         l_test=passed
      else
         l_output="Root default group GID is: $(grep "^root:" /etc/passwd | cut -f4 -d:)"
         l_test=failed
      fi
		
		if [ "$l_test" = "passed" ]; then
			echo -e "- PASS:\n- $l_output"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure default group for the root account is GID 0" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- $l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure default group for the root account is GID 0" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
	}
	
	ensure_default_group_for_root_gid_0_fix()
	{
		echo -e "- Start remediation - Ensure default group for the root account is GID 0" | tee -a "$LOG" 2>> "$ELOG"
      
      	echo -e "- Setting root default group to GID 0" | tee -a "$LOG" 2>> "$ELOG"
		usermod -g 0 root
      
		echo -e "- End remediation - Ensure default group for the root account is GID 0" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	ensure_default_group_for_root_gid_0_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_default_group_for_root_gid_0_fix
		ensure_default_group_for_root_gid_0_chk
		if [ "$?" = "101" ]; then
            [ "$test" != "failed" ] && test="remediated"
         else
            test="failed"
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