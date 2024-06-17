#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
# 
# Name         Date       Description
# -------------------------------------------------------------------
# T. Harrison  8/1/18    Ensure pg_wheel group exists
#
shopt -s nocasematch
output=$(getent group pg_wheel)
group=$(grep -Po '^[^:]*pg_wheel(?=(:[^:]*)*$)' <<<  $output)
group_members=$(echo $output | grep -oP "^pg_wheel\:x\:\d+\:\K[\w,]+")

if [[ "$group" =~ ^[^:]*pg_wheel[^:]*$ ]] ; then
    echo "$group"
    echo "----------------------"
    echo "$group_members" | tr ',' '\n'
    shopt -u nocasematch
    exit "${XCCDF_RESULT_PASS:-101}"
else
    # print the reason why we are failing
    echo "No 'pg_wheel' group was found."
    shopt -u nocasematch
    exit "${XCCDF_RESULT_FAIL:-102}"
fi