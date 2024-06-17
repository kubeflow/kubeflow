#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_logfiles_appropriate_permissions_and_ownership.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Justin Brown       11/18/22    Recommendation "Ensure all logfiles have appropriate permissions and ownership"
# 
 
ensure_logfiles_appropriate_permissions_and_ownership()
{

	# Start recommendation entry for verbose log and output to screen
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""

	ensure_logfiles_appropriate_permissions_and_ownership_chk()
	{ 
        echo -e "\n- Start check - Ensure all logfiles have appropriate permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"
        l_output=""
        
        find /var/log -type f | (while read -r fname; do
            bname="$(basename "$fname")"
            case "$bname" in
                lastlog | lastlog.* | wtmp | wtmp.* | btmp | btmp.*)
                    if ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,2,4,6][0,4]\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" mode: \"$(stat -Lc "%a" "$fname")\"\n" 
                    fi 
                    if ! stat -Lc "%U %G" "$fname" | grep -Pq -- '^\h*root\h+(utmp|root)\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" ownership: \"$(stat -Lc "%U:%G" "$fname")\"\n" 
                    fi 
                    ;; 
                secure | auth.log) 
                    if ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" mode: \"$(stat -Lc "%a" "$fname")\"\n" 
                    fi 
                    if ! stat -Lc "%U %G" "$fname" | grep -Pq -- '^\h*(syslog|root)\h+(adm|root)\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" ownership: \"$(stat -Lc "%U:%G" "$fname")\"\n" 
                    fi 
                    ;; 
                SSSD | sssd) 
                    if ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,2,4,6]0\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" mode: \"$(stat -Lc "%a" "$fname")\"\n" 
                    fi 
                    if ! stat -Lc "%U %G" "$fname" | grep -Piq -- '^\h*(SSSD|root)\h+(SSSD|root)\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" ownership: \"$(stat -Lc "%U:%G" "$fname")\"\n" 
                    fi 
                    ;; 
                gdm | gdm3) 
                    if ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,2,4,6]0\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" mode: \"$(stat -Lc "%a" "$fname")\"\n" 
                    fi 
                    if ! stat -Lc "%U %G" "$fname" | grep -Pq -- '^\h*(root)\h+(gdm3?|root)\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" ownership: \"$(stat -Lc "%U:%G" "$fname")\"\n" 
                    fi 
                    ;;
                *.journal) 
                    if ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" mode: \"$(stat -Lc "%a" "$fname")\"\n" 
                    fi 
                    if ! stat -Lc "%U %G" "$fname" | grep -Pq -- '^\h*(root)\h+(systemd-journal|root)\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" ownership: \"$(stat -Lc "%U:%G" "$fname")\"\n" 
                    fi 
                    ;; 
                *) 
                    if ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" mode: \"$(stat -Lc "%a" "$fname")\"\n" 
                    fi 
                    if ! stat -Lc "%U %G" "$fname" | grep -Pq -- '^\h*(syslog|root)\h+(adm|root)\h*$'; then 
                        l_output="$l_output\n- File: \"$fname\" ownership: \"$(stat -Lc "%U:%G" "$fname")\"\n" 
                    fi 
                    ;; 
            esac 
        done 
        
        # If all files passed, then we pass
        if [ -z "$l_output" ]; then 
            echo -e "\n- PASS\n- All files in \"/var/log/\" have appropriate permissions and ownership\n" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-101}" 
        else 
            # print the reason why we are failing 
            echo -e "\n- FAIL:\n$l_output" | tee -a "$LOG" 2>> "$ELOG"
            return "${XCCDF_RESULT_PASS:-102}"
        fi 
        
        echo -e "- End check - Ensure all logfiles have appropriate permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"

        ) 
    }

	ensure_logfiles_appropriate_permissions_and_ownership_fix()
	{ 
        echo -e "\n- Start remediation - Ensure all logfiles have appropriate permissions and ownership" | tee -a "$LOG" 2>> "$ELOG" 
        
        find /var/log -type f | while read -r fname; do 
            bname="$(basename "$fname")" 
            case "$bname" in 
                lastlog | lastlog.* | wtmp | wtmp.* | btmp | btmp.*)
                    ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,2,4,6][0,4]\h*$' && echo -e "- changing mode on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chmod ug-x,o-wx "$fname" 
                    ! stat -Lc "%U" "$fname" | grep -Pq -- '^\h*root\h*$' && echo -e "- changing owner on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chown root "$fname" 
                    ! stat -Lc "%G" "$fname" | grep -Pq -- '^\h*(utmp|root)\h*$' && echo -e "- changing group on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chgrp root "$fname" 
                    ;; 
                secure | auth.log) 
                    ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$' && echo -e "- changing mode on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chmod u-x,g-wx,o-rwx "$fname" 
                    ! stat -Lc "%U" "$fname" | grep -Pq -- '^\h*(syslog|root)\h*$' && echo -e "- changing owner on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chown root "$fname" 
                    ! stat -Lc "%G" "$fname" | grep -Pq -- '^\h*(adm|root)\h*$' && echo -e "- changing group on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chgrp root "$fname" 
                    ;; 
                SSSD | sssd) 
                    ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,2,4,6]0\h*$' && echo -e "- changing mode on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chmod ug-x,o-rwx "$fname" 
                    ! stat -Lc "%U" "$fname" | grep -Piq -- '^\h*(SSSD|root)\h*$' && echo -e "- changing owner on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chown root "$fname" 
                    ! stat -Lc "%G" "$fname" | grep -Piq -- '^\h*(SSSD|root)\h*$' && echo -e "- changing group on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chgrp root "$fname" 
                    ;; 
                gdm | gdm3) 
                    ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,2,4,6]0\h*$' && echo -e "- changing mode on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chmod ug-x,o-rwx 
                    ! stat -Lc "%U" "$fname" | grep -Pq -- '^\h*root\h*$' && echo -e "- changing owner on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chown root "$fname" 
                    ! stat -Lc "%G" "$fname" | grep -Pq -- '^\h*(gdm3?|root)\h*$' && echo -e "- changing group on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chgrp root "$fname" 
                    ;; 
                *.journal) 
                    ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$' && echo -e "- changing mode on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chmod u-x,g-wx,o-rwx "$fname" 
                    ! stat -Lc "%U" "$fname" | grep -Pq -- '^\h*root\h*$' && echo -e "- changing owner on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chown root "$fname" 
                    ! stat -Lc "%G" "$fname" | grep -Pq -- '^\h*(systemd-journal|root)\h*$' && echo -e "- changing group on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chgrp root "$fname" 
                    ;; 
                *) 
                    ! stat -Lc "%a" "$fname" | grep -Pq -- '^\h*[0,2,4,6][0,4]0\h*$' && echo -e "- changing mode on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chmod u-x,g-wx,o-rwx "$fname" 
                    ! stat -Lc "%U" "$fname" | grep -Pq -- '^\h*(syslog|root)\h*$' && echo -e "- changing owner on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chown root "$fname"
                    ! stat -Lc "%G" "$fname" | grep -Pq -- '^\h*(adm|root)\h*$' && echo -e "- changing group on \"$fname\"" | tee -a "$LOG" 2>> "$ELOG" && chgrp root "$fname" 
                    ;; 
            esac 
        done 
        
        echo -e "- End remediation - Ensure all logfiles have appropriate permissions and ownership" | tee -a "$LOG" 2>> "$ELOG"
    }

	ensure_logfiles_appropriate_permissions_and_ownership_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
        if [ "$l_test" != "NA" ]; then
            ensure_logfiles_appropriate_permissions_and_ownership_fix
            if [ "$l_test" != "manual" ]; then
                ensure_logfiles_appropriate_permissions_and_ownership_chk
                if [ "$?" = "101" ]; then
                    [ "$l_test" != "failed" ] && l_test="remediated"
                fi
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