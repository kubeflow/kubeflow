#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_filesystem_integrity_regularly_checked.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/15/20    Recommendation "Ensure filesystem integrity is regularly checked"
# Justin Brown		 12/28/22	 Updated to modern format
# 

ensure_filesystem_integrity_regularly_checked()
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

	ensure_filesystem_integrity_regularly_checked_chk()
   	{
		echo -e "- Start check - Ensure filesystem integrity is regularly checked" | tee -a "$LOG" 2>> "$ELOG"
		l_cron_test="" l_systemctl_test=""

		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && echo -e "- Unable to determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
		fi

		if $G_PQ aide > /dev/null 2>&1 && $G_PQ aide-common > /dev/null 2>&1; then
			if crontab -u root -l | grep -Eq '^\s*[^#]+\s+([^#]+)?/aide\s--check'  || grep -Erqs '^\s*[^#]+\s+([^#]+)?/aide\s--check' /etc/cron.* /etc/crontab.d/* /etc/crontab; then
				l_cron_test=passed
			fi

			if grep -Eq '^\s*ExecStart=\/usr\/sbin\/aide\s--check\b' /etc/systemd/system/aidecheck.service && grep -Eq '^\s*Unit=aidecheck\.service\b' /etc/systemd/system/aidecheck.timer; then
				systemctl is-enabled aidecheck.service | grep -q enabled && systemctl is-enabled aidecheck.timer | grep -q enabled && l_systemctl_test=passed
			fi

			if [ "$l_cron_test" = "passed" ] || [ "$l_systemctl_test" = "passed" ]; then
				echo -e "- PASS:\n- Filesystem integrity is being checked"  | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure filesystem integrity is regularly checked" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
			else
				echo -e "- FAIL:\n- Filesystem integrity is NOT being checked" | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure filesystem integrity is regularly checked" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_FAIL:-102}"
			fi
		else
			echo -e "- aide packages NOT installed on the system." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure filesystem integrity is regularly checked" | tee -a "$LOG" 2>> "$ELOG"
			l_test="manual"
			return "${XCCDF_RESULT_PASS:-106}"
		fi
	}

	ensure_filesystem_integrity_regularly_checked_fix()
   	{
      	echo -e "- Start remediation - Ensure filesystem integrity is regularly checked" | tee -a "$LOG" 2>> "$ELOG"

		if [ "$l_test" != "manual" ]; then
			echo -e "- Adding '/usr/sbin/aide --check' to root's crontab" | tee -a "$LOG" 2>> "$ELOG"
			echo "0 5 * * * /usr/sbin/aide --check" | crontab -u root -
		else
			echo -e "- Install the aide package as appropriate for your environment then add the following to the crontab:\n  0 5 * * * /usr/bin/aide.wrapper --config /etc/aide/aide.conf --check" | tee -a "$LOG" 2>> "$ELOG"
		fi

		echo -e "- End remediation - Ensure filesystem integrity is regularly checked" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_filesystem_integrity_regularly_checked_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_filesystem_integrity_regularly_checked_fix
		if [ "$l_test" != "manual" ]; then
			ensure_filesystem_integrity_regularly_checked_chk
			if [ "$?" = "101" ]; then
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