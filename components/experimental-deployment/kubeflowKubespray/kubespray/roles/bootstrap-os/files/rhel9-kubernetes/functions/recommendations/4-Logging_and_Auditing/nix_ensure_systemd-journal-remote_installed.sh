#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_systemd-journal-remote_installed.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/16/22    Recommendation "Ensure systemd-journal-remote is installed"
# 

ensure_systemd-journal-remote_installed()
{
	# Start recommendation entry for verbose log and output to screen
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

	ensure_systemd-journal-remote_installed_chk()
	{
		echo "- Start check - Ensure systemd-journal-remote is installed" | tee -a "$LOG" 2>> "$ELOG"
		l_output=""
		l_test1=""
		
		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && l_output="- Unable to determine system's package manager"
		fi

		# Determine if systemd-journal-remote is installed
		if [ -z "$l_output" ]; then
			$G_PQ systemd-journal-remote && l_test1="passed"
		fi
		
		# If package isn't installed, we fail
		if [ -z "$l_test1" ] ; then
			echo -e "- FAIL:\n systemd-journal-remote package was NOT found." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure systemd-journal-remote is installed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		else
			echo -e "- PASS:\n systemd-journal-remote package is installed." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure systemd-journal-remote is installed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		fi
	}

	ensure_systemd-journal-remote_installed_fix()
	{
		echo -e "- Start remediation - Ensure systemd-journal-remote is installed" | tee -a "$LOG" 2>> "$ELOG"
		
			echo -e "- Installing audit package" | tee -a "$LOG" 2>> "$ELOG"
			$G_PM install -y systemd-journal-remote
				
		echo -e "- End remediation - Ensure systemd-journal-remote is installed" | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_systemd-journal-remote_installed_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_systemd-journal-remote_installed_fix
		ensure_systemd-journal-remote_installed_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="remediated"
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