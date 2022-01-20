from django.db import models
from django.conf import settings
from uuid import uuid4


class KafkaCluster(models.Model):
    JBOD = 'J'
    PERSISTENT_CLAIM = 'P'
    EPHEMERAL = 'E'

    PLAIN = 'P'
    TLS = 'T'

    INTERNAL = 'I'

    BROKER_STORAGE_TYPE = [
        (JBOD, 'jbod'),
        (EPHEMERAL, 'ephemeral'),
    ]

    ZOOKEEPER_STORAGE_TYPE = [
        (PERSISTENT_CLAIM, 'persistent-claim'),
        (EPHEMERAL, 'ephemeral'),
    ]

    KAFKA_BROKER_LISTENERS = [
        (PLAIN, 'plain'),
        (TLS, 'tls')
    ]

    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255, unique=True)
    initial_service_account = models.CharField(max_length=255, null=True)
    initial_topic = models.CharField(max_length=255, null=True)
    initial_service_name = models.CharField(max_length=255, null=True)
    version = models.CharField(max_length=255)
    # broker_type = models.CharField(max_length=255, choices=BROKER_STORAGE_TYPE, default=EPHEMERAL)
    # zookeeper_type = models.CharField(max_length=255, choices=ZOOKEEPER_STORAGE_TYPE, default=EPHEMERAL)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)


class KafkaTopic(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    cluster = models.OneToOneField(KafkaCluster, on_delete=models.CASCADE, primary_key=True, related_name='topics')
    partitions = models.IntegerField(default=1)
    replicas = models.IntegerField(default=1)
    retention = models.BigIntegerField(default=7200000)
    segment = models.BigIntegerField(default=1073741824)


class KafkaUser(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    cluster = models.OneToOneField(KafkaCluster, on_delete=models.CASCADE, primary_key=True,
                                   related_name='cluster_users')
    # topic =


class KafkaBridge(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    cluster = models.OneToOneField(KafkaCluster, on_delete=models.CASCADE, primary_key=True,
                                   related_name='cluster_bridge')


class KafkaVirtualService(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    cluster = models.OneToOneField(KafkaCluster, on_delete=models.CASCADE, primary_key=True,
                                   related_name='cluster_virtual_service')


class KafkaBrokerVolume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    type = models.CharField(max_length=255, default="persistent-claim")
    size = models.IntegerField()
    delete_claim = models.BooleanField(default=False)


class KafkaZookeeperVolume(models.Model):
    type = models.CharField(max_length=255, default="persistent-claim")
    size = models.IntegerField()
    delete_claim = models.BooleanField(default=False)


class KafkaBroker(models.Model):
    JBOD = 'J'
    PERSISTENT_CLAIM = 'P'
    EPHEMERAL = 'E'

    BROKER_STORAGE_TYPE = [
        (JBOD, 'jbod'),
        (EPHEMERAL, 'ephemeral'),
    ]

    ZOOKEEPER_STORAGE_TYPE = [
        (PERSISTENT_CLAIM, 'persistent-claim'),
        (EPHEMERAL, 'ephemeral'),
    ]

    version = models.CharField(max_length=255, default="3.0.0")
    replicas = models.PositiveSmallIntegerField(default=3)
    broker_type = models.CharField(max_length=255, choices=BROKER_STORAGE_TYPE, default=EPHEMERAL)
    cluster = models.OneToOneField(KafkaCluster, on_delete=models.CASCADE, primary_key=True,
                                   related_name='broker')

    # size = models.IntegerField(max_length=3)
    # delete_claim = models.BooleanField(default=False)


class KafkaBrokerListeners(models.Model):
    PLAIN = 'P'
    TLS = 'T'

    INTERNAL = 'I'
    PLAIN_TYPE = [
        (INTERNAL, 'internal')
    ]

    TLS_TYPE = [
        (INTERNAL, 'internal')
    ]

    NAMES = [
        (PLAIN, 'plain'),
        (TLS, 'tls')
    ]

    plain_name = models.CharField(max_length=255, choices=NAMES, default=PLAIN)
    plain_port = models.IntegerField(default=9092)
    plain_type = models.CharField(max_length=255, choices=PLAIN_TYPE, default=INTERNAL)
    tls_type = models.BooleanField(default=False)

    tls_name = models.CharField(max_length=255, choices=NAMES, default=TLS)
    tls_port = models.IntegerField(default=9093)
    tls_tls_type = models.BooleanField(default=True)

    broker = models.OneToOneField(KafkaBroker, on_delete=models.CASCADE, primary_key=True,
                                  related_name='listeners')


class KafkaConfig(models.Model):
    offsets_topic_replication_factor = models.PositiveSmallIntegerField(default=3)
    transaction_state_log_replication_factor = models.PositiveSmallIntegerField(default=3)
    transaction_state_log_min_isr = models.PositiveSmallIntegerField(default=2)
    default_replication_factor = models.PositiveSmallIntegerField(default=3)
    min_insync_replicas = models.PositiveSmallIntegerField(default=2)
    inter_broker_protocol_version = models.CharField(max_length=20, default="3.0")

    broker = models.OneToOneField(KafkaBroker, on_delete=models.CASCADE, primary_key=True,
                                  related_name='configurations')


class KafkaZookeeper(models.Model):
    JBOD = 'J'
    PERSISTENT_CLAIM = 'P'
    EPHEMERAL = 'E'

    BROKER_STORAGE_TYPE = [
        (JBOD, 'jbod'),
        (EPHEMERAL, 'ephemeral'),
    ]

    ZOOKEEPER_STORAGE_TYPE = [
        (PERSISTENT_CLAIM, 'persistent-claim'),
        (EPHEMERAL, 'ephemeral'),
    ]

    replicas = models.PositiveSmallIntegerField(default=3)
    zookeeper_type = models.CharField(max_length=255, choices=BROKER_STORAGE_TYPE, default=EPHEMERAL)

    cluster = models.OneToOneField(KafkaCluster, on_delete=models.CASCADE, primary_key=True,
                                   related_name='zookeeper')
