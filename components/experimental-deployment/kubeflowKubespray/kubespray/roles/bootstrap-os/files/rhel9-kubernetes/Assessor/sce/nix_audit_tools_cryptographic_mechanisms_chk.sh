#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   02/28/23   Check cryptographic mechanisms are used to protect the integrity of audit tools

l_output="" l_output2=""
nix_package_manager_set()
{
   echo "- Start - Determine system's package manager"
   if command -v rpm > /dev/null 2>&1; then
      echo "- system is rpm based"
      G_PQ="rpm -q"
      command -v yum > /dev/null 2>&1 && G_PM="yum" && echo "- system uses yum package manager"
      command -v dnf > /dev/null 2>&1 && G_PM="dnf" && echo "- system uses dnf package manager"
      command -v zypper > /dev/null 2>&1 && G_PM="zypper" && echo "- system uses zypper package manager"
      G_PR="$G_PM -y remove"
      echo "- End - Determine system's package manager"
      return "${XCCDF_RESULT_PASS:-101}"
   elif command -v dpkg > /dev/null 2>&1; then
      echo -e "- system is apt based\n- system uses apt package manager"
      G_PQ="dpkg -s"
      G_PM="apt"
      G_PR="$G_PM -y purge"
      echo "- End - Determine system's package manager"
      return "${XCCDF_RESULT_PASS:-101}"
   else
      echo -e "- FAIL:\n- Unable to determine system's package manager"
      G_PQ="unknown"
      G_PM="unknown"
      echo "- End - Determine system's package manager"
      return "${XCCDF_RESULT_FAIL:-102}"
   fi
}

# Set package manager information
if [ -z "$G_PQ" ] || [ -z "$G_PM" ] || [ -z "$G_PR" ]; then
   nix_package_manager_set
   if [ "$?" != "101" ]; then
      echo -e "\n- Audit Result:\n  ** UNKNOWN **\n- Unable to determine system's package manager"
      exit "${XCCDF_RESULT_FAIL:-102}"
   fi
fi

if $G_PQ aide > /dev/null 2>&1; then
   l_searchloc="/etc/aide.conf /etc/aide/aide.conf /etc/aide.conf.d/*.conf /etc/aide/aide.conf.d/*"
   a_filelist=("/sbin/auditctl" "/sbin/auditd" "/sbin/ausearch" "/sbin/aureport" "/sbin/autrace" "/sbin/augenrules")
   a_olist=("p" "i" "n" "u" "g" "s" "b" "acl" "xattrs" "sha512")
   for l_tname in "${a_filelist[@]}"; do
      l_acfile=""
      l_tfopts="$(grep -Ps -- '^\h*'"$l_tname"'\b' $l_searchloc)"
      if [ -n "$l_tfopts" ]; then
         l_tfopts="${l_tfopts// /:}"
         unset a_topts && a_topts=()
         unset a_diff && a_diff=()
         while IFS=: read -r l_afname _ l_aopts; do
            [ -z "$l_acfile" ] && l_acfile="$l_afname" || l_acfile="$l_acfile, $l_afname"
            a_topts+=(${l_aopts//+/ })
         done <<< "$l_tfopts"
         a_diff=("$(printf '%s\n' "${a_olist[@]}" "${a_topts[@]}" "${a_topts[@]}" | sort | uniq -u)")
         if [ -n "${a_diff}" ]; then
            l_output2="$l_output2\n - Audit tool \"$l_tname\" found in file(s): \"$l_acfile\", but is missing options: \"$(echo ${a_diff[@]})\""
         else
            l_output="$l_output\n - Audit tool \"$l_tname\" correctly configured in the file(s): \"$l_acfile\""
         fi
      else
         l_output2="$l_output2\n - Audit tool \"$l_tname\" not in a AIDE config file"
      fi
   done
   unset a_topts && unset a_diff && unset a_diff
else
   l_output2="\n - AIDE is not installed on the system.\n$l_output2"
fi
[ -n "$l_output" ] && l_output="\n\n - * Correctly configured * :\n$l_output"
if [ -z "$l_output2" ]; then # If l_output2 is empty, we pass
   echo -e "\n- Audit Result:\n  ** PASS **\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
   echo -e "$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi