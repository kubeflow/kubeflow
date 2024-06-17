#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_gdm_autorun-never_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/30/22    Recommendation "Ensure GDM autorun-never is enabled"
#

ensure_gdm_autorun-never_enabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""

    ensure_gdm_autorun-never_enabled_chk()
	{
		echo "- Start check - Ensure GDM autorun-never is enabled" | tee -a "$LOG" 2>> "$ELOG"
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

        if [ -n "$l_pkgoutput" ]; then            
            # Look for existing settings and set variables if they exist
            l_kfile="$(grep -Prils -- '^\h*autorun-never\b' /etc/dconf/db/*.d)"
            
            # Set profile name based on dconf db directory ({PROFILE_NAME}.d)
            if [ -f "$l_kfile" ]; then
                l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")"
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
                    l_output="$l_output\n - The dconf directory \"$l_gpdir\" exitst"
                else
                    l_output2="$l_output2\n - The dconf directory \"$l_gpdir\" doesn't exist"
                fi
                
                # check autorun-never setting
                if grep -Pqrs -- '^\h*autorun-never\h*=\h*true\b' "$l_kfile"; then
                    l_output="$l_output\n - \"autorun-never\" is set to true in: \"$l_kfile\""
                else
                    l_output2="$l_output2\n - \"autorun-never\" is not set correctly"
                fi
            else
                # Settings don't exist. Nothing further to check
                l_output2="$l_output2\n - \"autorun-never\" is not set"
            fi
        else
            echo -e "\n\n - GNOME Desktop Manager isn't installed\n - Recommendation is Not Applicable\n- Audit result:\n  *** PASS ***\n" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure GDM autorun-never is enabled" | tee -a "$LOG" 2>> "$ELOG"
            l_test="NA"
        fi

        # Report results. If no failures output in l_output2, we pass
        [ -n "$l_pkgoutput" ] && echo -e "\n$l_pkgoutput"
        if [ -z "$l_output2" ]; then
            echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure GDM autorun-never is enabled" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}"
        else
            echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
            [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure GDM autorun-never is enabled" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_FAIL:-102}"
        fi
    }

    ensure_gdm_autorun-never_enabled_fix()
	{
   
        echo -e "- Start remediation - Ensure GDM autorun-never is enabled" | tee -a "$LOG" 2>> "$ELOG"
        
        l_gpname="local" # Set to desired dconf profile name (default is local)
        
        # Look for existing settings and set variables if they exist
        l_kfile="$(grep -Prils -- '^\h*autorun-never\b' /etc/dconf/db/*.d)"
        
        # Set profile name based on dconf db directory ({PROFILE_NAME}.d)
        if [ -f "$l_kfile" ]; then
            l_gpname="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_kfile")"
            echo -e " - updating dconf profile name to \"$l_gpname\"" | tee -a "$LOG" 2>> "$ELOG"
        fi
        
        [ ! -f "$l_kfile" ] && l_kfile="/etc/dconf/db/$l_gpname.d/00-media-autorun"
        
        # Check if profile file exists
        if grep -Pq -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*; then
            echo -e "\n - dconf database profile exists in: \"$(grep -Pl -- "^\h*system-db:$l_gpname\b" /etc/dconf/profile/*)\"" | tee -a "$LOG" 2>> "$ELOG"
        else
            [ ! -f "/etc/dconf/profile/user" ] && l_gpfile="/etc/dconf/profile/user" || l_gpfile="/etc/dconf/profile/user2"
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
        
        # check autorun-never setting
        if grep -Pqs -- '^\h*autorun-never\h*=\h*true\b' "$l_kfile"; then
            echo -e " - \"autorun-never\" is set to true in: \"$l_kfile\"" | tee -a "$LOG" 2>> "$ELOG"
        else
            echo -e " - creating or updating \"autorun-never\" entry in \"$l_kfile\"" | tee -a "$LOG" 2>> "$ELOG"
            if grep -Psq -- '^\h*autorun-never' "$l_kfile"; then
                sed -ri 's/(^\s*autorun-never\s*=\s*)(\S+)(\s*.*)$/\1true \3/' "$l_kfile"
            else
                ! grep -Psq -- '\^\h*\[org\/gnome\/desktop\/media-handling\]\b' "$l_kfile" && echo '[org/gnome/desktop/media-handling]' >> "$l_kfile"
                sed -ri '/^\s*\[org\/gnome\/desktop\/media-handling\]/a \\nautorun-never=true' "$l_kfile"
            fi
        fi
   
        echo -e "- Running 'dconf update'" | tee -a "$LOG" 2>> "$ELOG"
        dconf update
      
        echo -e "- End remediation - Ensure GDM autorun-never is enabled" | tee -a "$LOG" 2>> "$ELOG"
   }

   ensure_gdm_autorun-never_enabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_gdm_autorun-never_enabled_fix
            ensure_gdm_autorun-never_enabled_chk
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