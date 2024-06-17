#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_default_user_shell_timeout_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/29/20    Recommendation "Ensure default user shell timeout is configured"
# Justin Brown       06/20/22    Updated to modern format
# 

ensure_default_user_shell_timeout_configured()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   ensure_default_user_shell_timeout_configured_chk()
	{
      echo -e "- Start check - Ensure default user shell timeout is configured" | tee -a "$LOG" 2>> "$ELOG"
      l_brc="" l_output="" l_output2="" l_test1="" l_test2=""
      
      [ -f /etc/bashrc ] && l_brc="/etc/bashrc"
      
      for file in "$l_brc" /etc/profile /etc/profile.d/*.sh ; do
         grep -Pq '^\s*([^#]+\s+)?TMOUT=(900|[1-8][0-9][0-9]|[1-9][0-9]|[1-9])\b' "$file" && grep -Pq '^\s*([^#]+;\s*)?readonly\s+TMOUT(\s+|\s*;|\s*$|=(900|[1-8][0-9][0-9]|[1-9][0-9]|[1-9])\b)' "$file" && grep -Pq '^\s*([^#]+;\s*)?export\s+TMOUT(\s+|\s*;|\s*$|=(900|[1-8][0-9][0-9]|[1-9][0-9]|[1-9]))\b' "$file" && l_output="$file"
      done
         
      if [ -n "$l_output" ]; then
         l_output="- TMOUT is correctly configured in: \"$l_output\""
         l_test1=passed
      else
         l_output="- TMOUT is NOT configured in any file."
      fi
      
      grep -Pq '^\s*([^#]+\s+)?TMOUT=(9[0-9][1-9]|9[1-9][0-9]|0+|[1-9]\d{3,})\b' /etc/profile /etc/profile.d/*.sh "$l_brc" && l_output2=$(grep -Ps '^\s*([^#]+\s+)?TMOUT=(9[0-9][1-9]|9[1-9][0-9]|0+|[1-9]\d{3,})\b' /etc/profile /etc/profile.d/*.sh $l_brc)
      
      if [ -z "$l_output2" ]; then
         l_test2=passed
      else
         l_output="$l_output\n- TMOUT is incorrectly configured in:\n$l_output2"
      fi
      
      if [ "$l_test1" = "passed" ] && [ "$l_test2" = "passed" ]; then
			echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure default user shell timeout is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure default user shell timeout is configured" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   }
   
   ensure_default_user_shell_timeout_configured_fix()
	{
      echo -e "- Start remediation - Ensure system accounts are secured" | tee -a "$LOG" 2>> "$ELOG"
      
      [ -f /etc/bashrc ] && l_brc="/etc/bashrc"
      
      if grep -Eqs '^\s*([^#]+\s+)?TMOUT=' /etc/profile /etc/profile.d/*.sh "$l_brc"; then
         for file in "$l_brc" /etc/profile /etc/profile.d/*.sh ; do
            if grep -Pq '^\s*([^#]+\s+)?TMOUT=(9[0-9][1-9]|9[1-9][0-9]|0+|[1-9]\d{3,})\b' "$file"; then
               echo -e "- Updating TMOUT value in: \"$file\"" | tee -a "$LOG" 2>> "$ELOG"
               sed -ri 's/^([^#]+\s+)?(TMOUT=[0-9]+)(.*)$/\1TMOUT=900\3/' "$file"
            fi
         done
      else
         echo -e "- Inserting TMOUT value in: \"/etc/profile.d/cis_profile.sh\"" | tee -a "$LOG" 2>> "$ELOG"
         echo "readonly TMOUT=900 ; export TMOUT" >> /etc/profile.d/cis_profile.sh
      fi
      
      grep -Pq '^\s*([^#]+\s+)?TMOUT=(900|[1-8][0-9][0-9]|[1-9][0-9]|[1-9])\b' /etc/profile /etc/profile.d/*.sh "$l_brc" && test=remediated
   }
   
   ensure_default_user_shell_timeout_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_default_user_shell_timeout_configured_fix
         ensure_default_user_shell_timeout_configured_chk
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