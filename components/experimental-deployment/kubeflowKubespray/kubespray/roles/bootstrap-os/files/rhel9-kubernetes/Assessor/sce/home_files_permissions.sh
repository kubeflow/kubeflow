#!/usr/bin/env sh

#
# CIS-CAT Script Check Engine
#
# Name         Date       Description
# -------------------------------------------------------------------
# E. Pinnell   06/22/2020   Check user home dot files permissions no rwx for group or other
#

for dir in $(awk -F: '($1 !~ /^(root|halt|sync|shutdown)$/ && $7 != "'"$(which nologin)"'" && $7 != "/bin/false" && $7 != "/usr/bin/false") { print $6 }' /etc/passwd); do
  if [ ! -d "$dir" ]; then
  	[ -z "$doutput" ] && doutput="Home directory doesnt exist: \"$dir\"" || doutput="$doutput, \"$dir\""
  else
    for file in $dir/$XCCDF_VALUE_REGEX; do
      if [ ! -h "$file" ] && [ -e "$file" ]; then
        fileperm=$(ls -ld "$file" | cut -f1 -d" ")
        if [ "$(echo "$fileperm" | cut -c5)"  != "-" ]; then
        	[ -z "$groutput" ] && groutput="Group Read set on \"$file\"" || groutput="$groutput, \"$file\""
        fi
        if [ "$(echo "$fileperm" | cut -c6)"  != "-" ]; then
        	[ -z "$gwoutput" ] && gwoutput="Group Write set on \"$file\"" || gwoutput="$gwoutput, \"$file\""
        fi
        if [ "$(echo "$fileperm" | cut -c7)"  != "-" ]; then
        	[ -z "$geoutput" ] && geoutput="Group Execute set on \"$file\"" || geoutput="$geoutput, \"$file\""
        fi
        if [ "$(echo "$fileperm" | cut -c8)"  != "-" ]; then
        	[ -z "$oroutput" ] && oroutput="Other Read set on \"$file\"" || oroutput="$oroutput, \"$file\""
        fi
        if [ "$(echo "$fileperm" | cut -c9)"  != "-" ]; then
        	[ -z "$owoutput" ] && owoutput="Other Write set on \"$file\"" || owoutput="$owoutput, \"$file\""
        fi
        if [ "$(echo "$fileperm" | cut -c10)"  != "-" ]; then
        	[ -z "$oeoutput" ] && oeoutput="Other Execute set on \"$file\"" || oeoutput="$oeoutput, \"$file\""
        fi
      fi
    done
  fi
done
[ -z "$groutput" ] && [ -z "$gwoutput" ] && [ -z "$geoutput" ] && [ -z "$oroutput" ] && [ -z "$owoutput" ] && [ -z "$oeoutput" ] && passing=true
# If all tests pass, passing will be true, and we pass
if [ "$passing" = true ] ; then
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    [ -n "$groutput" ] && echo "$groutput"
    [ -n "$gwoutput" ] && echo "$gwoutput"
    [ -n "$geoutput" ] && echo "$geoutput"
    [ -n "$oroutput" ] && echo "$oroutput"
    [ -n "$owoutput" ] && echo "$owoutput"
    [ -n "$oeoutput" ] && echo "$oeoutput"
    exit "${XCCDF_RESULT_FAIL:-102}"
fi
