#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   08/08/23   check password complexity

l_output="" l_output2="" l_out2=""
a_credits=("dcredit" "ucredit" "lcredit" "ocredit")
l_credit_value="-1"

pwquality_configuration_file_chk()
{
   # Check configuration files
   while IFS=: read -r l_file l_setting; do
      while IFS="=" read -r l_parameter l_value; do
         if [[ "$l_parameter" =~ credit ]] && (( "${l_value/ /}" > "$l_credit_value" )); then
            l_output2="$l_output2\n - \"$l_parameter\" is incorrectly set to \"${l_value/ /}\" in \"$l_file\""
         elif [[ "$l_parameter" =~ minclass ]] && (( "${l_value/ /}" < "$l_credit_value" )); then
            l_output2="$l_output2\n - \"$l_parameter\" is incorrectly set to \"${l_value/ /}\" in \"$l_file\""
         else
            l_output="$l_output\n - \"$l_parameter\" is correctly set to \"${l_value/ /}\" in \"$l_file\""
         fi
      done <<< "$l_setting"
   done < <(grep -PHi -- '^\h*'"$l_credit_name"'\b' /etc/security/pwquality.conf /etc/security/pwquality.conf.d/*.conf)
}

pwquality_pam_file_chk()
{
   for l_pam_file in /etc/pam.d/system-auth /etc/pam.d/password-auth; do
      if grep -Psiq -- '^\h*password\h+(requisite|required|sufficient)\h+pam_pwquality\.so\h+([^#\n\r]+\h+)?'"$l_prc"'\b' "$l_pam_file"; then
         l_output2="$l_output2\n - \"$l_parameter\" is incorrectly set in \"$l_pam_file\""
      fi
   done
}

# check credits
l_prc="($l_credit_name\h*=\h*[^-]\d*)"
for l_credit_name in "${a_credits[@]}"; do
   if ! grep -Psiq '^\h*'"$l_credit_name"'\b' /etc/security/pwquality.conf /etc/security/pwquality.conf.d/*.conf; then
      if ! grep -Psiq -- '^\h*password\h+(requisite|required|sufficient)\h+pam_pwquality\.so\h+([^#\n\r]+\h+)?'"$l_credit_name"'\b' /etc/pam.d/system-auth /etc/pam.d/password-auth; then
         l_out2="$l_out2\n - \"$l_credit_name\" is not set in a pwquality configuration file or a PAM file"
      fi
   else
      pwquality_configuration_file_chk
   fi
done

# Check minclass
l_credit_name="minclass"
l_credit_value="4"
l_prc="($l_credit_name\h*=\h*[0-3])"
if ! grep -Psiq '^\h*'"$l_credit_name"'\b' /etc/security/pwquality.conf /etc/security/pwquality.conf.d/*.conf; then
   if ! grep -Psiq -- '^\h*password\h+(requisite|required|sufficient)\h+pam_pwquality\.so\h+([^#\n\r]+\h+)?'"$l_credit_name"'\b' /etc/pam.d/system-auth /etc/pam.d/password-auth; then
      if [ -n "$l_out2" ] ; then
         l_output2="$l_output2\n$l_out2\n - \"$l_credit_name\" is not set in a pwquality configuration file or a PAM file"
      fi
   else
      pwquality_pam_file_chk
   fi
else
   pwquality_configuration_file_chk
fi
unset a_credits

# Provide output from checks
# If error output (l_output2) is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   # If error output (l_output2) is not empty, we fail. Also output anything that's correctly configured
   echo -e "\n- Audit Result:\n  ** FAIL **\n - Reason(s) for audit failure:\n$l_output2\n"
   [ -n "$l_output" ] && echo -e "\n- Correctly set:\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi