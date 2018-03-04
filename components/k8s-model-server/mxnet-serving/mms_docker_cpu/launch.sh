#!/bin/bash

# Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
#     http://www.apache.org/licenses/LICENSE-2.0
# or in the "license" file accompanying this file. This file is distributed
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
# express or implied. See the License for the specific language governing
# permissions and limitations under the License.


line_list=()
gunicorn_arg=''
config_file='mms_app.conf'

while read line
do
    line_list+=("$line")
done < "$config_file"

gunicorn_arg_id='# Gunicorn arguments'
nginx_config_id='# Nginx configurations'
nginx_config_file='/etc/nginx/conf.d/virtual.conf'
mxnet_env_id='# MXNet environment variables'
total=${#line_list[*]}
is_gunicorn_arg=false
is_mxnet_env=false
for (( i=0; i<=$(( $total -1 )); i++ ))
do
    if [[ ${line_list[$i]} == $gunicorn_arg_id ]]
    then
        is_gunicorn_arg=true
        continue
    fi
    if [[ ${line_list[$i]} == $nginx_config_id ]]
    then
        nginx_config=''
        for (( j=$i +1; j<=$(( $total -1 )); j++ ))
        do
            if [[ ${line_list[$j]} != $mxnet_env_id ]]
            then
                nginx_config="${nginx_config}${line_list[$j]}\n"
            else
                i=$j
                break
            fi
        done
        echo -e "${nginx_config}" > $nginx_config_file
    fi
    if [[ ${line_list[$i]} == $mxnet_env_id ]]
    then
        is_gunicorn_arg=false
        is_mxnet_env=true
        continue
    fi
    if [[ "$is_mxnet_env" == true && ${#line_list[$i]} > 0 ]]
    then
        export "${line_list[$i]}"
    fi
    if [[ ${line_list[$i]} == --* ]]
    then
        if [ "$is_gunicorn_arg" = true ]
        then
            gunicorn_arg="${gunicorn_arg} ${line_list[$i]} ${line_list[$i+1]}"
        fi
    fi
done

app_script='wsgi'
service nginx restart
gunicorn $gunicorn_arg $app_script