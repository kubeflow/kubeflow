#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   04/28/23   Check kernel parameter v2 (replaces nix_kernel_parameter_chk.sh for new audit method)
#

l_output="" l_output2="" # Clear output variables
a_parlist=("$XCCDF_VALUE_REGEX") # Populate parameter list array

# Set variable if UFW "override" file is in use
l_ufwscf="$([ -f /etc/default/ufw ] && awk -F= '/^\s*IPT_SYSCTL=/ {print $2}' /etc/default/ufw)"

# kernel parameter check function
kernel_parameter_chk()
{
   # Check running configuration
   l_krp="$(sysctl "$l_kpname" | awk -F= '{print $2}' | xargs)"
   if [ "$l_krp" = "$l_kpvalue" ]; then
      l_output="$l_output\n - \"$l_kpname\" is correctly set to \"$l_krp\" in the running configuration"
   else
      l_output2="$l_output2\n - \"$l_kpname\" is incorrectly set to \"$l_krp\" in the running configuration and should have a value of: \"$l_kpvalue\""
   fi

   # Check durable setting (files)
   # Create array with matching output from systemd-sysctl --cat-config
   unset A_out; declare -A A_out
   while read -r l_out; do
      if [ -n "$l_out" ]; then
         if [[ $l_out =~ ^\s*# ]]; then
            l_file="${l_out//# /}"
         else
            l_kpar="$(awk -F= '{print $1}' <<< "$l_out" | xargs)"
            [ "$l_kpar" = "$l_kpname" ] && A_out+=(["$l_kpar"]="$l_file")
         fi
      fi
   done < <(/usr/lib/systemd/systemd-sysctl --cat-config | grep -Po '^\h*([^#\n\r]+|#\h*\/[^#\n\r\h]+\.conf\b)')

   # Account for systems with UFW (Not covered by systemd-sysctl --cat-config)
   if [ -n "$l_ufwscf" ]; then
      l_kpar="$(grep -Po "^\h*$l_kpname\b" "$l_ufwscf" | xargs)"
      l_kpar="${l_kpar//\//.}"
      [ "$l_kpar" = "$l_kpname" ] && A_out+=(["$l_kpar"]="$l_ufwscf")
   fi

   # Assess output from files and generate output
   if (( ${#A_out[@]} > 0 )); then
      while IFS="=" read -r l_fkpname l_fkpvalue; do
         l_fkpname="${l_fkpname// /}"; l_fkpvalue="${l_fkpvalue// /}"
         if [ "$l_fkpvalue" = "$l_kpvalue" ]; then
            l_output="$l_output\n - \"$l_kpname\" is correctly set to \"$l_fkpvalue\" in \"$(printf '%s' "${A_out[@]}")\"\n"
         else
            l_output2="$l_output2\n - \"$l_kpname\" is incorrectly set to \"$l_fkpvalue\" in \"$(printf '%s' "${A_out[@]}")\" and should have a value of: \"$l_kpvalue\"\n"
         fi
      done < <(grep -Po -- "^\h*$l_kpname\h*=\h*\H+" "${A_out[@]}")
   else
      l_output2="$l_output2\n - \"$l_kpname\" is not set in an included file\n   ** Note: \"$l_kpname\" May be set in a file that's ignored by load procedure **\n"
   fi
}

# Assess and check parameters
while IFS="=" read -r l_kpname l_kpvalue; do
   l_kpname="${l_kpname// /}"; l_kpvalue="${l_kpvalue// /}"
   if ! grep -Pqs '^\h*0\b' /sys/module/ipv6/parameters/disable && grep -q '^net.ipv6.' <<< "$l_kpname"; then
      l_output="$l_output\n - IPv6 is disabled on the system, \"$l_kpname\" is not applicable"
   else
      kernel_parameter_chk
   fi
done < <(printf '%s\n' "${a_parlist[@]}")

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