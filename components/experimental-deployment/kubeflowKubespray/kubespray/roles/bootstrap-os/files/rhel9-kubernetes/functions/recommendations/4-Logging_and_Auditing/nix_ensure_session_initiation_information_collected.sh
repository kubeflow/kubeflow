#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_session_initiation_information_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       10/01/20    Recommendation "Ensure session initiation information is collected"
# David Neilson	     12/07/22	 Updated to Ubuntu benchmarks
# Justin Brown		 02/03/23	 Updated to new format

ensure_session_initiation_information_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test=""
	l_uid_min=""

	# Collect UID_MIN value
	l_uid_min="$(awk '/^\s*UID_MIN/{print $2}' /etc/login.defs)"
	if [ -z "$uid_min" ]; then
		uid_min=1000
	fi

	# Verify if auditd rules can be loaded
	check_audit_rule_loadable(){
		if [[ $(auditctl -s | grep "enabled") =~ "2" ]]; then
			G_AUDITD_IMMUTABLE="yes"
			G_REBOOT_REQUIRED="yes"
		fi
	}

    # Collect the ondisk auditd watcher rules containing -w <file>
	# Example find_ondisk_rule_watcher
	find_ondisk_rule_watcher(){
		grep -Pih -- "-w\h+[/\S]+" /etc/audit/rules.d/*.rules
	}

	# Collect the loaded auditd rules watcher rules containing -w <file>
	# Example find_auditctl_rule_watcher
	find_auditctl_rule_watcher(){
		auditctl -l | grep -Pi -- "-w\h+[/\S]+"
	}

    # Expects 3 parameters "ondisk|auditctl" "file" "permissions"
	# Example eval_auditd_watcher_rule "ondisk" "l_files" "l_permissions"
	# l_files MUST be a comma separated list like "/var/log/lastlog,/var/run/faillock"
	# l_permissions MUST be a semi-colon separated list of -p permissions (r,w,x or a)"
	eval_auditd_watcher_rule(){
		type="$1" files_in="$2" permissions_in="$3"

		# Clear instance vars
        unset ruleset_all
        unset ruleset_array
        unset exp_files_array
        unset exp_permissions_array
        unset rules_found_array
        unset files_found_array
        unset missing_files_array
        unset permissions_found_array
        unset missing_permissions_array

		case "$type" in
			ondisk)
				ruleset_all="$(find_ondisk_rule_watcher)"
				;;
			auditctl)
				ruleset_all="$(find_auditctl_rule_watcher)"
				;;
		esac

		# Create array of candidate rules
        declare -a ruleset_array
        while rule= read -r ruleset_entry; do
            ruleset_array+=("$ruleset_entry")
        done <<< "$ruleset_all"

		# Create array of required files
        declare -a exp_files_array
        while file= read -r file_entry; do
            exp_files_array+=("$file_entry")
        done <<< "$(echo -e "$files_in" | tr ',' '\n')"

		# Create array of required permissions
        declare -a exp_permissions_array
        while permissions= read -r permission_entry; do
            exp_permissions_array+=("$permission_entry")
        done <<< "$(echo -e "$permissions_in" | tr ';' '\n')"

		# Find rules that contain expected files
        declare -a rules_found_array
        declare -a files_found_array
        for rule in "${ruleset_array[@]}"; do
            for exp_file in "${exp_files_array[@]}"; do
                if grep -Pq -- "-w\s+$(sed 's/\//\\\//g' <<< "$exp_file")" <<< "$rule"; then
                    if ! printf '%s\0' "${rules_found_array[@]}" | grep -Fxqz -- "$rule"; then
						rules_found_array+=("$rule")
					fi
                    files_found_array+=("$exp_file")
                fi
            done
        done

		# Create the list of missing files
        for file in "${exp_files_array[@]}"; do
            if ! printf '%s\0' "${files_found_array[@]}" | grep -Fxqz -- "$file"; then
                l_output2="$l_output2\n- No $type rules entry for: $file"
            fi
        done

		# Create list of missing parameters in the found rules
        for rule in "${rules_found_array[@]}"; do
            # Clean up arrays
            unset permissions_found_array
            unset missing_permissions_array
            declare -a permissions_found_array
            for permission in "${exp_permissions_array[@]}"; do
                if grep -Pq -- "-p\h+(\S)?$permission" <<< "$rule"; then
                    if ! printf '%s\0' "${permissions_found_array[@]}" | grep -Fxqz -- "$permission"; then
                        permissions_found_array+=("$permission")
                    fi
                fi
            done

			# Create the list of missing parameters
            declare -a missing_permissions_array
            for permission in "${exp_permissions_array[@]}"; do
                if ! printf '%s\0' "${permissions_found_array[@]}" | grep -Fxqz -- "$permission"; then
                    missing_permissions_array+=("$permission")
                fi
            done

            if (( ${#missing_permissions_array[@]} > 0 )); then
                l_output2="$l_output2\n- $type Rule:\"$rule\" missing required permissions"
            else
                l_output="$l_output\n- $type Rule:\"$rule\" correctly configured"
            fi
        done
	}

    # Expects 4 parameters "file" "permissions" "key" "rules_file"
	# Example fix_auditd_watcher_rule "l_files" "l_permissions" "logins" "/etc/audit/rules.d/50-login.rules"
	# l_command MUST be a comma separated list like "/var/log/lastlog,/var/run/faillock" (Normally this is only a single value)
	# l_permissions MUST be a semi-colon separated list of -p permissions (r,w,x or a)"
	fix_auditd_watcher_rule(){
		files_in="$1" permissions_in="$2" key="$3" rule_file="$4"

        # Clear instance vars
        unset ruleset_all
        unset ruleset_array
        unset exp_files_array
        unset exp_permissions_array
        unset rules_found_array
        unset files_found_array
        unset permissions_found_array
        unset missing_permission_array

        # Collect candidate rules
		ruleset_all="$(find_ondisk_rule_watcher)"
		
		# Create array of candidate rules
        declare -a ruleset_array
        while rule= read -r ruleset_entry; do
            ruleset_array+=("$ruleset_entry")
        done <<< "$ruleset_all"

		# Create array of required files
        declare -a exp_files_array
        while file= read -r file_entry; do
            exp_files_array+=("$file_entry")
        done <<< "$(echo -e "$files_in" | tr ',' '\n')"
		
		# Create array of required permissions
        declare -a exp_permissions_array
        while permission= read -r permission_entry; do
            exp_permissions_array+=("$permission_entry")
        done <<< "$(echo -e "$permissions_in" | tr ';' '\n')"

		# Determine if auditd rules are loadable without a reboot
		if [ -z "$G_AUDITD_IMMUTABLE" ] || [ -z "$G_REBOOT_REQUIRED" ]; then
			check_audit_rule_loadable
		fi
		
		# Find rules that contain expected files
        declare -a rules_found_array
        declare -a files_found_array
        for rule in "${ruleset_array[@]}"; do
            for file in "${exp_files_array[@]}"; do
                if grep -Pq -- "-w\s+$(sed 's/\//\\\//g' <<< "$file")" <<< "$rule"; then
                    if ! printf '%s\0' "${rules_found_array[@]}" | grep -Fxqz -- "$rule"; then
						rules_found_array+=("$rule")
					fi
                    files_found_array+=("$file")
                fi
            done
        done

		# Create the list of missing files
        for file in "${exp_files_array[@]}"; do
            if ! printf '%s\0' "${files_found_array[@]}" | grep -Fxqz -- "$file"; then
                echo -e "-  Inserting rule for $file" | tee -a "$LOG" 2>> "$ELOG"
                # Create list of permissions to insert
				permission_insert_list=""
                for permission in "${exp_permissions_array[@]}"; do
                     if [ -z "$permission_insert_list" ]; then
						permission_insert_list="$permission"
					else
						permission_insert_list="$permission_insert_list$permission"
					fi
                done

				echo -e "- Rule to be inserted: \"-w $file -p $permission_insert_list -k $key\"" | tee -a "$LOG" 2>> "$ELOG"
				echo "-w $file -p $permission_insert_list -k $key" >> "$rule_file"
            fi
        done

        # Create list of missing permission in the found rules
        for rule in "${rules_found_array[@]}"; do
            # Clean up arrays
            unset permissions_found_array
            unset missing_permission_array
            declare -a permissions_found_array
            for permission in "${exp_permissions_array[@]}"; do
                if grep -Pq -- "\s-p\s+(\S+)?$permission" <<< "$rule"; then
                    if ! printf '%s\0' "${permissions_found_array[@]}" | grep -Fxqz -- "$permission"; then
                        permissions_found_array+=("$permission")
                    fi
                fi
            done

            # Create the list of missing permissions
            declare -a missing_permission_array
            for permission in "${exp_permissions_array[@]}"; do
                if ! printf '%s\0' "${permissions_found_array[@]}" | grep -Fxqz -- "$permission"; then
                    missing_permission_array+=("$permission")
                fi
            done

            if (( ${#missing_permission_array[@]} > 0 )); then
                permission_insert_list=""
                rule_file="$(grep -Pil -- "$rule" /etc/audit/rules.d/*.rules)"
                rule_line="$(grep -Pihn -- "$rule" /etc/audit/rules.d/*.rules | awk -F':' '{print $1}')"

                echo -e "-  Updating permission in rule \"$rule\" in $rule_file" | tee -a "$LOG" 2>> "$ELOG"
                for permission in "${missing_permission_array[@]}"; do
                    if [ -z "$permission_insert_list" ]; then
						permission_insert_list="$permission"
					else
						permission_insert_list="$permission_insert_list$permission"
					fi
                done

                rule_line_regex="$(grep -Po -- '^.+-p\s(S+)?\S+\b' <<< "$rule")"
                echo -e "-   Adding $permission_insert_list" | tee -a "$LOG" 2>> "$ELOG"
                sed -ri "$rule_line s|($rule_line_regex)(.*)$|\1$permission_insert_list\2|" "$rule_file"
            fi
        done

		# If rules are loadable; load them
		if [ "$G_AUDITD_IMMUTABLE" != "yes" ]; then
			echo "- Running 'augenrules --load' to load updated rules" | tee -a "$LOG" 2>> "$ELOG"
			augenrules --load > /dev/null 2>&1
		fi
	}

	# Check if system is 32 or 64 bit
	arch | grep -q -- "x86_64" && l_sysarch=b64 || l_sysarch=b32

	ensure_session_initiation_information_collected_chk()
	{
		echo "- Start check - Ensure session initiation information is collected" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_output2=""

        # Set the files and directories we're interested in
		l_rule_1="/var/run/utmp,/var/log/wtmp,/var/log/btmp"
		l_permissions_rule_1="w;a"

        # Verify ondisk rules with files and directories
        echo -e "- Checking ondisk rules for /var/run/utmp,/var/log/wtmp,/var/log/btmp" | tee -a "$LOG" 2>> "$ELOG"
        eval_auditd_watcher_rule "ondisk" "$l_rule_1" "$l_permissions_rule_1"

        # Verify auditctl entry with files and directories
        echo -e "- Checking auditctl rules for /var/run/utmp,/var/log/wtmp,/var/log/btmp" | tee -a "$LOG" 2>> "$ELOG"
        eval_auditd_watcher_rule "auditctl" "$l_rule_1" "$l_permissions_rule_1"

		if [ -z "$l_output2" ]; then
			echo -e "- PASS:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure session initiation information is collected" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Failing values:\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
			if [ -n "$l_output" ]; then
				echo -e "- Passing values:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			fi
			echo -e "- End check - Ensure session initiation information is collected" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
	}

	ensure_session_initiation_information_collected_fix()
	{
		echo "- Start remediation - Ensure session initiation information is collected" | tee -a "$LOG" 2>> "$ELOG"

		# Fix ondisk rules with files and directories
        echo -e "- Fixing ondisk rules for /var/log/lastlog,/var/run/faillock" | tee -a "$LOG" 2>> "$ELOG"
        fix_auditd_watcher_rule "$l_rule_1" "$l_permissions_rule_1" "logins" "/etc/audit/rules.d/50-login.rules"

		echo "- End remediation - Ensure session initiation information is collected" | tee -a "$LOG" 2>> "$ELOG"	
	}

	ensure_session_initiation_information_collected_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_session_initiation_information_collected_fix
		if [ "$G_AUDITD_IMMUTABLE" != "yes" ]; then
	 		ensure_session_initiation_information_collected_chk
			if [ "$?" = "101" ] ; then
				[ "$l_test" != "failed" ] && l_test="remediated"
			else
				l_test="failed"
			fi
		else
			l_test=manual
			echo -e "A manual reboot is REQUIRED to load the updated audit rules."
			return "${XCCDF_RESULT_FAIL:-106}"
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