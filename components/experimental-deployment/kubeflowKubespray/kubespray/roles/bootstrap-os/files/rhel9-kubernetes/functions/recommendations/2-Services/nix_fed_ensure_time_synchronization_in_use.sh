#!/usr/bin/env sh
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/fct/nix_fed_ensure_time_synchronization_in_use.sh
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/02/20    Recommendation "Ensure time synchronization is in use"
# Justin Brown       04/18/22    Updated to modern format.
#

fed_ensure_time_synchronization_in_use()
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
	
	# Set package manager information
	if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
		nix_package_manager_set
		[ "$?" != "101" ] && output="- Unable to determine system's package manager"
	fi
	
	fed_ensure_time_synchronization_in_use_chk()
	{
		echo -e "- Start check - Ensure time synchronization is in use" | tee -a "$LOG" 2>> "$ELOG"
		output=""
		
		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && output="- Unable to determine system's package manager"
		fi
		
		if [ -z "$output" ]; then
			# Check if chrony or NTP is installed
			output="- $($G_PQ chrony ntp)"
		fi
		
		# If package doesn't exist, we fail
		if [ -z "$output" ] ; then
			echo -e "- Chrony or NTP packages are not installed" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure time synchronization is in use" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		else
			echo -e "- Package(s) found: $output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure time synchronization is in use" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		fi
	
	}
	
	fed_ensure_time_synchronization_in_use_fix()
	{
		echo -e "- Start remediation - Ensure time synchronization is in use" | tee -a "$LOG" 2>> "$ELOG"
		echo -e "- Installing chrony" | tee -a "$LOG" 2>> "$ELOG"
		$G_PM -y install chrony
		if $G_PQ ntp || $G_PQ chrony; then
			test="remediated"
		fi
		echo -e "- End remediation - Ensure time synchronization is in use" | tee -a "$LOG" 2>> "$ELOG"
	
	}
	
	fed_ensure_time_synchronization_in_use_chk
	if [ "$?" = "101" ] || [ "$test" = "NA" ] ; then
		[ -z "$test" ] && test="passed"
	else
		fed_ensure_time_synchronization_in_use_fix
		fed_ensure_time_synchronization_in_use_chk
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