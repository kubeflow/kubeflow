#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_system-wide_crypto_policy_not_over-ridden.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       03/06/23    Recommendation "Ensure system-wide crypto policy is not over-ridden"
# David Neilson		 04/13/23	 Also checks /etc/ssh/sshd_config.d/*.conf
  
fed_ensure_system-wide_crypto_policy_not_over-ridden()
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
   
   	fed_ensure_system-wide_crypto_policy_not_over-ridden_chk()
	{
      	echo -e "- Start check - Ensure system-wide crypto policy is not over-ridden" | tee -a "$LOG" 2>> "$ELOG"
      	l_output="" l_sshd_cmd="" l_sshd_config=""
      
      	if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
         	nix_package_manager_set
      	fi
      
		# Check is openssh-server is installed
		if ! $G_PQ openssh-server >/dev/null ; then
			l_test=NA
			return "${XCCDF_RESULT_PASS:-104}"
		else
			l_output="$(grep -Pi -- '^\h*CRYPTO_POLICY\h*=' /etc/sysconfig/sshd /etc/ssh/sshd_config.d/*.conf)"
		fi
		
		if [ -z "$l_output" ] && [ "$G_REBOOT_REQUIRED" = "yes" ] ; then
			return "${XCCDF_RESULT_FAIL:-106}"
		elif [ -z "$l_output" ]; then
			echo -e "- PASS:\n- No \"CRYPTO_POLICY\" entries exist in /etc/sysconfig/sshd or in /etc/ssh/sshd_config.d/*.conf" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure system-wide crypto policy is not over-ridden" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- \"CRYPTO_POLICY\" entries exist in /etc/sysconfig/sshd or in /etc/ssh/sshd_config.d/*.conf:\n $l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure system-wide crypto policy is not over-ridden" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
   	}
   
   	fed_ensure_system-wide_crypto_policy_not_over-ridden_fix()
	{
		echo -e "- Start remediation - Ensure system-wide crypto policy is not over-ridden" | tee -a "$LOG" 2>> "$ELOG"
		
		if grep -Piq -- '^\h*CRYPTO_POLICY\h*=' /etc/sysconfig/sshd /etc/ssh/sshd_config.d/*.conf; then
			echo -e "- Removing CRYPTO_POLICY entry in /etc/sysconfig/sshd or in /etc/ssh/sshd_config.d/*.conf" | tee -a "$LOG" 2>> "$ELOG"
			sed -ri 's/^\s*(CRYPTO_POLICY\s*=.*)$/# \1/' /etc/sysconfig/sshd /etc/ssh/sshd_config.d/*.conf
		fi
		
		echo "- Reboot required to reload SSHD configuration files" | tee -a "$LOG" 2>> "$ELOG"
        G_REBOOT_REQUIRED="yes"
		
		echo -e "- End remediation - Ensure system-wide crypto policy is not over-ridden" | tee -a "$LOG" 2>> "$ELOG"
   	}
   
	fed_ensure_system-wide_crypto_policy_not_over-ridden_chk
	if [ "$?" = "101" ] ; then
		[ -z "$l_test" ] && l_test="passed"
	elif [ "$l_test" = "NA" ]; then
		:
	else
		fed_ensure_system-wide_crypto_policy_not_over-ridden_fix
		fed_ensure_system-wide_crypto_policy_not_over-ridden_chk
		if [ -z "$l_output" ]; then
			[ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
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