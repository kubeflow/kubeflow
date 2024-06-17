#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_auditd_installed.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Ensure auditd is installed"
# David Neilson	     07/20/22	 Updated to latest standards
# David Neilson	     10/22/22	 Handles Ubuntu and Fedora having different packages
ensure_auditd_installed()
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

	ensure_auditd_installed_chk()
	{
		echo "- Start check - Ensure auditd and audit-libs are installed" | tee -a "$LOG" 2>> "$ELOG"
		l_output=""
		l_test1=""
		l_test2=""
		
		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && l_output="- Unable to determine system's package manager"
		fi

		# Determine if both auditd and audispd-plugins are installed
		if [ -z "$l_output" ]; then
			case "$G_PQ" in 
				*rpm*)
					$G_PQ audit | grep -Eq 'audit-\S+'&& l_test1="passed"
       			    $G_PQ audit-libs | grep -Eq 'audit-libs-\S+'&& l_test2="passed"
				;;
				*dpkg*)
					$G_PQ auditd && l_test1="passed"
					$G_PQ audispd-plugins && l_test2="passed"
				;;
			esac
		fi
		
		# If either package isn't installed (l_test1 and/or l_test2 is blank), we fail
		if [ -z "$l_test1" -o -z "$l_test2" ] ; then
			echo -e "- auditd package(s) were NOT found." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - audit package(s)" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		else
			echo -e "- PASS:\n auditd packages are installed." | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - auditd packages" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		fi
	}

	ensure_auditd_installed_fix()
	{
		echo -e "- Start remediation - Ensure audit packages are installed." | tee -a "$LOG" 2>> "$ELOG"
		
		case "$G_PQ" in 
			*rpm*)
				if [ -z "$l_test1" ]; then
					echo -e "- Installing audit package" | tee -a "$LOG" 2>> "$ELOG"
					$G_PM install -y audit
				fi

				if [ -z "$l_test2" ]; then
					echo -e "- Installing audit-libs package" | tee -a "$LOG" 2>> "$ELOG"
					$G_PM install -y audit-libs
				fi
			;;
			*dpkg*)
				if [ -z "$l_test1" ]; then
					echo -e "- Installing auditd package" | tee -a "$LOG" 2>> "$ELOG"
					$G_PM install -y auditd
				fi

				if [ -z "$l_test2" ]; then
					echo -e "- Installing audispd-plugins package" | tee -a "$LOG" 2>> "$ELOG"
					$G_PM install -y audispd-plugins
				fi
			;;
		esac

		echo -e "- Reloading daemons" | tee -a "$LOG" 2>> "$ELOG"
		systemctl daemon-reload
				
		echo -e "- End remediation - Ensure auditd packages are installed." | tee -a "$LOG" 2>> "$ELOG"
	}

	ensure_auditd_installed_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_auditd_installed_fix
		ensure_auditd_installed_chk
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