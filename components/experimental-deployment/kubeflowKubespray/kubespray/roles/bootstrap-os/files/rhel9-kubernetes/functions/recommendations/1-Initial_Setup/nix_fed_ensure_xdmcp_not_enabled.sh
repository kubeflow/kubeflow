#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_xdmcp_not_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown        04/15/22    Recommendation "Ensure XDMCP is not enabled"
# David Neilson		  05/03/23	  Updated to Fedora 34 benchmark

fed_ensure_xdmcp_not_enabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_exit_sts=""
	
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
			
	gnome_installed_chk()
	{
		echo "- Start check - Is GNOME Display Manager Installed" | tee -a "$LOG" 2>> "$ELOG"
		l_output=""
		l_pkgmgr=""
		
		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && l_pkgmgr="- Unable to determine system's package manager"
		fi
		if [ -z "$l_pkgmgr" ]; then
			# Check if GNOME Display Manager is installed
			echo -e "- Checking for GNOME Display Manager package" | tee -a "$LOG" 2>> "$ELOG"
			if $G_PQ gdm 2>/dev/null; then
				l_output="- $($G_PQ gdm)"
			fi
		fi
		# If package doesn't exist, we pass
		if [ -n "$l_pkgmgr" ] ; then
			echo -e "- FAILED: $l_pkgmgr" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Is GNOME Display Manager Installed" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-106}"
		elif [ -z "$l_output" ] ; then
			echo -e "- The GNOME Display Manager package is not installed" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Is GNOME Display Manager Installed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			# print the reason why we are failing
			echo -e "- The GNOME Display Manager package is installed" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Is GNOME Display Manager Installed" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	fed_ensure_xdmcp_not_enabled_chk()
	{
		if [ "$l_test" != "NA" ] ; then
			echo -e "- Start check - Ensure XDMCP is not enabled" | tee -a "$LOG" 2>> "$ELOG"
			if ! grep -Pq -- '^\h*Enable\h*=\h*true' /etc/gdm/custom.conf; then
				echo -e "- PASS: - 'Enable=true' was NOT found in /etc/gdm/custom.conf." | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure XDMCP is not enabled" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-101}"
			else
				echo -e "- FAIL: - 'Enable=true' was found in /etc/gdm/custom.conf."  | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- End check - Ensure XDMCP is not enabled" | tee -a "$LOG" 2>> "$ELOG"
				return "${XCCDF_RESULT_PASS:-102}"
			fi
		fi
	}

	fed_ensure_xdmcp_not_enabled_fix()
	{
		echo -e "- Start remediation - Ensure XDMCP is not enabled" | tee -a "$LOG" 2>> "$ELOG"

		echo -e "- Removing 'Enabled=true from /etc/gdm/custom.conf"  | tee -a "$LOG" 2>> "$ELOG"
		sed -ri 's/^\s*(Enable\s*=\s*true)/#\1/' /etc/gdm/custom.conf
			
		echo -e "- End remediation - Ensure XDMCP is not enabled" | tee -a "$LOG" 2>> "$ELOG"
	}
	
	# Check to see if GDM is installed
	gnome_installed_chk
	l_exit_sts="$?"
	if [ "$l_exit_sts" = "101" ]; then
		l_test="NA"
	elif [ "$l_exit_sts" = "106" ]; then
		l_test="manual"
	else
		# If GDM is installed
		fed_ensure_xdmcp_not_enabled_chk
		if [ "$?" = "101" ]; then
			[ -z "$l_test" ] && l_test="passed"
		else
			fed_ensure_xdmcp_not_enabled_fix
			fed_ensure_xdmcp_not_enabled_chk
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