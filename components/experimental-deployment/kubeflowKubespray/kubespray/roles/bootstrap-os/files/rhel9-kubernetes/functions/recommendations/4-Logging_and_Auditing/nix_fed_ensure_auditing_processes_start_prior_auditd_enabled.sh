#!/usr/bin/env sh
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_fed_ensure_auditing_processes_start_prior_auditd_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       11/03/20    Recommendation "Ensure auditing for processes that start prior to auditd is enabled"
# Eric Pinnell       01/14/21    Modified - Updated variable name to correct conflict with a global variable 
# David Neilson	     07/23/22	 Updated to current standards

fed_ensure_auditing_processes_start_prior_auditd_enabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	fed_ensure_auditing_processes_start_prior_auditd_enabled_chk()
	{
		echo -e "- Start check - Ensure auditing for processes that start prior to auditd is enabled" | tee -a "$LOG" 2>> "$ELOG"
		l_test1=""
		l_test2=""		

		# Verify that each "linux" line has the "audit=1" parameter set
		l_efidir=$(find /boot/efi/EFI/* -type d -not -name 'BOOT')
		l_gbdir=$(find /boot -maxdepth 1 -type d -name 'grub*')

		if [ -f "$l_efidir"/grub.cfg ]; then
			echo -e "- Checking for audit=1 in $l_efidir/grub.cfg" | tee -a "$LOG" 2>> "$ELOG"
			if grep -P "(kernelopts=|linux|kernel)" "$l_efidir"/grub.cfg | grep -Eq "audit=1\b"; then
				echo -e "- audit=1 found in $l_efidir/grub.cfg" | tee -a "$LOG" 2>> "$ELOG"
				l_test1="passed"
			else
				echo -e "- audit=1 NOT found in $l_efidir/grub.cfg" | tee -a "$LOG" 2>> "$ELOG"
				l_test1="failed"
			fi
		elif [ -f "$l_gbdir"/grub.cfg ]; then
			echo -e "- Checking audit=1 in $l_gbdir/grub.cfg" | tee -a "$LOG" 2>> "$ELOG"
			if grep -P "(kernelopts=|linux|kernel)" "$l_gbdir"/grub.cfg | grep -Eq "audit=1\b"; then
				echo -e "- audit=1 found in $l_gbdir/grub.cfg" | tee -a "$LOG" 2>> "$ELOG"
                l_test2="passed"
        	else
				echo -e "- audit=1 NOT found in $l_gbdir/grub.cfg" | tee -a "$LOG" 2>> "$ELOG"
            	l_test2="failed"
        	fi
		else
			echo -e "- No grub.cfg files found" | tee -a "$LOG" 2>> "$ELOG"
			l_test1="failed"
			l_test2="failed"
		fi

		# If either the $l_efidir or $l_gbdir grub.cfg equals "passed", the grub.conf file has a "linux" line with "audit=1", and we pass.  It is impossible for one to 
		# equal "passed" and the other to equal "failed", based on the if else statement above.
		if [ "$l_test1" = "passed"  -o "$l_test2" = "passed" ]; then
			echo -e "- PASSED:\n- Processes can be audited that start prior to auditd being enabled" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure auditing for processes that start prior to auditd is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		# If both $l_test1 or $l_test2 equal "failed", we don't know what the bootloader is.  
		elif [ "$l_test1" = "failed"  -a "$l_test2" = "failed" ]; then
			l_test="manual"
			echo -e "- Remediation required:\n- Could not determine SELinux bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-106}"
		# At this point, if one or the other variable equals "failed", we fail.    
		elif [ "$l_test1" = "failed"  -o "$l_test2" = "failed" ]; then
			echo -e "- FAILED:\n- Processes that start prior to auditd can NOT be audited" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure auditing for processes that start prior to auditd is enabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		fi	
	}

	fed_ensure_auditing_processes_start_prior_auditd_enabled_fix()
	{
		echo -e "- Start remediation - Ensure auditing for processes that start prior to auditd is enabled" | tee -a "$LOG" 2>> "$ELOG"

		# If both l_test1 and l_test2 equal "failed", we don't know what the bootloader is.
		if [ "$l_test1" = "failed" ] && [ "$l_test2" = "failed" ]; then
			echo -e "- Unknown bootloader" | tee -a "$LOG" 2>> "$ELOG"
		elif [ "$l_test1" = "failed" ] || [ "$l_test2" = "failed" ]; then
			if grep -Eq '^\s*GRUB_CMDLINE_LINUX="([^#]+\s+)?audit=' /etc/default/grub; then
				echo -e "- Updating audit value in /etc/default/grub" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/(^\s*GRUB_CMDLINE_LINUX.*)(audit=[01]+)(.*$)/\1audit=1\3/' /etc/default/grub
			else
				echo -e "- Adding audit=1 value to /etc/default/grub" | tee -a "$LOG" 2>> "$ELOG"
				sed -ri 's/(^\s*GRUB_CMDLINE_LINUX.*=".*)("$)/\1 audit=1\2/' /etc/default/grub
			fi
			if [ "$l_test2" = "failed" ]; then
				grub2-mkconfig -o "$l_gbdir"/grub.cfg
			else
				grub2-mkconfig -o "$l_efidir"/grub.cfg
			fi	
		fi

		echo -e "- End remediation - Ensure auditing for processes that start prior to auditd is enabled" | tee -a "$LOG" 2>> "$ELOG"
	}

	fed_ensure_auditing_processes_start_prior_auditd_enabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	elif [ "$l_test" = "manual" ]; then
		:
	else
		fed_ensure_auditing_processes_start_prior_auditd_enabled_fix
		fed_ensure_auditing_processes_start_prior_auditd_enabled_chk
		if [ "$?" = "101" ]; then
			[ "$l_test" != "failed" ] && l_test="remediated"
		else
			l_test="failed"
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