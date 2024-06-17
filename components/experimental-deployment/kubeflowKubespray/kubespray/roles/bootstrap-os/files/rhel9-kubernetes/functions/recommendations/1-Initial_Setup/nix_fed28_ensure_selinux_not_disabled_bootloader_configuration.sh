#!/usr/bin/env bash
#
# CIS-LBK Cloud Team Built Recommendation Function
# ~/CIS-LBK/functions/recommendation/nix_fed28_ensure_selinux_not_disabled_bootloader_configuration.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/29/20    Recommendation "Ensure SELinux is not disabled in bootloader configuration"
# David Neilson	     06/23/22	 Updated to latest standards
# David Neilson      04/01/23    Updated for grubby, grub2-mkconfig is deprecated.
# David Neilson      04/07/23    Added code to deal with kernelopts if the grubby command fails.  Also, renamed to fed28.

fed28_ensure_selinux_not_disabled_bootloader_configuration()
{

	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	fed28_ensure_selinux_not_disabled_bootloader_configuration_chk()
	{
		echo -e "- Start check - Ensure SELinux is not disabled in bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
      	l_test1=""
		
		# Verify that neither the selinux=0 or enforcing=0 parameters have been set:
		if ! grubby --info=ALL | grep -Po '(selinux|enforcing)=0\b'; then
			l_test1="passed"
		fi
				
		if [ "$l_test1" = "passed" ]; then
			echo -e "- PASSED:\n- SELinux is not disabled in bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SELinux Bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAILED:\n- SELinux is enabled in the bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - SELinux Bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-102}"
		fi
	}

	fed28_ensure_selinux_not_disabled_bootloader_configuration_fix()
	{
		echo -e "- Start remediation - Ensuring SELinux is not disabled in bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"

		grubby --update-kernel ALL --remove-args "selinux=0 enforcing=0"
        grep -Prsq -- '\h*([^#\n\r]+\h+)?kernelopts=([^#\n\r]+\h+)?(selinux|enforcing)=0\b' /boot/grub2 /boot/efi && grub2-mkconfig -o "$(grep -Prl -- '\h*([^#\n\r]+\h+)?kernelopts=([^#\n\r]+\h+)?(selinux|enforcing)=0\b' /boot/grub2 /boot/efi)"

		echo -e "- End remediation - Ensure SELinux is not disabled in bootloader configuration" | tee -a "$LOG" 2>> "$ELOG"
	}

	fed28_ensure_selinux_not_disabled_bootloader_configuration_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		fed28_ensure_selinux_not_disabled_bootloader_configuration_fix
		fed28_ensure_selinux_not_disabled_bootloader_configuration_chk
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