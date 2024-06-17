#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_stickybit_world_writable_directories.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Ensure sticky bit is set on all world-writable directories"
# Justin Brown		 04/14/22    Update to modern format
#
 
ensure_stickybit_world_writable_directories()
{
	# Start recommendation entriey for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   ensure_stickybit_world_writable_directories_chk()
	{
      echo -e "- Start check - Ensure sticky bit is set on all world-writable directories" | tee -a "$LOG" 2>> "$ELOG"
	  l_output=""
      
      l_output="$(df --local -P | awk '{if (NR!=1) print $6}' | xargs -I '{}' find '{}' -xdev -type d \( -perm -0002 -a ! -perm -1000 \) 2>/dev/null)"
      
      if [ -z "$l_output" ]; then
         echo -e "- PASS: - All world-writable directories have the sticky bit set"  | tee -a "$LOG" 2>> "$ELOG"
         echo -e "- End check - Ensure sticky bit is set on all world-writable directories" | tee -a "$LOG" 2>> "$ELOG"
         return "${XCCDF_RESULT_PASS:-101}"
      else
         echo -e "- FAIL: - World-writable directories found without the sticky bit set:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
         echo -e "- End check - Ensure sticky bit is set on all world-writable directories" | tee -a "$LOG" 2>> "$ELOG"
         return "${XCCDF_RESULT_FAIL:-102}"
      fi
   }
            
   
   ensure_stickybit_world_writable_directories_fix()
	{
      echo -e "- Start remediation - Ensure sticky bit is set on all world-writable directories" | tee -a "$LOG" 2>> "$ELOG"
      
      echo -e "- Setting sticky bit on world-writable directories"
      df --local -P | awk '{if (NR!=1) print $6}' | xargs -I '{}' find '{}' -xdev -type d \( -perm -0002 -a ! -perm -1000 \) 2>/dev/null | xargs -I '{}' chmod a+t '{}' && test=remediated
      
      echo -e "- End remediation - Ensure sticky bit is set on all world-writable directories" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_stickybit_world_writable_directories_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
		ensure_stickybit_world_writable_directories_fix
		ensure_stickybit_world_writable_directories_chk
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