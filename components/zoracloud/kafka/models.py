from django.db import models


# Create your models here.

class EphemeralCluster(models.Model):
    """Ephemeral Cluster Models"""
    default_kafka_version = "3.0.0"
    default_number_of_replicas = 3

    cluster_name = models.CharField(max_length=20, null=False, blank=False, unique=True)
    version = models.CharField(max_length=7, default=default_kafka_version)
    number_of_replicas = models.IntegerField(default=3)
    offset_topic_replication_factor = models.IntegerField(default=3)
    transaction_state_log_replication_factor = models.IntegerField(default=3)
    transaction_state_log_min = models.IntegerField(default=3)
    default_replication_factor = models.IntegerField(default=3)
    min_insync_replicas = models.IntegerField(default=2)
    inter_broker_protocol_version = models.CharField(max_length=7, default="3.0")
    storage_type = models.CharField(max_length=15, default="ephemeral")
    zookeeper_replicas = models.IntegerField(default=3)
    last_update = models.DateTimeField(auto_now=True)


class VirtualService(models.Model):
    """A model for Istio virtual service"""
    name = models.CharField(max_length=50, unique=True)
    namespace = models.CharField(max_length=50, )
    gateway = models.CharField(max_length=255, default="kubeflow/kubeflow-gateway")
    hosts = models.CharField(max_length=255, default="'*'")
    uri =  models.CharField(max_length=255, unique=True)
    destination = models.CharField(max_length=255, unique=True)