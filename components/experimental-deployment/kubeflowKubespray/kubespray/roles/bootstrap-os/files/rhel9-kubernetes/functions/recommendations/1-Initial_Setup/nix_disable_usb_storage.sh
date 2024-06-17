#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_disable_usb_storage.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/11/20    Recommendation "Disable USB Storage"
# Justin Brown       07/31/22    Updated to modern format

disable_usb_storage()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
	l_mname="usb-storage"

   disable_usb_storage_chk()
   {
      echo -e "- Start check - Disable USB Storage" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" l_output2="" l_loadable=""

      # Check how module will be loaded
      l_loadable="$(modprobe -n -v "$l_mname")"
      if grep -Pq -- '^\h*install \/bin\/(true|false)' <<< "$l_loadable"; then
         l_output="$l_output\n - module: \"$l_mname\" is not loadable: \"$l_loadable\""
      else
         l_output2="$l_output2\n - module: \"$l_mname\" is loadable: \"$l_loadable\""
      fi

      # Check is the module currently loaded
      if ! lsmod | grep "$l_mname" > /dev/null 2>&1; then
         l_output="$l_output\n - module: \"$l_mname\" is not loaded"
      else
         l_output2="$l_output2\n - module: \"$l_mname\" is loaded"
      fi

      # Check if the module is deny listed
      if grep -Pq -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*; then
         l_output="$l_output\n - module: \"$l_mname\" is deny listed in: \"$(grep -Pl -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*)\""
      else
         l_output2="$l_output2\n - module: \"$l_mname\" is not deny listed"
      fi

      # Report results. If no failures output in l_output2, we pass
      if [ -z "$l_output2" ]; then
			echo -e "- PASS:\n- $l_output"  | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Disable USB Storage" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Reason(s) for audit failure:\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Disable USB Storage" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi	
   }

   disable_usb_storage_fix()
   {
      echo -e "- Start remediation - Disable USB Storage" | tee -a "$LOG" 2>> "$ELOG"

      if ! modprobe -n -v "$l_mname" | grep -P -- '^\h*install \/bin\/(true|false)'; then
         echo -e " - setting module: \"$l_mname\" to be not loadable" | tee -a "$LOG" 2>> "$ELOG"
         echo -e "install $l_mname /bin/false" >> /etc/modprobe.d/"$l_mname".conf
      fi
      if lsmod | grep "$l_mname" > /dev/null 2>&1; then
         echo -e " - unloading module \"$l_mname\"" | tee -a "$LOG" 2>> "$ELOG"
         modprobe -r "$l_mname"
      fi
      if ! grep -Pq -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*; then
         echo -e " - deny listing \"$l_mname\"" | tee -a "$LOG" 2>> "$ELOG"
         echo -e "blacklist $l_mname" >> /etc/modprobe.d/"$l_mname".conf
      fi

      l_loadable="$(modprobe -n -v "$l_mname")"
      if grep -Pq -- '^\h*install \/bin\/(true|false)' <<< "$l_loadable"; then
         if ! lsmod | grep "$l_mname" > /dev/null 2>&1; then
            if grep -Pq -- "^\h*blacklist\h+$l_mname\b" /etc/modprobe.d/*; then
               test=remediated
            fi
         fi
      fi

      echo -e "- End remediation - Disable USB Storage" | tee -a "$LOG" 2>> "$ELOG"
   }

   disable_usb_storage_chk
   if [ "$?" = "101" ]; then
      [ -z "$test" ] && test="passed"
   else
      disable_usb_storage_fix
      if [ "$test" != "manual" ]; then
         disable_usb_storage_chk
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