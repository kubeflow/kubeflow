#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
#
# Name       Date       Description
# -------------------------------------------------------------------
# E. Pinnell 03/27/23   Check for unowned or ungrouped files or directories
# E. Pinnell 04/10/23   Modified to work of Debian and exclude "/*/containerd/*" and "/*/kubelet/pods/*"
#

l_output="" l_output2=""
l_limit="50" # Set report output limit
# Initialize arrays
a_path=()
a_arr=()
a_nouser=()
a_nogroup=()

# Populate array with paths to be excluded
a_path=(! -path "/run/user/*" -a ! -path "/proc/*" -a ! -path "*/containerd/*" -a ! -path "*/kubelet/pods/*")
while read -r l_bfs; do
   a_path+=( -a ! -path ""$l_bfs"/*")
done < <(findmnt -Dkerno fstype,target | awk '$1 ~ /^\s*(nfs|proc|smb)/ {print $2}')

# Populate array with files that will possibly fail one of the audits
while IFS= read -r -d $'\0' l_file; do
   [ -e "$l_file" ] && a_arr+=("$(stat -Lc '%n^%U^%G' "$l_file")") && echo "Adding: $l_file"
done < <(find / \( "${a_path[@]}" \) \( -type f -o -type d \) \( -nouser -o -nogroup \) -print0 2> /dev/null)

# Test files in the array a_arr
while IFS="^" read -r l_fname l_user l_group; do
   [ "$l_user" = "UNKNOWN" ] && a_nouser+=("$l_fname")
   [ "$l_group" = "UNKNOWN" ] && a_nogroup+=("$l_fname")
done <<< "$(printf '%s\n' "${a_arr[@]}")"

if ! (( ${#a_nouser[@]} > 0 )); then
   l_output="$l_output\n  - No unowned files or directories exist on the local filesystem."
else
   l_output2="$l_output2\n  - There are \"$(printf '%s' "${#a_nouser[@]}")\" unowned files or directories on the system.\n   - The following is a list of unowned files and/or directories:\n$(printf '%s\n' "${a_nouser[@]:0:$l_limit}")\n   - end of list"
fi

if ! (( ${#a_nogroup[@]} > 0 )); then
   l_output="$l_output\n  - No ungrouped files or directories exist on the local filesystem."
else
   l_output2="$l_output2\n  - There are \"$(printf '%s' "${#a_nogroup[@]}")\" ungrouped files or directories on the system.\n   - The following is a list of ungrouped files and/or directories:\n$(printf '%s\n' "${a_nogroup[@]:0:$l_limit}")\n   - end of list"
fi

if (( ${#a_nouser[@]} > "$l_limit" )) || (( ${#a_nogroup[@]} > "$l_limit" )); then
   l_output2="\n  ** Note: more than \"$l_limit\" unowned and/or ungrouped files and/or directories have been found **\n  ** only the first \"$l_limit\" will be listed **\n$l_output2"
fi

# Remove arrays
unset a_path
unset a_arr
unset a_nouser
unset a_nogroup

# If l_output2 is empty, we pass
if [ -z "$l_output2" ]; then
   echo -e "\n- Audit Result:\n  ** PASS **\n - * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_PASS:-101}"
else
   echo -e "\n- Audit Result:\n  ** FAIL **\n - * Reasons for audit failure * :\n$l_output2"
   [ -n "$l_output" ] && echo -e "- * Correctly configured * :\n$l_output\n"
   exit "${XCCDF_RESULT_FAIL:-102}"
fi