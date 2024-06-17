#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_system_accounts_secured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure system accounts are secured"
# Justin Brown       06/10/22    Updated to modern format
# 
  
ensure_system_accounts_secured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   ensure_system_accounts_secured_chk()
	{
      echo -e "- Start check - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
      l_has_shell="" l_is_unlocked="" l_output="" l_test1="" l_test2=""
      
      # Check for accounts with active shells
      l_has_shell="$(awk -F: '($1!="root" && $1!="sync" && $1!="shutdown" && $1!="halt" && $1!~/^\+/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"' && $7!="'"$(which nologin)"'" && $7!="/bin/false") {print}' /etc/passwd)"
      
      if [ -z "$l_has_shell" ]; then
         l_test1=passed
      else
         if [ -z "$l_output" ]; then
            l_output="- Accounts with active shells:\n$l_has_shell"
            l_test1=failed
         else
            l_output="$l_output\n- Accounts with active shells:\n$l_has_shell"
            l_test1=failed
         fi
      fi
      
      # Check for unlocked accounts
      l_is_unlocked="$(awk -F: '($1!="root" && $1!~/^\+/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"') {print $1}' /etc/passwd | xargs -I '{}' passwd -S '{}' | awk '($2!="L" && $2!="LK") {print $1}')"
      
      if [ -z "$l_is_unlocked" ]; then
         l_test2=passed
      else
         if [ -z "$l_output" ]; then
            l_output="- Unlocked Accounts:\n$l_is_unlocked"
            l_test2=failed
         else
            l_output="$l_output\n- Unlocked Accounts:\n$l_is_unlocked"
            l_test2=failed
         fi
      fi
      
      if [ "$l_test1" = "passed" ] && [ "$l_test2" = "passed" ]; then
			echo -e "- PASS:\n- All system accounts have a non-interactive shell and are locked" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   }
   
   ensure_system_accounts_secured_fix()
	{
      echo -e "- Start remediation - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
      
      if ! [ "$l_test1" = "passed" ]; then
         echo -e "- Setting system accounts to a non-login shell" | tee -a "$LOG" 2>> "$ELOG"
         
         awk -F: '($1!="root" && $1!="sync" && $1!="shutdown" && $1!="halt" && $1!~/^\+/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"' && $7!="'"$(which nologin)"'" && $7!="/bin/false" && $7!="/usr/bin/false") {print $1}' /etc/passwd | while read -r user; do
            echo -e "- Setting shell for: $user" | tee -a "$LOG" 2>> "$ELOG"
            usermod -s "$(which nologin)" "$user"
         done
      fi
      
      if ! [ "$l_test2" = "passed" ]; then
         echo -e "- Locking system accounts" | tee -a "$LOG" 2>> "$ELOG"
         
         awk -F: '($1!="root" && $1!~/^\+/ && $3<'"$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"') {print $1}' /etc/passwd | xargs -I '{}' passwd -S '{}' | awk '($2!="L" && $2!="LK") {print $1}' | while read -r user; do
            echo -e "- Locking account: $user" | tee -a "$LOG" 2>> "$ELOG"
            usermod -L "$user"
         done
      fi
      
      echo -e "- End remediation - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_system_accounts_secured_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_system_accounts_secured_fix
         ensure_system_accounts_secured_chk
         if [ "$?" = "101" ]; then
			   [ "$test" != "failed" ] && test="remediated"
		   fi
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