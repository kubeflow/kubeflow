#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_selinux_installed.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/24/20    Recommendation "Ensure SELinux is installed"
# Justin Brown       04/19/22    Updated to modern format
#

fed_ensure_selinux_installed()
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
	test=""
	
	fed_ensure_selinux_installed_chk()
	{
		echo -e "- Start check - Ensure SELinux is installed" | tee -a "$LOG" 2>> "$ELOG"
		output=""
		
		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && output="- Unable to determine system's package manager"
		fi
		
		# Check if selinux is installed
		if [ -z "$output" ]; then
			$G_PQ libselinux 2>>/dev/null && output="- $($G_PQ libselinux)"
		fi
		
		# If package does not exist, we fail
		if [ -z "$output" ] ; then
			echo -e "- FAILED:\n- SELinux package is NOT installed" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure SELinux is installed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		else
			echo -e "- PASSED:\n- Package found: $output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure SELinux is installed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-101}"
		fi
	
	}

	fed_ensure_selinux_installed_fix()
	{
		echo -e "- Start remediation - Ensure SELinux is installed" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Removing prelink" | tee -a "$LOG" 2>> "$ELOG"
		$G_PM libselinux && 
		if ! $G_PQ libselinux; then
			test="remediated"
		fi
	}

	fed_ensure_selinux_installed_chk
	if [ "$?" = "101" ] || [ "$test" = "NA" ] ; then
		[ -z "$test" ] && test="passed"
	else
		fed_ensure_selinux_installed_fix
		fed_ensure_selinux_installed_chk
		if [ "$?" = "101" ] ; then
			[ "$test" != "failed" ] && test="remediated"
		else
			test="failed"
		fi
	fi

	# Set return code and return
	case "$test" in
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
		*)
			echo "Recommendation \"$RNA\" remediation failed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
			;;
	esac
}