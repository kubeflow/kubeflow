#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_ssh_access_limited.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/22/20    Recommendation "Ensure SSH access is limited"
# Justin Brown       05/12/22    Updated to modern format
# 

ensure_ssh_access_limited()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
   nix_package_manager_set()
	{
		echo "- Start - Determine system's package manager " | tee -a "$LOG" 2>> "$ELOG"
		if command -v rpm 2>/dev/null; then
			echo "- system is rpm based" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="rpm -q"
			command -v yum 2>/dev/null && G_PM="yum" && echo "- system uses yum package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v dnf 2>/dev/null && G_PM="dnf" && echo "- system uses dnf package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v zypper 2>/dev/null && G_PM="zypper" && echo "- system uses zypper package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PR="$G_PM -y remove"
			export G_PQ G_PM G_PR
			echo "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		elif command -v dpkg 2>/dev/null; then
			echo -e "- system is apt based\n- system uses apt package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="dpkg -s"
			G_PM="apt"
			G_PR="$G_PM -y purge"
			export G_PQ G_PM G_PR
			echo "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Unable to determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="unknown"
			G_PM="unknown"
			export G_PQ G_PM G_PR
			echo "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}   
   
   ensure_ssh_access_limited_chk()
	{
      echo -e "- Start check - Ensure SSH access is limited" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_sshd_cmd="" l_sshd_config=""
      
      if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
         nix_package_manager_set
      fi
      
      # Check is openssh-server is installed
      if ! $G_PQ openssh-server >/dev/null ; then
         test=NA
      else
         if sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Eq '^\s*(allow|deny)(users|groups)\s+\S+'; then
            l_output="- Entry found: $(sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -E '^\s*(allow|deny)(users|groups)\s+\S+')" && l_sshd_cmd="passed"
         else
            l_output="- No entry found in sshd -T -C output" && l_sshd_cmd="failed"
         fi
         
         if grep -Piq '^\h*(allow|deny)(users|groups)\h+\H+(\h+.*)?$' /etc/ssh/sshd_config; then
            l_output="$l_output\n- Entry found: $(grep -Pi '^\h*(allow|deny)(users|groups)\h+\H+(\h+.*)?$' /etc/ssh/sshd_config)" && l_sshd_config="passed"
         else
            l_output="$l_output\n- No entry found in sshd_config" && l_sshd_config="failed"
         fi
      fi
      
      if [ "$l_sshd_cmd" = "passed" ] && [ "$l_sshd_config" = "passed" ]; then
         echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
         echo -e "- End check - Ensure SSH access is limited" | tee -a "$LOG" 2>> "$ELOG"
         return "${XCCDF_RESULT_PASS:-101}"
      else
         echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
         echo -e "- End check - Ensure SSH access is limited" | tee -a "$LOG" 2>> "$ELOG"
         return "${XCCDF_RESULT_FAIL:-102}"
      fi
   }
   
   ensure_ssh_access_limited_fix()
	{
      echo -e "- Start remediation - Ensure SSH access is limited" | tee -a "$LOG" 2>> "$ELOG"
      
      echo -e "- Restricting which users can remotely access the system via SSH will help ensure that only authorized users access the system. Therefore, it is recommended that the sshd configuration be reviewed and determine the action to be taken in accordance with site policy." | tee -a "$LOG" 2>> "$ELOG"
      
      test="manual"
      
      echo -e "- Start remediation - Ensure SSH access is limited" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_ssh_access_limited_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_ssh_access_limited_fix
         ensure_ssh_access_limited_chk
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