# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

local Kube = import "kube.libsonnet";

{

    # The port that this service should serve on.
    redis_port:: 6379,
    # Change this to your project ID.
    project_id:: "cooltool-1009",

    # Change the following two settings to your BigQuery dataset and table.
    bq_dataset:: "rtda",
    bq_table:: "tweets",

    # Change the following four settings to your twitter credentials
    # information.
    twitter_consumer_key:: "xxxx",
    twitter_consumer_secret:: "xxxx",
    twitter_access_token:: "xxxx",
    twitter_access_token_sec:: "xxxx",

    "twitter-stream.new.yaml": Kube.v1.ReplicationController("twitter-stream") {
        spec: {
            replicas: 1,
            template: {
                metadata: {
                    labels: {
                        name: "twitter-stream",
                    },
                },
                spec: {
                    containers: [
                        {
                            name: "twitter-to-redis",
                            image: "gcr.io/%s/pipeline_image:latest" % $.project_id,
                            env: Kube.pair_list({
                                PROCESSINGSCRIPT: "twitter-to-redis",
                                REDISLIST: "twitter-stream",
                                CONSUMERKEY: $.twitter_consumer_key,
                                CONSUMERSECRET: $.twitter_consumer_secret,
                                ACCESSTOKEN: $.twitter_access_token,
                                ACCESSTOKENSEC: $.twitter_access_token_sec,
                                TWSTREAMMODE: "sample",
                            }),
                        },
                    ],
                },
            },
        },
    },
    "redis-master-service.new.yaml": Kube.v1.Service("redis-master") {
        metadata+: {
            name: "redismaster",  # Likely a typo in the original.
        },
        spec: {
            ports: [
                {
                    port: $.redis_port,
                    # You don't need to specify the targetPort if it is the same as the port,
                    # though here we include it anyway, to show the syntax.
                    targetPort: $.redis_port,
                },
            ],
            selector: {
                name: "redis-master",
            },
        },
    },
    "redis-master.new.yaml": Kube.v1.ReplicationController("redis-master") {
        spec: {
            replicas: 1,
            template: {
                metadata: {
                    labels: {
                        name: "redis-master",
                    },
                },
                spec: {
                    containers: [
                        {
                            name: "master",
                            image: "redis",
                            ports: [
                                {
                                    containerPort: $.redis_port,
                                },
                            ],
                        },
                        {
                            name: "collectd",
                            image: "gcr.io/%s/collectd-redis:latest" % $.project_id,
                            ports: [],
                        },
                    ],
                },
            },
        },
    },
    "bigquery-controller.new.yaml": Kube.v1.ReplicationController("bigquery-controller") {
        spec: {
            replicas: 2,
            template: {
                metadata: {
                    labels: {
                        name: "bigquery-controller",
                    },
                },
                spec: {
                    containers: [
                        {
                            name: "bigquery",
                            image: "gcr.io/%s/pipeline_image:latest" % $.project_id,
                            env: Kube.pair_list({
                                PROCESSINGSCRIPT: "redis-to-bigquery",
                                REDISLIST: "twitter-stream",
                                PROJECT_ID: $.project_id,
                                # Change the following two settings to your dataset and table.
                                BQ_DATASET: $.bq_dataset,
                                BQ_TABLE: $.bq_table,
                            }),
                        },
                    ],
                },
            },
        },
    },
}
