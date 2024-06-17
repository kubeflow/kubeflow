#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_permissions_sshd_config_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/22/20    Recommendation "Ensure permissions on /etc/ssh/sshd_config are configured"
# Justin Brown		 05/03/22    Update to modern format.
#
 
ensure_permissions_sshd_config_configured()
{
	sshd_config_file="/etc/ssh/sshd_config"
	test=""
	
	# Checks for $sshd_config_file permissions
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"

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
	
	ensure_permissions_sshd_config_configured_chk()
	{
		output="" l_fperm="" l_fog="" tst1="" tst2=""
		
		echo -e "- Start check - Ensure permissions on /etc/ssh/sshd_config are configured." | tee -a "$LOG" 2>> "$ELOG"
		
		if [ -f "$sshd_config_file" ]; then
			l_fperm="$(stat -Lc "%a" $sshd_config_file)"
			l_fog="$(stat -Lc "%U %G" $sshd_config_file)"
			grep -Pq -- '^\h*[0,2,4,6]00\h*$' <<< "$l_fperm" && tst1="pass"
			grep -Pq -- '^\h*root\h+root\h*$' <<< "$l_fog" && tst2="pass"
			output="- \"$sshd_config_file\" is mode: \"$l_fperm\" and has owner and group of: \"$l_fog\""
		else
			output="- \"$sshd_config_file\" doesn't exist"
		fi
		
		if [ "$tst1" = "pass" ] && [ "$tst2" = "pass" ]; then
			echo -e "- PASS:\n$output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure permissions on /etc/ssh/sshd_config are configured." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n$output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure permissions on /etc/ssh/sshd_config are configured." | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}
	
	ensure_permissions_sshd_config_configured_fix()
	{
		echo -e "- Start remediation - Ensure permissions on /etc/ssh/sshd_config are configured" | tee -a "$LOG" 2>> "$ELOG"
		if [ ! -f "$sshd_config_file" ]; then
			echo -e "- creating \"$sshd_config_file\""
			touch "$sshd_config_file"
		fi
		if [ -f "$sshd_config_file" ]; then
			if ! stat -Lc "%a" $sshd_config_file | grep -Pq -- '^\h*[0,2,4,6]00\h*$'; then
				echo -e "- Removing excess permissions from \"$sshd_config_file\"" | tee -a "$LOG" 2>> "$ELOG"
				chmod u-x,og-rwx "$sshd_config_file"
			fi
			if ! stat -Lc "%U %G" $sshd_config_file | grep -Pq -- '^\h*root\h+root\h*$'; then
				echo -e "- Setting ownership on \"$sshd_config_file\"" | tee -a "$LOG" 2>> "$ELOG"
				chown root:root "$sshd_config_file"
			fi
		fi
		echo -e "- End remediation - Ensure permissions on /etc/ssh/sshd_config are configured" | tee -a "$LOG" 2>> "$ELOG"
	}
	
			
	# Check is package manager is defined
	if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
		nix_package_manager_set
		[ "$?" = "102" ] && test="manual"
	fi

	# Check is openssh-server is installed
	if ! $G_PQ openssh-server >/dev/null; then
		test="NA"
	else
		ensure_permissions_sshd_config_configured_chk
		if [ "$?" = "101" ]; then
			[ -z "$test" ] && test="passed"
		else
			ensure_permissions_sshd_config_configured_fix
			ensure_permissions_sshd_config_configured_chk
			if [ "$?" = "101" ]; then
				[ "$test" != "failed" ] && test="remediated"
			fi
		fi
	fi
	
	# Set return code, end recommendation entry in verbose log, and return
	case "$test" in
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