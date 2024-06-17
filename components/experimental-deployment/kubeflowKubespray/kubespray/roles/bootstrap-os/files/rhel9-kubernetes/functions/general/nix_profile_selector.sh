#!/usr/bin/env bash
#
# CIS-LBK Remediation function
# ~/CIS-LBK/functions/general/nix_profile_selector.sh
#
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Patrick Araya      10/05/20    Selects the appropriate profile based on the commandline switch or via user interaction

select_profile()
{
    profile_options="L1S L1W L2S L2W"
    request_profile()
    {
        # Print options to std-out
        echo -e "Please enter the number for the desired profile: \n\t1: L1S - Level 1 Server\n\t2: L1W - Level 1 Workstation\n\t3: L2S - Level 2 Server\n\t4: L2W - Level 2 Workstation"

        read -p "Profile: " p
        profile_input=$(echo $p | tr '[:lower:]' '[:upper:]')

        case $profile_input in
            1|L1S)
                run_profile="L1S"
                ;;
            2|L1W)
                run_profile="L1W"
                ;;
            3|L2S)
                run_profile="L2S"
                ;;
            4|L2W)
                run_profile="L2W"
                ;;
            *)
                echo -e "\n::Error selecting profile: $profile_input::"
                request_profile
                ;;
        esac
	}
	#if run_profile doesn't exist, or isn't set to something from profile_options, propmt for user selection
    if [ -z "$run_profile" ]; then
        request_profile
    else
        if ! echo "$profile_options" | grep -q "$run_profile"; then
            request_profile
        fi
    fi
}