#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_squash_filesystem_disabled.sh
#
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       07/20/22    Recommendation "Ensure mounting of squashfs filesystems is disabled"

ensure_squashfs_filesystem_disabled()
{

echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""

   ensure_squashfs_filesystem_disabled_chk()
   {
      echo -e "- Start check - Ensure mounting of squashfs filesystems is disabled" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" 
      l_loadable_val="" l_loaded_val="" l_denied_val=""
      l_loadable_test="" l_loaded_test="" l_denied_test=""
      XCCDF_VALUE_REGEX="squashfs"

      # Test module loadable
      l_loadable_val="$(modprobe -n -v "$XCCDF_VALUE_REGEX")"
      if modprobe -n -v "$XCCDF_VALUE_REGEX" | grep -Eq "^\s*install\s+\/bin\/(true|false)\b" || [ -z "$l_loadable_val" ]; then
         if [ -z "$l_output" ]; then
            l_output="$l_loadable_val" && l_loadable_test=passed
         else
            l_output="$l_output\n$l_loadable_val" && l_loadable_test=passed
         fi
      else
         if [ -z "$l_output" ]; then
            l_output="$l_loadable_val"
         else
            l_output="$l_output\n$l_loadable_val"
         fi
      fi

      # Test module loaded
      l_loaded_val="$(lsmod | grep "$XCCDF_VALUE_REGEX")"
      if [ -z "$l_loaded_val" ]; then
         if [ -z "$l_output" ]; then
            l_output="$XCCDF_VALUE_REGEX does NOT appear to be loaded" && l_loaded_test=passed
         else
            l_output="$l_output\n$XCCDF_VALUE_REGEX does NOT appear to be loaded" && l_loaded_test=passed
         fi
      else
         if [ -z "$l_output" ]; then
            l_output="$l_loaded_val"
         else
            l_output="$l_output\n$l_loaded_val"
         fi
      fi

      # Test module denied
      l_denied_val="$(grep -E "^blacklist\s+$XCCDF_VALUE_REGEX" /etc/modprobe.d/*)"
      if [ -n "$l_denied_val" ]; then
         if [ -z "$l_output" ]; then
            l_output="$l_denied_val" && l_denied_test=passed
         else
            l_output="$l_output\n$l_denied_val" && l_denied_test=passed
         fi
      else
         if [ -z "$l_output" ]; then
            l_output="$XCCDF_VALUE_REGEX does NOT appear to be denied in /etc/modprobe.d/*"
         else
            l_output="$XCCDF_VALUE_REGEX does NOT appear to be denied in /etc/modprobe.d/*"
         fi
      fi

      if [ "$l_loadable_test" = "passed" ] && [ "$l_loaded_test" = "passed" ] && [ "$l_denied_test" = "passed" ]; then
			echo -e "- PASS:\n- $l_output"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure mounting of squashfs filesystems is disabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- $l_output" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure mounting of squashfs filesystems is disabled" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
   }

   ensure_squashfs_filesystem_disabled_fix()
   {
      echo -e "- Start remediation - Ensure mounting of squashfs filesystems is disabled" | tee -a "$LOG" 2>> "$ELOG"

      # Update modprobe.d file
      if ! grep -E "^install\s+$XCCDF_VALUE_REGEX\s+\/bin\/(true|false)\b" /etc/modprobe.d/*; then
         echo -e "- Adding 'install /bin/true' to  /etc/modprobe.d/$XCCDF_VALUE_REGEX.conf"  | tee -a "$LOG" 2>> "$ELOG"
         echo "install $XCCDF_VALUE_REGEX /bin/true" >> /etc/modprobe.d/"$XCCDF_VALUE_REGEX".conf && test=remediated
      fi

      if ! grep -E "^blacklist\s+$XCCDF_VALUE_REGEX" /etc/modprobe.d/*; then
         echo -e "- Adding 'blacklist' to  /etc/modprobe.d/$XCCDF_VALUE_REGEX.conf"  | tee -a "$LOG" 2>> "$ELOG"
         echo "blacklist $XCCDF_VALUE_REGEX" >> /etc/modprobe.d/"$XCCDF_VALUE_REGEX".conf && test=remediated
      fi

      # Unload module
      if [ -n "$(lsmod | grep $XCCDF_VALUE_REGEX)" ]; then
         echo -e "- Unloading $XCCDF_VALUE_REGEX module"  | tee -a "$LOG" 2>> "$ELOG"
         modprobe -r "$XCCDF_VALUE_REGEX" && test=remediated
      fi

      echo -e "- End remediation - Ensure mounting of squashfs filesystems is disabled" | tee -a "$LOG" 2>> "$ELOG"
   }

   ensure_squashfs_filesystem_disabled_chk
   if [ "$?" = "101" ]; then
      [ -z "$test" ] && test="passed"
   else
      ensure_squashfs_filesystem_disabled_fix
      if [ "$test" != "manual" ]; then
         ensure_squashfs_filesystem_disabled_chk
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