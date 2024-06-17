#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_ssh_idle_timeout_interval_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/23/20    Recommendation "Ensure SSH Idle Timeout Interval is configured"
# Justin Brown       05/14/22    Updated to modern format
# 

# NOTE: This script works for newer Fedora based distros (Fedora 34) and Debian based distros (Debian 11, Ubuntu 22)
 
ensure_ssh_idle_timeout_interval_configured()
{
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""
   
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
   
   ensure_ssh_idle_timeout_interval_configured_chk()
	{
        echo -e "- Start check - Ensure SSH Idle Timeout Interval is configured" | tee -a "$LOG" 2>> "$ELOG"
        l_output="" l_sshd_cmd1="" l_sshd_cmd2="" l_sshd_config1="" l_sshd_config2=""
      
        if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
            nix_package_manager_set
        fi
      
        # Check is openssh-server is installed
        if ! $G_PQ openssh-server >/dev/null ; then
            l_test=NA
        else
            if [ "$l_remediated" != "remediated" ]; then
                if sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Eiq 'ClientAliveInterval\s+(1[0-9]{1,}|[1-9])\b'; then
                    l_output="- Entry found in sshd -T -C output: $(sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Ei 'ClientAliveInterval\s+(1[0-5]|[1-9])\b')" && l_sshd_cmd1="passed"
                else
                    l_output="- No ClientAliveInterval entry found in sshd -T -C output" && l_sshd_cmd1="failed"
                fi
  
                if sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Eiq 'ClientAliveCountMax\s+(1[0-9]{1,}|[1-9])\b'; then
                    l_output="$l_output\n- Entry found in sshd -T -C output: $(sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Ei 'ClientAliveCountMax\s+')" && l_sshd_cmd2="passed"
                else
                    l_output="$l_output\n- No ClientAliveCountMax entry found in sshd -T -C output" && l_sshd_cmd2="failed"
                fi
            else
                l_sshd_cmd1="passed" && l_sshd_cmd2="passed"
            fi
                
            if grep -Piq '^\s*ClientAliveInterval\s+0\b' /etc/ssh/sshd_config; then
                l_output="$l_output\n- Incorrect ClientAliveInterval entry found in sshd_config: $(grep -Pi '^\s*ClientAliveInterval\s+' /etc/ssh/sshd_config)" && l_sshd_config1="failed"
            elif grep -Piq '^\s*#\s*ClientAliveInterval\s+' /etc/ssh/sshd_config; then
                l_output="$l_output\n- Commented ClientAliveInterval entry found in sshd_config: $(grep -Pi '^\s*#\s*ClientAliveInterval\s+' /etc/ssh/sshd_config)" && l_sshd_config1="failed"
            elif grep -Piq 'ClientAliveInterval\s+(1[0-9]{1,}|[1-9])\b' /etc/ssh/sshd_config; then
                l_output="$l_output\n- Entry found in sshd_config: $(grep -Pi '^\s*ClientAliveInterval\s+(1[0-5]|[1-9])\b' /etc/ssh/sshd_config)" && l_sshd_config1="passed"
            else
                l_output="$l_output\n- NO entry found in sshd_config for ClientAliveInterval" && l_sshd_config1="failed"
            fi
            
            if grep -Piq '^\s*ClientAliveCountMax\s+0\b' /etc/ssh/sshd_config; then
                l_output="$l_output\n- Incorrect ClientAliveCountMax entry found in sshd_config: $(grep -Pi '^\s*ClientAliveCountMax\s+' /etc/ssh/sshd_config)" && l_sshd_config2="failed"
            elif grep -Piq '^\s*#\s*ClientAliveCountMax\s+' /etc/ssh/sshd_config; then
                l_output="$l_output\n- Commented ClientAliveCountMax entry found in sshd_config: $(grep -Pi '^\s*#\s*ClientAliveCountMax\s+' /etc/ssh/sshd_config)" && l_sshd_config2="failed"
            elif grep -Piq 'ClientAliveCountMax\s+(1[0-9]{1,}|[1-9])\b' /etc/ssh/sshd_config; then
                l_output="$l_output\n- Entry found in sshd_config: $(grep -Pi '^\s*ClientAliveCountMax\s+[1-9]\b' /etc/ssh/sshd_config)" && l_sshd_config2="passed"
            else
                l_output="$l_output\n- NO entry found in sshd_config for ClientAliveCountMax" && l_sshd_config2="failed"
            fi
        fi
      
        if [ "$l_sshd_cmd1" = "passed" ] && [ "$l_sshd_cmd2" = "passed" ] && [ "$l_sshd_config1" = "passed" ] && [ "$l_sshd_config2" = "passed" ]; then
            echo -e "- PASS:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure SSH Idle Timeout Interval is configured" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure SSH Idle Timeout Interval is configured" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
    }
   
    ensure_ssh_idle_timeout_interval_configured_fix()
	{
        echo -e "- Start remediation - Ensure SSH Idle Timeout Interval is configured" | tee -a "$LOG" 2>> "$ELOG"
        l_remediated=""
        
        if [ "$l_sshd_config1" = "failed" ]; then
            if grep -Piq '^\h*(#\s*)?ClientAliveInterval\s+' /etc/ssh/sshd_config; then
                echo -e "- Updating ClientAliveInterval entry in /etc/ssh/sshd_config" | tee -a "$LOG" 2>> "$ELOG"
                sed -ri 's/^\s*(#\s*)?([Cc]lient[Aa]live[Ii]nterval)(\s+\S+\s*)(\s+#.*)?$/\2 15\4/' /etc/ssh/sshd_config
            else
                echo -e "- Adding ClientAliveInterval entry to /etc/ssh/sshd_config" | tee -a "$LOG" 2>> "$ELOG"
                sed -E -i '/^\s*\#\s*Authentication/a ClientAliveInterval 15' /etc/ssh/sshd_config
            fi
        fi
        
        if [ "$l_sshd_config2" = "failed" ]; then
            if grep -Piq '^\h*(#\s*)?ClientAliveCountMax\s+' /etc/ssh/sshd_config; then
                echo -e "- Updating ClientAliveCountMax entry in /etc/ssh/sshd_config" | tee -a "$LOG" 2>> "$ELOG"
                sed -ri 's/^\s*(#\s*)?([Cc]lient[Aa]live[Cc]ount[Mm]ax)(\s+\S+\s*)(\s+#.*)?$/\2 3\4/' /etc/ssh/sshd_config
            else
                echo -e "- Adding ClientAliveCountMax entry to /etc/ssh/sshd_config" | tee -a "$LOG" 2>> "$ELOG"
                sed -E -i '/^\s*\#\s*Authentication/a ClientAliveCountMax 3' /etc/ssh/sshd_config
            fi
        fi
        l_remediated="remediated"
        
        echo -e "- Reboot required before changes to /etc/ssh/sshd_config or /etc/ssh/sshd_config.d/*.conf to take effect" | tee -a "$LOG" 2>> "$ELOG"
        echo -e "- End remediation - Ensure SSH Idle Timeout Interval is configured" | tee -a "$LOG" 2>> "$ELOG"
        G_REBOOT_REQUIRED="yes"	
    }
   
    ensure_ssh_idle_timeout_interval_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_ssh_idle_timeout_interval_configured_fix
            ensure_ssh_idle_timeout_interval_configured_chk
            if [ "$?" = "101" ] ; then
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