#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_gdm_disable-user-list_option_enabled.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       12/30/22    Recommendation "Ensure GDM disable-user-list option is enabled"
#

ensure_gdm_disable-user-list_option_enabled()
{
	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
    l_test=""

    ensure_gdm_disable-user-list_option_enabled_chk()
	{
		echo "- Start check - Ensure GDM disable-user-list option is enabled" | tee -a "$LOG" 2>> "$ELOG"
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
            output="" output2=""

            l_gdmfile="$(grep -Pril '^\h*disable-user-list\h*=\h*true\b' /etc/dconf/db)"
            
            if [ -n "$l_gdmfile" ]; then
                output="$output\n - The \"disable-user-list\" option is enabled in \"$l_gdmfile\""
                l_gdmprofile="$(awk -F\/ '{split($(NF-1),a,".");print a[1]}' <<< "$l_gdmfile")"
            
                if grep -Pq "^\h*system-db:$l_gdmprofile" /etc/dconf/profile/"$l_gdmprofile"; then
                    output="$output\n - The \"$l_gdmprofile\" exists"
                else
                    output2="$output2\n - The \"$l_gdmprofile\" doesn't exist"
                fi
            
                if [ -f "/etc/dconf/db/$l_gdmprofile" ]; then
                    output="$output\n - The \"$l_gdmprofile\" profile exists in the dconf database"
                else
                    output2="$output2\n - The \"$l_gdmprofile\" profile doesn't exist in the dconf database"
                fi
            else
                output2="$output2\n - The \"disable-user-list\" option is not enabled"
            fi
            
            if [ -z "$output2" ]; then
                echo -e "$l_pkgoutput\n- Audit result:\n   *** PASS: ***\n$output\n"
                echo -e "- End check - Ensure GDM disable-user-list option is enabled" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_PASS:-101}"
            else
                echo -e "$l_pkgoutput\n- Audit Result:\n   *** FAIL: ***\n$output2\n"
                [ -n "$output" ] && echo -e "$output\n"
                echo -e "- End check - Ensure GDM disable-user-list option is enabled" | tee -a "$LOG" 2>> "$ELOG"
                return "${XCCDF_RESULT_FAIL:-102}"
            fi
        else
            echo -e "\n\n - GNOME Desktop Manager isn't installed\n - Recommendation is Not Applicable\n- Audit result:\n  *** PASS ***\n"
            echo -e "- End check - Ensure GDM disable-user-list option is enabled" | tee -a "$LOG" 2>> "$ELOG"
            l_test="NA"
        fi
    }

    ensure_gdm_disable-user-list_option_enabled_fix()
	{
   
        echo -e "- Start remediation - Ensure GDM disable-user-list option is enabled" | tee -a "$LOG" 2>> "$ELOG"      
      
        l_gdmprofile="gdm"

        if [ ! -f "/etc/dconf/profile/$l_gdmprofile" ]; then
            echo -e "Creating profile \"$l_gdmprofile\"" | tee -a "$LOG" 2>> "$ELOG"
            echo -e "user-db:user\nsystem-db:$l_gdmprofile\nfile-db:/usr/share/$l_gdmprofile/greeter-dconf-defaults" > /etc/dconf/profile/$l_gdmprofile
        fi
        
        if [ ! -d "/etc/dconf/db/$l_gdmprofile.d/" ]; then
            echo -e "Creating dconf database directory \"/etc/dconf/db/$l_gdmprofile.d/\"" | tee -a "$LOG" 2>> "$ELOG"
            mkdir /etc/dconf/db/$l_gdmprofile.d/
        fi
        
        if ! grep -Piq '^\h*disable-user-list\h*=\h*true\b' /etc/dconf/db/$l_gdmprofile.d/*; then
            echo -e "creating gdm keyfile for machine-wide settings" | tee -a "$LOG" 2>> "$ELOG"
            if ! grep -Piq -- '^\h*\[org\/gnome\/login-screen\]' /etc/dconf/db/$l_gdmprofile.d/*; then
                echo -e "\n[org/gnome/login-screen]\n# Do not show the user list\ndisable-user-list=true" >> /etc/dconf/db/$l_gdmprofile.d/00-login-screen
            else
                sed -ri '/^\s*\[org\/gnome\/login-screen\]/ a\# Do not show the user list\ndisable-user-list=true' $(grep -Pil -- '^\h*\[org\/gnome\/login-screen\]' /etc/dconf/db/$l_gdmprofile.d/*)
            fi
        fi
   
        echo -e "- Running 'dconf update'" | tee -a "$LOG" 2>> "$ELOG"
        dconf update
      
        echo -e "- End remediation - Ensure GDM disable-user-list option is enabled" | tee -a "$LOG" 2>> "$ELOG"
   }

   ensure_gdm_disable-user-list_option_enabled_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_gdm_disable-user-list_option_enabled_fix
            ensure_gdm_disable-user-list_option_enabled_chk
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