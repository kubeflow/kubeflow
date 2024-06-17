#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_gdm_screen_locks_cannot_be_overridden.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/30/22    Recommendation "Ensure GDM screen locks cannot be overridden"
#

ensure_gdm_screen_locks_cannot_be_overridden()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""

    ensure_gdm_screen_locks_cannot_be_overridden_chk()
	{
		echo "- Start check - Ensure GDM screen locks cannot be overridden" | tee -a "$LOG" 2>> "$ELOG"
        l_pkgoutput=""

        if command -v dpkg-query > /dev/null 2>&1; then
            l_pq="dpkg-query -W"
        elif command -v rpm > /dev/null 2>&1; then
            l_pq="rpm -q"
        fi

        l_pcl="gdm gdm3" # Space seporated list of packages to check
        
        for l_pn in $l_pcl; do
            $l_pq "$l_pn" > /dev/null 2>&1 && l_pkgoutput="$l_pkgoutput\n - Package: \"$l_pn\" exists on the system\n - checking configuration"
        done

        # Check configuration (If applicable)
        if [ -n "$l_pkgoutput" ]; then
            l_output="" l_output2=""
            
            # Look for idle-delay to determine profile in use, needed for remaining tests
            l_kfd="/etc/dconf/db/$(grep -Psril '^\h*idle-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
            l_kfd2="/etc/dconf/db/$(grep -Psril '^\h*lock-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
            
            if [ -d "$l_kfd" ]; then # If key file directory doesn't exist, options can't be locked
                if grep -Prilq '\/org\/gnome\/desktop\/session\/idle-delay\b' "$l_kfd"; then
                    l_output="$l_output\n - \"idle-delay\" is locked in \"$(grep -Pril '\/org\/gnome\/desktop\/session\/idle-delay\b' "$l_kfd")\""
                else
                    l_output2="$l_output2\n - \"idle-delay\" is not locked"
                fi
            else
                l_output2="$l_output2\n - \"idle-delay\" is not set so it can not be locked"
            fi
            
            if [ -d "$l_kfd2" ]; then # If key file directory doesn't exist, options can't be locked
                if grep -Prilq '\/org\/gnome\/desktop\/screensaver\/lock-delay\b' "$l_kfd2"; then
                    l_output="$l_output\n - \"lock-delay\" is locked in \"$(grep -Pril '\/org\/gnome\/desktop\/screensaver\/lock-delay\b' "$l_kfd2")\""
                else
                    l_output2="$l_output2\n - \"lock-delay\" is not locked"
                fi
            else
                l_output2="$l_output2\n - \"lock-delay\" is not set so it can not be locked"
            fi
        else
            l_output="$l_output\n - GNOME Desktop Manager package is not installed on the system\n  - Recommendation is not applicable"
            echo -e "- End check - Ensure GDM screen locks when the user is idle" | tee -a "$LOG" 2>> "$ELOG"
            l_test="NA"
        fi
        
        # Report results. If no failures output in l_output2, we pass
        [ -n "$l_pkgoutput" ] && echo -e "\n$l_pkgoutput"
        if [ -z "$l_output2" ]; then
            echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
            echo -e "- End check - Ensure GDM screen locks cannot be overridden" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
            [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
            echo -e "- End check - Ensure GDM screen locks cannot be overridden" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
    }

    ensure_gdm_screen_locks_cannot_be_overridden_fix()
	{
        echo -e "- Start remediation - Ensure GDM screen locks cannot be overridden" | tee -a "$LOG" 2>> "$ELOG"      
      
        # Look for idle-delay to determine profile in use, needed for remaining tests
        l_kfd="/etc/dconf/db/$(grep -Psril '^\h*idle-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
        
        # Look for lock-delay to determine profile in use, needed for remaining tests
        l_kfd2="/etc/dconf/db/$(grep -Psril '^\h*lock-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/ | awk -F'/' '{split($(NF-1),a,".");print a[1]}').d" #set directory of key file to be locked
        
        if [ -d "$l_kfd" ]; then # If key file directory doesn't exist, options can't be locked
            if grep -Prilq '^\h*\/org\/gnome\/desktop\/session\/idle-delay\b' "$l_kfd"; then
                echo -e " - \"idle-delay\" is locked in \"$(grep -Pril '^\h*\/org\/gnome\/desktop\/session\/idle-delay\b' "$l_kfd")\"" | tee -a "$LOG" 2>> "$ELOG"
            else
                echo -e "creating entry to lock \"idle-delay\"" | tee -a "$LOG" 2>> "$ELOG"
                [ ! -d "$l_kfd"/locks ] && echo "creating directory $l_kfd/locks" && mkdir "$l_kfd"/locks
                {
                echo -e '\n# Lock desktop screensaver idle-delay setting' | tee -a "$LOG" 2>> "$ELOG"
                echo '/org/gnome/desktop/session/idle-delay'
                } >> "$l_kfd"/locks/00-screensaver        
            fi
        else
            echo -e " - \"idle-delay\" is not set so it can not be locked\n - Please follow Recommendation \"Ensure GDM screen locks when the user is idle\" and follow this Recommendation again" | tee -a "$LOG" 2>> "$ELOG"
        fi
        
        if [ -d "$l_kfd2" ]; then # If key file directory doesn't exist, options can't be locked
            if grep -Prilq '^\h*\/org\/gnome\/desktop\/screensaver\/lock-delay\b' "$l_kfd2"; then
                echo -e " - \"lock-delay\" is locked in \"$(grep -Pril '^\h*\/org\/gnome\/desktop\/screensaver\/lock-delay\b' "$l_kfd2")\"" | tee -a "$LOG" 2>> "$ELOG"
            else
                echo -e "creating entry to lock \"lock-delay\"" | tee -a "$LOG" 2>> "$ELOG"
                [ ! -d "$l_kfd2"/locks ] && echo "creating directory $l_kfd2/locks" && mkdir "$l_kfd2"/locks
                {
                echo -e '\n# Lock desktop screensaver lock-delay setting' | tee -a "$LOG" 2>> "$ELOG"
                echo '/org/gnome/desktop/screensaver/lock-delay'
                } >> "$l_kfd2"/locks/00-screensaver       
            fi
        else
            echo -e " - \"lock-delay\" is not set so it can not be locked\n - Please follow Recommendation \"Ensure GDM screen locks when the user is idle\" and follow this Recommendation again" | tee -a "$LOG" 2>> "$ELOG"
        fi
   
        echo -e "- Running 'dconf update'" | tee -a "$LOG" 2>> "$ELOG"
        dconf update
      
        echo -e "- End remediation - Ensure GDM screen locks cannot be overridden" | tee -a "$LOG" 2>> "$ELOG"
    }

    ensure_gdm_screen_locks_cannot_be_overridden_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_gdm_screen_locks_cannot_be_overridden_fix
            ensure_gdm_screen_locks_cannot_be_overridden_chk
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