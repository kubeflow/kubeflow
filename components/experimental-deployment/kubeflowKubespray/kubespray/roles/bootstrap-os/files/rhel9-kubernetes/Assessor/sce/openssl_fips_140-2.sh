#!/usr/bin/env bash

#
# CIS-CAT Script Check Engine
# 
# Name         Date       Description
# -------------------------------------------------------------------
# T. Harrison 06/19/2018  Ensure FIPS 140-2 OpenSSL Cryptography Is Used
#             12/06/2023  Revised to provide addtional information in 
#                         results & make the regex case insensitive
#

output=$(cat /proc/sys/crypto/fips_enabled)

if [ "$output" = 1 ] ; then
    echo "$output"
    exit "${XCCDF_RESULT_PASS:-101}"
else
    #test for fips capable system
    openssl_version=$(openssl version)
    fips_capable=$(echo $openssl_version | grep -P '(?i)(?!^OpenSSL.+-)(fips)(?=.+$)')
    
    echo "fips_enabled = " $output
    echo "openssl version: " $openssl_version
    # print the reason why we are failing
    if [ -z "$fips_capable" ] ; then
        echo "System is not FIPS capable."
    else
        echo "System is FIPS capable, but FIPS is not enabled."
    fi
    exit "${XCCDF_RESULT_FAIL:-102}"
fi