#!/usr/bin/env bash
#
# CIS-LBK Recommendation Function
# ~/CIS-LBK/functions/recommendations/nix_ensure_successful_file_system_mounts_collected.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# J. Brown	         01/26/23    Recommendation "Ensure successful file system mounts collected"
# David Neilson		 02/04/23	 Modified to use recent syscall script.
ensure_successful_file_system_mounts_collected()
{
	echo
	echo -e "\n**************************************************\n- $(date +%d-%b-%Y' '%T)\n- Start Recommendation \"$RN - $RNA\"" | tee -a "$LOG" 2>> "$ELOG"
	l_test="" l_uid_min=""

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

    # Collect the ondisk auditd rules containing -F arch=
	# Expects 1 parameters "arch"
	# Example find_ondisk_rule_arch "b32"
	find_ondisk_rule_arch(){
		grep -Pih -- "^\h*-a\h+(always,exit|exit,always)\h.*-F\h$1" /etc/audit/rules.d/*.rules
	}

	# Collect the ondisk auditd rules not containing -F arch=
	# Example find_ondisk_rule_no_arch
	find_ondisk_rule_no_arch(){
		grep -Pih -- "^\h*-a\h+(always,exit|exit,always)\h" /etc/audit/rules.d/*.rules | grep -Pv -- "-F arch="
	}

	# Collect the loaded auditd rules containing -F arch=
	# Expects 1 parameters "arch"
	# Example find_auditctl_rule_arch "b32"
	find_auditctl_rule_arch(){
		auditctl -l | grep -Pi -- "-a\h+(always,exit|exit,always)\h.*-F\h$1" 
	}

	# Collect the loaded auditd rules not containing -F arch=
	# Example find_auditctl_rule_no_arch
	find_auditctl_rule_no_arch(){
		auditctl -l | grep -Pi -- "-a\h+(always,exit|exit,always)\h" | grep -Pv -- "-F arch="
	}

    # Expects 4 parameters "arch=|noarch" "ondisk|auditctl" "calls" "parameters"
	# Example eval_auditd_syscall_rule "arch=b64" "ondisk" "l_calls" "l_parameters"
	# l_calls MUST be a comma separated list like "call1,call2,call3"
	# l_parameters MUST be a semi-colon separated list parameters and each parameter MUST be a colon sparated pair of <value>:<regex for value> like "val1=a:val1\s*=\s*[Aa];val2=b:val2\s*=\s*[Bb]"
	eval_auditd_syscall_rule(){
		arch="$1" type="$2" calls_in="$3" parameters_in="$4"

        # Clear instance vars
        unset ruleset_all
        unset ruleset_array
        unset exp_calls_array
        unset exp_parameters_array
        unset rules_found_array
        unset calls_found_array
        unset missing_calls_array
        unset parameters_found_array
        unset missing_parameter_array

        # Collect candidate rules
		case "$type:$arch" in
			ondisk:arch=*)
				ruleset_all="$(find_ondisk_rule_arch "$arch")"
				;;
			ondisk:noarch)
				ruleset_all="$(find_ondisk_rule_no_arch)"
				;;
			auditctl:arch=*)
				ruleset_all="$(find_auditctl_rule_arch "$arch")"
				;;
			auditctl:noarch)
				ruleset_all="$(find_auditctl_rule_no_arch)"
				;;
		esac

        # Create array of candidate rules
        declare -a ruleset_array
        while rule= read -r ruleset_entry; do
            ruleset_array+=("$ruleset_entry")
        done <<< "$ruleset_all"

        # Create array of required calls
        declare -a exp_calls_array
        while calls= read -r call_entry; do
            exp_calls_array+=("$call_entry")
        done <<< "$(echo -e "$calls_in" | tr ',' '\n')"

        # Create array of required parameters
        declare -a exp_parameters_array
        while parameters= read -r parameter_entry; do
            exp_parameters_array+=("$parameter_entry")
        done <<< "$(echo -e "$parameters_in" | tr ';' '\n')"

        # Find rules that contain expected calls
        declare -a rules_found_array
        declare -a calls_found_array
        for rule in "${ruleset_array[@]}"; do
            for exp_call in "${exp_calls_array[@]}"; do
                if grep -Pq -- "-S(\h|\h[\S_]+,)?\b$exp_call\b" <<< "$rule"; then
 					if ! [[ ${rules_found_array[*]} =~ "$rule" ]]; then
						rules_found_array+=("$rule")
					fi
                    calls_found_array+=("$exp_call")
                fi
            done
        done

        # Create the list of missing calls
        for call in "${exp_calls_array[@]}"; do
            if ! [[ ${calls_found_array[*]} =~ "$call" ]]; then
                l_output2="$l_output2\n- No $arch $type rules entry for: $call"
            fi
        done

        # Create list of missing parameters in the found rules
        for rule in "${rules_found_array[@]}"; do
            # Clean up arrays
            unset parameters_found_array
            unset missing_parameter_array
            declare -a parameters_found_array
            for parameter in "${exp_parameters_array[@]}"; do
                test_parameter="$(awk -F: '{print $2}' <<< "$parameter")"
                if grep -Pq -- "$test_parameter" <<< "$rule"; then
                    if ! [[ ${parameters_found_array[*]} =~ "$parameter" ]]; then
                        parameters_found_array+=("$parameter")
                    fi
                fi
            done

            # Create the list of missing parameters
            declare -a missing_parameter_array
            for parameter in "${exp_parameters_array[@]}"; do
                if ! [[ ${parameters_found_array[*]} =~ "$parameter" ]]; then
                    missing_parameter_array+=("$parameter")
                fi
            done

            if (( ${#missing_parameter_array[@]} > 0 )); then
                l_output2="$l_output2\n- $type Rule:\"$rule\" missing required parameters"
            else
                l_output="$l_output\n- $type Rule:\"$rule\" correctly configured"
            fi
        done
	}

    # Expects 5 parameters "arch|noarch" "calls" "parameters" "key" "rules_file"
	# Example fix_auditd_syscall_rule "arch=b64" "l_calls" "l_parameters" "kernel" "/etc/audit/rules.d/50-kernel_modules.rules"
	# l_calls MUST be a comma separated list like "call1,call2,call3"
	# l_parameters MUST be a semi-colon separated list parameters and each parameter MUST be a colon sparated pair of <value>:<regex for value> like "val1=a:val1\s*=\s*[Aa];val2=b:val2\s*=\s*[Bb]"
	fix_auditd_syscall_rule(){
        arch="$1"
        calls_in="$2"
        parameters_in="$3"
        key="$4"
        rule_file="$5"


        # Clear instance vars
        unset ruleset_all
        unset ruleset_array
        unset exp_calls_array
        unset exp_parameters_array
        unset rules_found_array
        unset calls_found_array
        unset missing_calls_array
        unset parameters_found_array
        unset missing_parameter_array
	        
        case "$arch" in
			arch=*)
				ruleset_all="$(find_ondisk_rule_arch "$arch")"
				;;
			noarch)
				ruleset_all="$(find_ondisk_rule_no_arch)"
				;;
		esac

        # Create array of candidate rules
        declare -a ruleset_array
        while rule= read -r ruleset_entry; do
            ruleset_array+=("$ruleset_entry")
        done <<< "$ruleset_all"

        # Determine if auditd rules are loadable without a reboot
		if [ -z "$G_AUDITD_IMMUTABLE" ] || [ -z "$G_REBOOT_REQUIRED" ]; then
			check_audit_rule_loadable
		fi

        # Create array of required calls
        declare -a exp_calls_array
        while calls= read -r call_entry; do
            exp_calls_array+=("$call_entry")
        done <<< "$(echo -e "$calls_in" | tr ',' '\n')"

        # Create array of required parameters
        declare -a exp_parameters_array
        while parameters= read -r parameter_entry; do
            exp_parameters_array+=("$parameter_entry")
        done <<< "$(echo -e "$parameters_in" | tr ';' '\n')"

        # Find rules that contain expected calls
        declare -a rules_found_array
        declare -a calls_found_array
        for rule in "${ruleset_array[@]}"; do
            for exp_call in "${exp_calls_array[@]}"; do
                if grep -Pq -- "-S(\h|\h[\S_]+,)?\b$exp_call\b" <<< "$rule"; then
 					if ! [[ ${rules_found_array[*]} =~ "$rule" ]]; then
						rules_found_array+=("$rule")
					fi
                    calls_found_array+=("$exp_call")
                fi
            done
        done

		# Create the list of missing calls
        for call in "${exp_calls_array[@]}"; do
            if ! [[ ${calls_found_array[*]} =~ "$call" ]]; then
                echo -e "-  Inserting $arch rule for $call" | tee -a "$LOG" 2>> "$ELOG"
                # Create list of params to insert
                parameter_insert_list=""
                for parameter in "${exp_parameters_array[@]}"; do
                     parameter_insert="$(echo "$parameter" | awk -F: '{print $1}')"
                     if [ -z "$parameter_insert_list" ]; then
						parameter_insert_list="$parameter_insert"
					else
						parameter_insert_list="$parameter_insert_list $parameter_insert"
					fi
                done

                if [ "$arch" != "noarch" ]; then
                    echo -e "- Rule to be inserted: \"-a always,exit -F $arch -S $call $parameter_insert_list -k $key\"" | tee -a "$LOG" 2>> "$ELOG"
					echo "-a always,exit -F $arch -S $call $parameter_insert_list -k $key" >> "$rule_file"
				else
                    echo -e "- Rule to be inserted: \"-a always,exit -S $call $parameter_insert_list -k $key\"" | tee -a "$LOG" 2>> "$ELOG"
					echo "-a always,exit -S $call $parameter_insert_list -k $key" >> "$rule_file"
				fi
            fi
        done

        # Create list of missing parameters in the found rules
        for rule in "${rules_found_array[@]}"; do
            # Clean up arrays
            unset parameters_found_array
            unset missing_parameter_array
            declare -a parameters_found_array
            for parameter in "${exp_parameters_array[@]}"; do
                test_parameter="$(awk -F: '{print $2}' <<< "$parameter")"
                if grep -Pq -- "$test_parameter" <<< "$rule"; then
                    if ! [[ ${parameters_found_array[*]} =~ "$parameter" ]]; then
                        parameters_found_array+=("$parameter")
                    fi
                fi
            done

            # Create the list of missing parameters
            declare -a missing_parameter_array
            for parameter in "${exp_parameters_array[@]}"; do
                if ! [[ ${parameters_found_array[*]} =~ "$parameter" ]]; then
                    missing_parameter_array+=("$parameter")
                fi
            done

            if (( ${#missing_parameter_array[@]} > 0 )); then
                parameter_insert_list=""
                rule_file="$(grep -Pil -- "$rule" /etc/audit/rules.d/*.rules)"
                rule_line="$(grep -Pihn -- "$rule" /etc/audit/rules.d/*.rules | awk -F':' '{print $1}')"

                echo -e "-  Updating parameters in $arch rule \"$rule\" in $rule_file" | tee -a "$LOG" 2>> "$ELOG"
                for parameter in "${missing_parameter_array[@]}"; do
                    parameter_insert="$(echo "$parameter" | awk -F: '{print $1}')"
                    if [ -z "$parameter_insert_list" ]; then
						parameter_insert_list="$parameter_insert"
					else
						parameter_insert_list="$parameter_insert_list $parameter_insert"
					fi
                done

                rule_line_regex="$(grep -Po -- '^.+-S\s([\S+,])?\S+\b' <<< "$rule")"
                echo -e "-   Adding $parameter_insert_list" | tee -a "$LOG" 2>> "$ELOG"
                sed -ri "$rule_line s/($rule_line_regex)(.*)$/\1 $parameter_insert_list\2/" "$rule_file"
            fi
        done

		# If rules are loadable; load them
		if [ "$G_AUDITD_IMMUTABLE" != "yes" ]; then
			echo "- Running 'augenrules --load' to load updated rules" | tee -a "$LOG" 2>> "$ELOG"
			augenrules --load > /dev/null 2>&1
		fi
	}

    ensure_successful_file_system_mounts_collected_chk()
	{
		echo "- Start check - Ensure successful file system mounts are collected" | tee -a "$LOG" 2>> "$ELOG"
		l_output="" l_output2=""
        
        # Set the syscalls we're interested in
		l_rule_1="mount"
		l_parameters_rule_1="-F auid>=1000:-F auid>=1000;-F auid!=unset:-F auid!=(unset|-1|4294967295)"

        if [ "$l_sysarch" = "b64" ]; then
            # Verify b64 ondisk rules
            echo -e "- Checking arch=b64 ondisk rules for mount" | tee -a "$LOG" 2>> "$ELOG"
            eval_auditd_syscall_rule "arch=b64" "ondisk" "$l_rule_1" "$l_parameters_rule_1"


            # Verify b64 auditctl entry
            echo -e "- Checking arch=b64 auditctl rules for mount" | tee -a "$LOG" 2>> "$ELOG"
            eval_auditd_syscall_rule "arch=b64" "auditctl" "$l_rule_1" "$l_parameters_rule_1"
        fi

        # Verify b32 ondisk rules
        echo -e "- Checking arch=b32 ondisk rules for mount" | tee -a "$LOG" 2>> "$ELOG"
        eval_auditd_syscall_rule "arch=b32" "ondisk" "$l_rule_1" "$l_parameters_rule_1"

        # Verify b32 auditctl entry
        echo -e "- Checking arch=b32 auditctl rules for mount" | tee -a "$LOG" 2>> "$ELOG"
        eval_auditd_syscall_rule "arch=b32" "auditctl" "$l_rule_1" "$l_parameters_rule_1"

        if [ -z "$l_output2" ]; then
			echo -e "- PASS:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			echo -e "- End check - Ensure successful file system mounts are collected" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_PASS:-101}"
		else
			echo -e "- FAIL:\n- Failing values:\n$l_output2\n" | tee -a "$LOG" 2>> "$ELOG"
			if [ -n "$l_output" ]; then
				echo -e "- Passing values:\n$l_output\n" | tee -a "$LOG" 2>> "$ELOG"
			fi
			echo -e "- End check - Ensure successful file system mounts are collected" | tee -a "$LOG" 2>> "$ELOG"
			return "${XCCDF_RESULT_FAIL:-102}"
		fi
    }

	ensure_successful_file_system_mounts_collected_fix()
	{
		echo "- Start remediation - Ensure successful file system mounts are collected" | tee -a "$LOG" 2>> "$ELOG"

	    if [ "$l_sysarch" = "b64" ]; then
            # Fix b64 ondisk rules
            echo -e "- Fixing arch=b64 ondisk rules for mount" | tee -a "$LOG" 2>> "$ELOG"
            fix_auditd_syscall_rule "arch=b64" "$l_rule_1" "$l_parameters_rule_1" "mounts" "/etc/audit/rules.d/50-mounts.rules"
        fi
	
	    # Fix b32 ondisk rules
        echo -e "- Fixing arch=b32 ondisk rules for mount" | tee -a "$LOG" 2>> "$ELOG"
        fix_auditd_syscall_rule "arch=b32" "$l_rule_1" "$l_parameters_rule_1" "mounts" "/etc/audit/rules.d/50-mounts.rules"

        echo "- End remediation - Ensure successful file system mounts are collected" | tee -a "$LOG" 2>> "$ELOG"
    }

    # Check if system is 32 or 64 bit
	arch | grep -q -- "x86_64" && l_sysarch=b64 || l_sysarch=b32

    ensure_successful_file_system_mounts_collected_chk
	if [ "$?" = "101" ]; then
		[ -z "$l_test" ] && l_test="passed"
	else
		ensure_successful_file_system_mounts_collected_fix
		if [ "$G_AUDITD_IMMUTABLE" != "yes" ]; then
	 		ensure_successful_file_system_mounts_collected_chk
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
