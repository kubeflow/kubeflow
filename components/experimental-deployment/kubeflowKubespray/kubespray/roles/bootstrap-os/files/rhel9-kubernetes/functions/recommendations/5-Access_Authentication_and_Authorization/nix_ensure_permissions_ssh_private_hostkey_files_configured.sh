#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_permissions_ssh_private_hostkey_files_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/22/20    Recommendation "Ensure permissions on SSH private host key files are configured"
# Justin Brown       05/14/22    Updated to modern format
# Justin Brown       11/29/22    Refactored to align with audit and remediation from prose
# 
 
ensure_permissions_ssh_private_hostkey_files_configured()
{
   echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
   test=""
   
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
   
   ensure_permissions_ssh_private_hostkey_files_configured_chk()
	{
      echo -e "- Start check - Ensure permissions on SSH private host key files are configured" | tee -a "$LOG" 2>> "$ELOG"
      l_output="" file=""
      
      if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
         nix_package_manager_set
      fi
      
      # Check is openssh-server is installed
      if ! $G_PQ openssh-server >/dev/null ; then
         test=NA
      else
         l_output="" l_output2=""
         l_skgn="ssh_keys" # Group designated to own openSSH keys
         l_skgid="$(awk -F: '($1 == "'"$l_skgn"'"){print $3}' /etc/group)"

         [ -n "$l_skgid" ] && l_cga="$l_skgn" || l_cga="root"
         
         awk '{print}' <<< "$(find -L /etc/ssh -xdev -type f -exec stat -Lc "%n %#a %U %G %g" {} +)" | (while read -r  l_file l_mode l_owner l_group l_gid; do
      
            if file "$l_file" | grep -Pq ':\h+OpenSSH\h+private\h+key\b'; then
               [ "$l_gid" = "$l_skgid" ] && l_pmask="0137" || l_pmask="0177"
               l_maxperm="$( printf '%o' $(( 0777 & ~$l_pmask )) )"
               
               if [ $(( $l_mode & $l_pmask )) -gt 0 ]; then
                  l_output2="$l_output2\n - File: \"$l_file\" is mode \"$l_mode\" should be mode: \"$l_maxperm\" or more restrictive"
               else 
                  l_output="$l_output\n - File: \"$l_file\" is mode \"$l_mode\" should be mode: \"$l_maxperm\" or more restrictive"
               fi
            
               if [ "$l_owner" != "root" ]; then
                  l_output2="$l_output2\n - File: \"$l_file\" is owned by: \"$l_owner\" should be owned by \"root\""
               else
                  l_output="$l_output\n - File: \"$l_file\" is owned by: \"$l_owner\" should be owned by \"root\""
               fi
            
               if [ "$l_group" != "root" ] && [ "$l_gid" != "$l_skgid" ]; then
                  l_output2="$l_output2\n - File: \"$l_file\" is owned by group \"$l_group\" should belong to group \"$l_cga\""
               else
                  l_output="$l_output\n - File: \"$l_file\" is owned by group \"$l_group\" should belong to group \"$l_cga\""
               fi
            fi
         done

         if [ -z "$l_output2" ]; then
            echo -e "- PASS:\n  - Correctly set:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure permissions on SSH private host key files are configured" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
         else
            echo -e "- FAIL:\n  - Incorrectly set:\n$l_output2\n  - Correctly set:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure permissions on SSH private host key files are configured" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
         fi
         )
      fi
   }
   
   ensure_permissions_ssh_private_hostkey_files_configured_fix()
	{
      echo -e "- Start remediation - Ensure permissions on SSH private host key files are configured" | tee -a "$LOG" 2>> "$ELOG"
      
      l_skgn="ssh_keys" # Group designated to own openSSH keys
      l_skgid="$(awk -F: '($1 == "'"$l_skgn"'"){print $3}' /etc/group)"
   
      [ -n "$l_skgid" ] && l_cga="$l_skgn" || l_cga="root"
   
      awk '{print}' <<< "$(find -L /etc/ssh -xdev -type f -exec stat -L -c "%n %#a %U %G %g" {} +)" | (while read -r  l_file l_mode l_owner l_group l_gid; do
      
         if file "$l_file" | grep -Pq ':\h+OpenSSH\h+private\h+key\b'; then
            [ "$l_gid" = "$l_skgid" ] && l_pmask="0137" || l_pmask="0177"
            l_maxperm="$( printf '%o' $(( 0777 & ~$l_pmask )) )"
            
            if [ $(( $l_mode & $l_pmask )) -gt 0 ]; then
               echo -e " - File: \"$l_file\" is mode \"$l_mode\" changing to mode: \"$l_maxperm\""
               
               if [ -n "$l_skgid" ]; then
                  chmod u-x,g-wx,o-rwx "$l_file"
               else
                  chmod u-x,go-rwx "$l_file"
               fi
            fi
         
            if [ "$l_owner" != "root" ]; then
               echo -e " - File: \"$l_file\" is owned by: \"$l_owner\" changing owner to \"root\""
               chown root "$l_file"
            fi
         
            if [ "$l_group" != "root" ] && [ "$l_gid" != "$l_skgid" ]; then
               echo -e " - File: \"$l_file\" is owned by group \"$l_group\" should belong to group \"$l_cga\""
               chgrp "$l_cga" "$l_file"
            fi
         fi
      done
      )   

      echo -e "- End remediation - Ensure permissions on SSH private host key files are configured" | tee -a "$LOG" 2>> "$ELOG"
   }
   
   ensure_permissions_ssh_private_hostkey_files_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$test" ] && test="passed"
	else
      if [ "$test" != "NA" ]; then
         ensure_permissions_ssh_private_hostkey_files_configured_fix
         ensure_permissions_ssh_private_hostkey_files_configured_chk
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