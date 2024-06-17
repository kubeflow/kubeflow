#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_gdm_screen_locks_when_user_idle.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/30/22    Recommendation "Ensure GDM screen locks when the user is idle"
#

ensure_gdm_screen_locks_when_user_idle()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""

    ensure_gdm_screen_locks_when_user_idle_chk()
	{
		echo "- Start check - Ensure GDM screen locks when the user is idle" | tee -a "$LOG" 2>> "$ELOG"
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

            l_idmv="900" # Set for max value for idle-delay in seconds
            l_ldmv="5" # Set for max value for lock-delay in seconds
            
            # Look for idle-delay to determine profile in use, needed for remaining tests
            l_kfile="$(grep -Psril '^\h*idle-delay\h*=\h*uint32\h+\d+\b' /etc/dconf/db/*/)" # Determine file containing idle-delay key
            
            if [ -n "$l_kfile" ]; then
                # set profile name (This is the name of a dconf database)
                l_profile="$(awk -F'/' '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")" #Set the key profile name
                l_pdbdir="/etc/dconf/db/$l_profile.d" # Set the key file dconf db directory

                # Confirm that idle-delay exists, includes unit32, and value is between 1 and max value for idle-delay
                l_idv="$(awk -F 'uint32' '/idle-delay/{print $2}' "$l_kfile" | xargs)"
                
                if [ -n "$l_idv" ]; then
                    [ "$l_idv" -gt "0" -a "$l_idv" -le "$l_idmv" ] && l_output="$l_output\n - The \"idle-delay\" option is set to \"$l_idv\" seconds in \"$l_kfile\""
                    [ "$l_idv" = "0" ] && l_output2="$l_output2\n - The \"idle-delay\" option is set to \"$l_idv\" (disabled) in \"$l_kfile\""
                    [ "$l_idv" -gt "$l_idmv" ] && l_output2="$l_output2\n - The \"idle-delay\" option is set to \"$l_idv\" seconds (greater than $l_idmv) in \"$l_kfile\""
                else
                    l_output2="$l_output2\n - The \"idle-delay\" option is not set in \"$l_kfile\""
                fi
                
                # Confirm that lock-delay exists, includes unit32, and value is between 0 and max value for lock-delay
                l_ldv="$(awk -F 'uint32' '/lock-delay/{print $2}' "$l_kfile" | xargs)"
                
                if [ -n "$l_ldv" ]; then
                    [ "$l_ldv" -ge "0" -a "$l_ldv" -le "$l_ldmv" ] && l_output="$l_output\n - The \"lock-delay\" option is set to \"$l_ldv\" seconds in \"$l_kfile\""
                    [ "$l_ldv" -gt "$l_ldmv" ] && l_output2="$l_output2\n - The \"lock-delay\" option is set to \"$l_ldv\" seconds (greater than $l_ldmv) in \"$l_kfile\""
                else
                    l_output2="$l_output2\n - The \"lock-delay\" option is not set in \"$l_kfile\""
                fi
                
                # Confirm that dconf profile exists
                if grep -Psq "^\h*system-db:$l_profile" /etc/dconf/profile/*; then
                    l_output="$l_output\n - The \"$l_profile\" profile exists"
                else
                    l_output2="$l_output2\n - The \"$l_profile\" doesn't exist"
                fi
                
                # Confirm that dconf profile database file exists
                if [ -f "/etc/dconf/db/$l_profile" ]; then
                    l_output="$l_output\n - The \"$l_profile\" profile exists in the dconf database"
                else
                    l_output2="$l_output2\n - The \"$l_profile\" profile doesn't exist in the dconf database"
                fi
            else
                l_output2="$l_output2\n - The \"idle-delay\" option doesn't exist, remaining tests skipped"
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
            echo -e "- End check - Ensure GDM screen locks when the user is idle" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
            [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
            echo -e "- End check - Ensure GDM screen locks when the user is idle" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
    }

    ensure_gdm_screen_locks_when_user_idle_fix()
	{
   
        echo -e "- Start remediation - Ensure GDM screen locks when the user is idle" | tee -a "$LOG" 2>> "$ELOG"      
      
        l_gdmprofile="gdm"

        if [ ! -f "/etc/dconf/profile/$l_gdmprofile" ]; then
            echo -e "Creating profile \"$l_gdmprofile\"" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "user-db:user\nsystem-db:$l_gdmprofile\nfile-db:/usr/share/$l_gdmprofile/greeter-dconf-defaults" > /etc/dconf/profile/$l_gdmprofile
        fi
        
        if [ ! -d "/etc/dconf/db/$l_gdmprofile.d/" ]; then
            echo -e "Creating dconf database directory \"/etc/dconf/db/$l_gdmprofile.d/\"" | tee -a "$LOG" 2>> "$ELOG"
            mkdir /etc/dconf/db/$l_gdmprofile.d/
        fi
        
        # Set idle-delay value
        if ! grep -Piq '^\h*idle-delay\h*=\h*uint32\h+([1-9]|[1-9][0-9]|[1-8][0-9]{2}|900)\b' /etc/dconf/db/$l_gdmprofile.d/*; then
            if ! grep -Piq '^\h*idle-delay\h*=\h*' /etc/dconf/db/$l_gdmprofile.d/*; then
                echo -e "creating gdm keyfile for machine-wide settings" | tee -a "$LOG" 2>> "$ELOG"
                if ! grep -Piq -- '^\h*\[org\/gnome\/desktop\/session\]' /etc/dconf/db/$l_gdmprofile.d/*; then
                    echo -e "Adding idle-delay entry to \"/etc/dconf/db/$l_gdmprofile.d/00-screensaver\"" | tee -a "$LOG" 2>> "$ELOG"
                    echo -e "\n[org/gnome/desktop/session]\n# Number of seconds of inactivity before the screen goes blank\n# Set to 0 seconds if you want to deactivate the screensaver.\nidle-delay=uint32 900" >> /etc/dconf/db/$l_gdmprofile.d/00-screensaver
                else
                    echo -e "Adding idle-delay value to existing [org/gnome/desktop/session] sections" | tee -a "$LOG" 2>> "$ELOG"
                    sed -ri '/^\s*\[org\/gnome\/desktop\/session\]/ a\# Number of seconds of inactivity before the screen goes blank\n# Set to 0 seconds if you want to deactivate the screensaver.\nidle-delay=uint32 900' $(grep -Pil -- '^\h*\[org\/gnome\/desktop\/session\]' /etc/dconf/db/$l_gdmprofile.d/*)
                fi
            else
                echo -e "Updating idle-delay value in existing [org/gnome/desktop/session] sections" | tee -a "$LOG" 2>> "$ELOG"
                sed -ri 's/^\s*(idle-delay\s*=\s*uint32\s+)(\S+)(\s*.*$)/\1900\3/' $(grep -Pil -- '^\h*idle-delay\h*=\h*' /etc/dconf/db/$l_gdmprofile.d/*)
            fi
        fi

        # Set lock-delay value
        if ! grep -Piq '^\h*lock-delay\h*=\h*uint32\h+[0-5]\b' /etc/dconf/db/$l_gdmprofile.d/*; then
            if ! grep -Piq '^\h*lock-delay\h*=\h*' /etc/dconf/db/$l_gdmprofile.d/*; then
                echo -e "creating gdm keyfile for machine-wide settings" | tee -a "$LOG" 2>> "$ELOG"
                if ! grep -Piq -- '^\h*\[org\/gnome\/desktop\/screensaver\]' /etc/dconf/db/$l_gdmprofile.d/*; then
                    echo -e "Adding lock-delay entry to \"/etc/dconf/db/$l_gdmprofile.d/00-screensaver\"" | tee -a "$LOG" 2>> "$ELOG"
                    echo -e "\n[org/gnome/desktop/screensaver]\n# Number of seconds after the screen is blank before locking the screen\nlock-delay=uint32 5" >> /etc/dconf/db/$l_gdmprofile.d/00-screensaver
                else
                    echo -e "Adding lock-delay value to existing [org/gnome/desktop/screensaver] sections" | tee -a "$LOG" 2>> "$ELOG"
                    sed -ri '/^\s*\[org\/gnome\/desktop\/screensaver\]/ a\# Number of seconds after the screen is blank before locking the screen\nlock-delay=uint32 5' $(grep -Pil -- '^\h*\[org\/gnome\/desktop\/screensaver\]' /etc/dconf/db/$l_gdmprofile.d/*)
                fi
            else
                echo -e "Updating lock-delay value in existing [org/gnome/desktop/screensaver] sections" | tee -a "$LOG" 2>> "$ELOG"
                sed -ri 's/^\s*(lock-delay\s*=\s*uint32\s+)(\S+)(\s*.*$)/\15\3/' $(grep -Pil -- '^\h*lock-delay\h*=\h*' /etc/dconf/db/$l_gdmprofile.d/*)
            fi
        fi
   
        echo -e "- Running 'dconf update'" | tee -a "$LOG" 2>> "$ELOG"
        dconf update
      
        echo -e "- End remediation - Ensure GDM screen locks when the user is idle" | tee -a "$LOG" 2>> "$ELOG"
    }

    ensure_gdm_screen_locks_when_user_idle_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_gdm_screen_locks_when_user_idle_fix
            ensure_gdm_screen_locks_when_user_idle_chk
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