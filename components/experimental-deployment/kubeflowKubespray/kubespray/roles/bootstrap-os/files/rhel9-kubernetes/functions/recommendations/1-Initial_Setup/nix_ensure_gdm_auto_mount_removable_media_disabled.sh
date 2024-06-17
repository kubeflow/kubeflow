#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_gdm_auto_mount_removable_media_disabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/30/22    Recommendation "Ensure GDM automatic mounting of removable media is disabled"
#

ensure_gdm_auto_mount_removable_media_disabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""

    ensure_gdm_auto_mount_removable_media_disabled_chk()
	{
		echo "- Start check - Ensure GDM automatic mounting of removable media is disabled" | tee -a "$LOG" 2>> "$ELOG"
        l_pkgoutput="" l_output="" l_output2=""

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
            echo -e "$l_pkgoutput"
            
            # Look for existing settings and set variables if they exist
            l_kfile="$(grep -Prils -- '^\h*automount\b' /etc/dconf/db/*.d)"
            l_kfile2="$(grep -Prils -- '^\h*automount-open\b' /etc/dconf/db/*.d)"
            
            # Set profile name based on dconf db directory ({PROFILE_NAME}.d)
            if [ -f "$l_kfile" ]; then
                l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")"
            elif [ -f "$l_kfile2" ]; then
                l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile2")"
            fi
            
            # If the profile name exist, continue checks
            if [ -n "$l_gpname" ]; then
                l_gpdir="/etc/dconf/db/$l_gpname.d"
            
                # Check if profile file exists
                if grep -Pq -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*; then
                    l_output="$l_output\n - dconf database profile file \"$(grep -Pl -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*)\" exists"
                else
                    l_output2="$l_output2\n - dconf database profile isn't set"
                fi
            
                # Check if the dconf database file exists
                if [ -f "/etc/dconf/db/$l_gpname" ]; then
                    l_output="$l_output\n - The dconf database \"$l_gpname\" exists"
                else
                    l_output2="$l_output2\n - The dconf database \"$l_gpname\" doesn't exist"
                fi
            
                # check if the dconf database directory exists
                if [ -d "$l_gpdir" ]; then
                    l_output="$l_output\n - The dconf directory \"$l_gpdir\" exists"
                else
                    l_output2="$l_output2\n - The dconf directory \"$l_gpdir\" doesn't exist"
                fi
            
                # check automount setting
                if grep -Pqrs -- '^\h*automount\h*=\h*false\b' "$l_kfile"; then
                    l_output="$l_output\n - \"automount\" is set to false in: \"$l_kfile\""
                else
                    l_output2="$l_output2\n - \"automount\" is not set correctly"
                fi
            
                # check automount-open setting
                if grep -Pqs -- '^\h*automount-open\h*=\h*false\b' "$l_kfile2"; then
                    l_output="$l_output\n - \"automount-open\" is set to false in: \"$l_kfile2\""
                else
                    l_output2="$l_output2\n - \"automount-open\" is not set correctly"
                fi
            else
                # Setings don't exist. Nothing further to check
                l_output2="$l_output2\n - neither \"automount\" or \"automount-open\" is set"
            fi
        else
            l_output="$l_output\n - GNOME Desktop Manager package is not installed on the system\n  - Recommendation is not applicable"
            echo -e "- End check - Ensure GDM automatic mounting of removable media is disabled" | tee -a "$LOG" 2>> "$ELOG"
            l_test="NA"
        fi
        
        # Report results. If no failures output in l_output2, we pass
        [ -n "$l_pkgoutput" ] && echo -e "\n$l_pkgoutput"
        if [ -z "$l_output2" ]; then
            echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
            echo -e "- End check - Ensure GDM automatic mounting of removable media is disabled" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
            [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
            echo -e "- End check - Ensure GDM automatic mounting of removable media is disabled" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
    }

    ensure_gdm_auto_mount_removable_media_disabled_fix()
	{
        echo -e "- Start remediation - Ensure GDM automatic mounting of removable media is disabled" | tee -a "$LOG" 2>> "$ELOG"
        l_gpname="local" # Set to desired dconf profile name (defaule is local)
            
        # Look for existing settings and set variables if they exist
        l_kfile="$(grep -Prils -- '^\h*automount\b' /etc/dconf/db/*.d)"
        l_kfile2="$(grep -Prils -- '^\h*automount-open\b' /etc/dconf/db/*.d)"
        
        # Set profile name based on dconf db directory ({PROFILE_NAME}.d)
        if [ -f "$l_kfile" ]; then
            l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")"
            echo -e " - updating dconf profile name to \"$l_gpname\"" | tee -a "$LOG" 2>> "$ELOG"
        elif [ -f "$l_kfile2" ]; then
            l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile2")"
            echo -e " - updating dconf profile name to \"$l_gpname\"" | tee -a "$LOG" 2>> "$ELOG"
        fi
        
        # check for consistency (Clean up configuration if needed)
        if [ -f "$l_kfile" ] && [ "$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")" != "$l_gpname" ]; then
            sed -ri "/^\s*automount\s*=/s/^/# /" "$l_kfile"
            l_kfile="/etc/dconf/db/$l_gpname.d/00-media-automount"
        fi
        
        if [ -f "$l_kfile2" ] && [ "$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile2")" != "$l_gpname" ]; then
            sed -ri "/^\s*automount-open\s*=/s/^/# /" "$l_kfile2"
        fi
        
        [ -z "$l_kfile" ] && l_kfile="/etc/dconf/db/$l_gpname.d/00-media-automount"
        
        # Check if profile file exists
        if grep -Pq -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*; then
            echo -e "\n - dconf database profile exists in: \"$(grep -Pl -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*)\"" | tee -a "$LOG" 2>> "$ELOG"
        else
            if [ ! -f "/etc/dconf/profile/user" ]; then
                l_gpfile="/etc/dconf/profile/user"
            else
                l_gpfile="/etc/dconf/profile/user2"
            fi
            echo -e " - creating dconf database profile" | tee -a "$LOG" 2>> "$ELOG"
            {
                echo -e "\nuser-db:user"
                echo "system-db:$l_gpname"
            } >> "$l_gpfile"
        fi
        
        # create dconf directory if it doesn't exists
        l_gpdir="/etc/dconf/db/$l_gpname.d"
        
        if [ -d "$l_gpdir" ]; then
            echo -e " - The dconf database directory \"$l_gpdir\" exists" | tee -a "$LOG" 2>> "$ELOG"
        else
            echo -e " - creating dconf database directory \"$l_gpdir\"" | tee -a "$LOG" 2>> "$ELOG"
            mkdir "$l_gpdir"
        fi
        
        # check automount-open setting
        if grep -Pqs -- '^\h*automount-open\h*=\h*false\b' "$l_kfile"; then
            echo -e " - \"automount-open\" is set to false in: \"$l_kfile\"" | tee -a "$LOG" 2>> "$ELOG"
        else
            echo -e " - creating \"automount-open\" entry in \"$l_kfile\"" | tee -a "$LOG" 2>> "$ELOG"
            ! grep -Psq -- '\^\h*\[org\/gnome\/desktop\/media-handling\]\b' "$l_kfile" && echo '[org/gnome/desktop/media-handling]' >> "$l_kfile"
            sed -ri '/^\s*\[org\/gnome\/desktop\/media-handling\]/a \\nautomount-open=false' "$l_kfile"
        fi
        
        # check automount setting
        if grep -Pqs -- '^\h*automount\h*=\h*false\b' "$l_kfile"; then
            echo -e " - \"automount\" is set to false in: \"$l_kfile\"" | tee -a "$LOG" 2>> "$ELOG"
        else
            echo -e " - creating \"automount\" entry in \"$l_kfile\"" | tee -a "$LOG" 2>> "$ELOG"
            ! grep -Psq -- '\^\h*\[org\/gnome\/desktop\/media-handling\]\b' "$l_kfile" && echo '[org/gnome/desktop/media-handling]' >> "$l_kfile"
            sed -ri '/^\s*\[org\/gnome\/desktop\/media-handling\]/a \\nautomount=false' "$l_kfile"
        fi
   
        echo -e "- Running 'dconf update'" | tee -a "$LOG" 2>> "$ELOG"
        dconf update
      
        echo -e "- End remediation - Ensure GDM automatic mounting of removable media is disabled" | tee -a "$LOG" 2>> "$ELOG"
    }

    ensure_gdm_auto_mount_removable_media_disabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_gdm_auto_mount_removable_media_disabled_fix
            ensure_gdm_auto_mount_removable_media_disabled_chk
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