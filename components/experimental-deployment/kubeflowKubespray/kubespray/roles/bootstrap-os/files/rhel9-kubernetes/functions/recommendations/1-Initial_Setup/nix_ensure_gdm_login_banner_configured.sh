#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_gdm_login_banner_configured.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       04/11/22    Recommendation "Ensure GDM login banner is configured"
# Justin Brown		 10/29/22	 Updated to modern format

ensure_gdm_login_banner_configured()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""

    ensure_gdm_login_banner_configured_chk()
	{
		echo "- Start check - Ensure GDM login banner is configured" | tee -a "$LOG" 2>> "$ELOG"
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

        if [ -n "$l_pkgoutput" ]; then
            l_output="" l_output2=""

            l_gdmfile="$(grep -Prils '^\h*banner-message-enable\b' /etc/dconf/db/*.d)"
            
            if [ -n "$l_gdmfile" ]; then
                # Set profile name based on dconf db directory ({PROFILE_NAME}.d)
                l_gdmprofile="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_gdmfile")"
         
                # Check if banner message is enabled
                if grep -Pisq '^\h*banner-message-enable=true\b' "$l_gdmfile"; then
                    l_output="$l_output\n - The \"banner-message-enable\" option is enabled in \"$l_gdmfile\""
                else
                    l_output2="$l_output2\n - The \"banner-message-enable\" option is not enabled"
                fi

                l_lsbt="$(grep -Pios '^\h*banner-message-text=.*$' "$l_gdmfile")"
                
                if [ -n "$l_lsbt" ]; then
                    l_output="$l_output\n - The \"banner-message-text\" option is set in \"$l_gdmfile\"\n - banner-message-text is set to:\n - \"$l_lsbt\""
                else
                    l_output2="$l_output2\n - The \"banner-message-text\" option is not set"
                fi
                
                if grep -Pq "^\h*system-db:$l_gdmprofile" /etc/dconf/profile/"$l_gdmprofile"; then
                    l_output="$l_output\n - The \"$l_gdmprofile\" profile exists"
                else
                    l_output2="$l_output2\n - The \"$l_gdmprofile\" profile doesn't exist"
                fi
                
                if [ -f "/etc/dconf/db/$l_gdmprofile" ]; then
                    l_output="$l_output\n - The \"$l_gdmprofile\" profile exists in the dconf database"
                else
                    l_output2="$l_output2\n - The \"$l_gdmprofile\" profile doesn't exist in the dconf database"
                fi
            else
                l_output2="$l_output2\n - The \"banner-message-enable\" option isn't configured"
            fi
        fi

        if [ -n "$l_pkgoutput" ]; then
            if [ -z "$l_output2" ]; then
                echo -e "$l_pkgoutput\n- Audit result:\n   *** PASS: ***\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- End check - Ensure GDM login banner is configured" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_PASS:-101}"
            else
                echo -e "$l_pkgoutput\n- Audit Result:\n   *** FAIL: ***\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
                [ -n "$l_output" ] && echo -e "$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
                echo -e "- End check - Ensure GDM login banner is configured" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_FAIL:-102}"
            fi
        else
            echo -e "- GNOME Desktop Manager is NOT installed" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "- End check - Ensure GDM login banner is configured" | tee -a "$LOG" 2>> "$ELOG"
            l_test="NA"
        fi
    }

    ensure_gdm_login_banner_configured_fix()
	{
   
        echo -e "- Start remediation - Ensure GDM login banner is configured" | tee -a "$LOG" 2>> "$ELOG"      
      
        l_gdmprofile="gdm"
        l_bmessage="'Authorized uses only. All activity may be monitored and reported'" # Set to desired banner message

        if [ ! -f "/etc/dconf/profile/$l_gdmprofile" ]; then
            echo -e "Creating profile \"$l_gdmprofile\"" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "user-db:user\nsystem-db:$l_gdmprofile\nfile-db:/usr/share/$l_gdmprofile/greeter-dconf-defaults" > /etc/dconf/profile/$l_gdmprofile
        fi

        if [ ! -d "/etc/dconf/db/$l_gdmprofile.d/" ]; then
            echo -e "Creating dconf database directory \"/etc/dconf/db/$l_gdmprofile.d/\"" | tee -a "$LOG" 2>> "$ELOG"
            mkdir /etc/dconf/db/$l_gdmprofile.d/
        fi

        if ! grep -Piq '^\h*banner-message-enable\h*=\h*true\b' /etc/dconf/db/$l_gdmprofile.d/*; then
            echo -e "creating gdm keyfile for machine-wide settings" | tee -a "$LOG" 2>> "$ELOG"
            
            if ! grep -Piq -- '^\h*banner-message-enable\h*=\h*' /etc/dconf/db/$l_gdmprofile.d/*; then
                l_kfile="/etc/dconf/db/$l_gdmprofile.d/01-banner-message"
                echo -e "\n[org/gnome/login-screen]\nbanner-message-enable=true" >> "$l_kfile"
            else
                l_kfile="$(grep -Pil -- '^\h*banner-message-enable\h*=\h*' /etc/dconf/db/$l_gdmprofile.d/*)"
                ! grep -Pq '^\h*\[org\/gnome\/login-screen\]' "$l_kfile" && sed -ri '/^\s*banner-message-enable/ i\[org/gnome/login-screen]' "$l_kfile"
                ! grep -Pq '^\h*banner-message-enable\h*=\h*true\b' "$l_kfile" && sed -ri 's/^\s*(banner-message-enable\s*=\s*)(\S+)(\s*.*$)/\1true \3//' "$l_kfile"
            fi
        fi

        if ! grep -Piq "^\h*banner-message-text=[\'\"]+\S+" "$l_kfile"; then
            sed -ri "/^\s*banner-message-enable/ a\banner-message-text=$l_bmessage" "$l_kfile"
        fi
   
        echo -e "- Running 'dconf update'" | tee -a "$LOG" 2>> "$ELOG"
        dconf update
      
        echo -e "- End remediation - Ensure GDM login banner is configured" | tee -a "$LOG" 2>> "$ELOG"
   }

   ensure_gdm_login_banner_configured_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_gdm_login_banner_configured_fix
            ensure_gdm_login_banner_configured_chk
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