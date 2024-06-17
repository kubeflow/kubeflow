#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_ssh_allowtcpforwarding_disabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/23/20    Recommendation "Ensure SSH AllowTcpForwarding is disabled"
# Justin Brown       05/15/22    Updated to modern format
# David Neilson	     09/14/22	 Updated to current standards
# David Neilson	     11/18/22	 Minor update to last "case" statement  
 
ensure_ssh_allowtcpforwarding_disabled()
{
	nix_package_manager_set()
	{
		echo -e "- Start - Determine system's package manager " | tee -a "$LOG" 2>> "$ELOG"

		if command -v rpm 2>/dev/null; then
			echo -e "- system is rpm based" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="rpm -q"
			command -v yum 2>/dev/null && G_PM="yum" && echo "- system uses yum package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v dnf 2>/dev/null && G_PM="dnf" && echo "- system uses dnf package manager" | tee -a "$LOG" 2>> "$ELOG"
			command -v zypper 2>/dev/null && G_PM="zypper" && echo "- system uses zypper package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PR="$G_PM -y remove"
			export G_PQ G_PM G_PR
			echo -e "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		elif command -v dpkg 2>/dev/null; then
			echo -e "- system is apt based\n- system uses apt package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="dpkg -s"
			G_PM="apt"
			G_PR="$G_PM -y purge"
			export G_PQ G_PM G_PR
			echo -e "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Unable to determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			G_PQ="unknown"
			G_PM="unknown"
			export G_PQ G_PM G_PR
			echo -e "- End - Determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}	

	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_test1=""
	l_test2=""

	ensure_ssh_allowtcpforwarding_disabled_chk()
	{
		l_output=""
		l_pkgmgr=""

		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && l_output="- Unable to determine system's package manager"
		fi

		# Check is openssh-server is installed
		if ! $G_PQ openssh-server >/dev/null ; then
			l_test="NA"	
			return "${XCCDF_RESULT_PASS:-104}"
		else
			if sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Eiq 'AllowTcpForwarding\s+no'; then
				l_test1="passed"
			fi
			if ! grep -Eiq '^\s*AllowTcpForwarding\s+yes' /etc/ssh/sshd_config; then
				l_test2="passed"
			fi
		fi

		if [ "$l_test1" = "passed" -a "$l_test2" = "passed" ]; then
			echo -e "- PASSED:\n- SSH AllowTcpForwarding is disabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SSH AllowTcpForwarding" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		elif [ "$G_REBOOT_REQUIRED" = "yes" -a "$l_test2" = "passed" ]; then
			return "${XCCDF_RESULT_FAIL:-106}"
		else
			echo -e "- FAILED:\n- SSH AllowTcpForwarding is NOT disabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SSH AllowTcpForwarding" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		fi
	}

	ensure_ssh_allowtcpforwarding_disabled_fix()
	{
		echo "- Start remediation - ensure SSH AllowTcpForwarding is disabled" | tee -a "$LOG" 2>> "$ELOG"
		
		if grep -iq 'AllowTcpForwarding' /etc/ssh/sshd_config; then
			sed -ri 's/^\s*(#\s*)?([Aa]llow[Tt]cp[Ff]orwarding)(\s+\S+\s*)(\s+#.*)?$/\2 no\4/' /etc/ssh/sshd_config
		else
			echo "AllowTcpForwarding no" >> /etc/ssh/sshd_config
		fi
		
		echo "- Reboot required to reload the SSHD configuration file" | tee -a "$LOG" 2>> "$ELOG"
                G_REBOOT_REQUIRED="yes"
	}	
	
	ensure_ssh_allowtcpforwarding_disabled_chk
	if [ "$?" = "101" ] ; then
		[ -z "$l_test" ] && l_test="passed"
	elif [ "$l_test" = "NA" ]; then
		:
	else
        ensure_ssh_allowtcpforwarding_disabled_fix
		ensure_ssh_allowtcpforwarding_disabled_chk
		# If AllowTcpForwarding is set correctly by the "fix" function, the l_test1 variable may not be set to "passed" until after the system is rebooted or SSHD restarted. 
        if [ "$l_test2" = "passed" ]; then
            [ "$G_REBOOT_REQUIRED" = "yes" ] && l_test="manual"
        fi
    fi

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