#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_ssh_x11_forwarding_disabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/22/20    Recommendation "Ensure SSH X11 forwarding is disabled"
# David Neilson	     06/25/22	 Updated to current standards.

ensure_ssh_x11_forwarding_disabled()
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
	
	ensure_ssh_x11_forwarding_disabled_chk()
	{
        echo -e "- Start Check - updating /etc/ssh/sshd_config file" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_pkgmgr="" l_test=""

		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && l_output="- Unable to determine system's package manager"
		fi
	
		# Check is openssh-server is installed
		if [ -z "$l_output" ]; then
			if ! $G_PQ openssh-server >/dev/null ; then
				l_test=NA
			else
                if [ "$l_remediated" != "remediated" ]; then
                    if sshd -T -C user=root -C host="$(hostname)" -C addr="$(grep $(hostname) /etc/hosts | awk '{print $1}')" | grep -Eiq 'X11Forwarding\sno' && ! grep -Eiq '^\s*x11forwarding\s+yes' /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf; then
                        echo -e "- PASSED:\n- ssh x11 forwarding disabled" | tee -a "$LOG" 2>> "$ELOG"
                        echo -e "- End check - ssh x11 forwarding" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-101}"
                    else
                        echo -e "- FAILED:\n- ssh x11 forwarding improperly configured on the system" | tee -a "$LOG" 2>> "$ELOG"
                        echo -e "- End check - ssh x11 forwarding" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-102}"
                    fi
                else
                   if ! grep -Eiq '^\s*x11forwarding\s+yes' /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf; then
                        echo -e "- PASSED:\n- ssh x11 forwarding disabled" | tee -a "$LOG" 2>> "$ELOG"
                        echo -e "- End check - ssh x11 forwarding" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-101}"
                    else
                        echo -e "- FAILED:\n- ssh x11 forwarding improperly configured on the system" | tee -a "$LOG" 2>> "$ELOG"
                        echo -e "- End check - ssh x11 forwarding" | tee -a "$LOG" 2>> "$ELOG"
                        return "${XCCDF_RESULT_PASS:-102}"
                    fi
                fi 
			fi
		else
			# If we can't determine the pkg manager, need manual remediation
			l_pkgmgr="$l_output"
			echo -e "- FAILED:\n- $l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - requires manual remediation" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-106}"
		fi
	}

	ensure_ssh_x11_forwarding_disabled_fix()
	{
		echo -e "- Start Remediation - updating /etc/ssh/sshd_config file" | tee -a "$LOG" 2>> "$ELOG"
        l_conffiles="" l_remediated=""

		echo -e "- Setting X11Forwarding to no in /etc/ssh/sshd_config" | tee -a "$LOG" 2>> "$ELOG"
		grep -iq 'X11Forwarding' /etc/ssh/sshd_config && sed -ri 's/^\s*(#\s*)?([Xx]11[Ff]orwarding)(\s+\S+\s*)(\s*#.*)?$/\2 no\4/' /etc/ssh/sshd_config || echo "X11Forwarding no" >> /etc/ssh/sshd_config

		echo -e "- Commenting out X11Forwarding entires in /etc/ssh/sshd_config or /etc/ssh/sshd_config.d/*.conf files" | tee -a "$LOG" 2>> "$ELOG"
        l_conffiles="$(grep -Pil '^\h*X11Forwarding\s+yes' /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf)"

        for line in $l_conffiles; do
            echo -e "- Commenting out X11Forwarding entires in $line" | tee -a "$LOG" 2>> "$ELOG"
            sed -ri "/^\s*X11Forwarding\s+/s/^/# /" "$line"
        done
        l_remediated="remediated"
		
		echo -e "- Reboot required before changes to /etc/ssh/sshd_config or /etc/ssh/sshd_config.d/*.conf to take effect" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- End Remediation - x11 forwarding" | tee -a "$LOG" 2>> "$ELOG"
		G_REBOOT_REQUIRED="yes"	
	}

	ensure_ssh_x11_forwarding_disabled_chk
	if [ "$?" = "101" ] ; then
		[ -z "$l_test" ] && l_test="passed"
	elif [ "$l_test" = "NA" ] ; then
		:
	elif [ -n "$l_pkgmgr" ] ; then
		l_test="manual"
	else
		ensure_ssh_x11_forwarding_disabled_fix
		ensure_ssh_x11_forwarding_disabled_chk
		if [ "$?" = "101" ] ; then
			[ "$l_test" != "failed" ] && l_test="remediated"
		else
			l_test="failed"
		fi
	fi

	# Set return code and return
	case "$l_test" in
		passed)
			echo "Recommendation \"$RNA\" No remediation required" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
			;;
		remediated)
			echo "Recommendation \"$RNA\" successfully remediated" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-103}"
			;;
		manual)
			echo "Recommendation \"$RNA\" requires manual remediation" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-106}"
			;;
		NA)
			echo "Recommendation \"$RNA\" openssh-server not installed - Recommendation is non applicable" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-104}"
			;;
		*)
			echo "Recommendation \"$RNA\" remediation failed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}