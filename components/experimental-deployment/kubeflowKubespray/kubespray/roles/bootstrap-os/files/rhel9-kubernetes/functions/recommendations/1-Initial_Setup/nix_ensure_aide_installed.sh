#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_aide_installed.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/15/20    Recommendation "Ensure AIDE is installed"
# Justin Brown       07/31/2022  Updated to modern format
# Justin Brown		 01/9/23	 Updated to support Debian distros that require setup of MTA for AIDE
# 

ensure_aide_installed()
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

	ensure_aide_installed_chk()
	{
		echo "- Start check - Ensure AIDE is installed" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_pkgmgr=""

		# Set package manager information
		if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
			nix_package_manager_set
			[ "$?" != "101" ] && echo -e "- Unable to determine system's package manager" | tee -a "$LOG" 2>> "$ELOG"
		fi

		# Check to see if aide is installed.  If not, we fail.
		if [ -z "$l_output" ]; then
			case "$G_PQ" in
				*rpm*)
					if $G_PQ aide | grep -Eq 'aide-\S+' 2>&1; then
						echo -e "- PASSED:\n- aide package found" | tee -a "$LOG" 2>> "$ELOG"
						echo -e "- End check - Ensure AIDE is installed" | tee -a "$LOG" 2>> "$ELOG"
						return "${XCCDF_RESULT_PASS:-101}"
					else
						echo -e "- FAILED:\n- aide package NOT installed on the system" | tee -a "$LOG" 2>> "$ELOG"
						echo -e "- End check - Ensure AIDE is installed" | tee -a "$LOG" 2>> "$ELOG"
						return "${XCCDF_RESULT_PASS:-102}"
					fi
				;; 
				*dpkg*)
					if $G_PQ aide > /dev/null 2>&1 && $G_PQ aide-common > /dev/null 2>&1; then
						echo -e "- PASSED:\n- aide packages found" | tee -a "$LOG" 2>> "$ELOG"
						echo -e "- End check - Ensure AIDE is installed" | tee -a "$LOG" 2>> "$ELOG"
						return "${XCCDF_RESULT_PASS:-101}"
					else
						echo -e "- FAILED:\n- aide packages NOT installed on the system" | tee -a "$LOG" 2>> "$ELOG"
						echo -e "- End check - Ensure AIDE is installed" | tee -a "$LOG" 2>> "$ELOG"
						return "${XCCDF_RESULT_PASS:-102}"
					fi
				;;
			esac
		else
			# If we can't determine the pkg manager, need manual remediation
			l_pkgmgr="$l_output"
			echo -e "- FAILED:\n- $l_pkgmgr" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure LDAP server is not enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-106}"
		fi
	}

	ensure_aide_installed_fix()
	{
		echo -e "- Start remediation - Ensure AIDE is installed" | tee -a "$LOG" 2>> "$ELOG"

		case "$G_PQ" in
			*rpm*)
				echo -e "Installing AIDE packages" | tee -a "$LOG" 2>> "$ELOG"
				$G_PM -y install aide
				echo -e "Initializing AIDE, this may take a few minutes" | tee -a "$LOG" 2>> "$ELOG"
				aide --init
				mv -f /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz
			;;
			*dpkg*)
				echo -e "- Installation of the AIDE package requires the configuration of an MTA.\n- Install AIDE using the appropriate package manager or manual installation:\n  # apt install aide aide-common" | tee -a "$LOG" 2>> "$ELOG"
				echo -e "- Configure AIDE as appropriate for your environment. Consult the AIDE documentation for options.\n- Run the following commands to initialize AIDE:\n  # aideinit\n  # mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db" | tee -a "$LOG" 2>> "$ELOG"
				l_test="manual"
				return "${XCCDF_RESULT_PASS:-106}"
			;;
		esac
	}

	ensure_aide_installed_chk
   if [ "$?" = "101" ]; then
    	[ -z "$l_test" ] && l_test="passed"
   else
      	ensure_aide_installed_fix
      	if [ "$l_test" != "manual" ]; then
        	ensure_aide_installed_chk
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