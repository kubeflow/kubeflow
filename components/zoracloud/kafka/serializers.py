from rest_framework import serializers
from .models import KafkaCluster, KafkaTopic, KafkaUser, KafkaBridge, KafkaVirtualService, KafkaBroker, \
    KafkaBrokerListeners, KafkaConfig, KafkaZookeeper


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaTopic
        fields = ["created_at", "name", "cluster", "partitions", "replicas", "retention", "segment"]


class ClusterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaUser
        fields = ["created_at", "name", "cluster"]


class BridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaBridge
        fields = ["created_at", "name", "cluster"]


class ListenersSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaBrokerListeners
        fields = ['broker', 'plain_name', 'plain_port', 'plain_type', 'tls_type', 'tls_name', 'tls_port',
                  'tls_tls_type']


class KafkaConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaConfig
        fields = ['offsets_topic_replication_factor', 'transaction_state_log_replication_factor',
                  'transaction_state_log_min_isr', 'default_replication_factor', 'min_insync_replicas',
                  'inter_broker_protocol_version']


class ZookeeperSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaZookeeper
        fields = ['replicas', 'zookeeper_type']


class BrokerSerializer(serializers.ModelSerializer):
    # id = serializers.UUIDField()
    listeners = ListenersSerializer()

    # configurations = KafkaConfigSerializer()

    class Meta:
        model = KafkaBroker
        fields = ["replicas", "broker_type", "cluster", "version", "listeners"]


class VirtualServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaVirtualService
        fields = ["created_at", "name", "cluster"]


class CreateClusterSerializer(serializers.Serializer):
    cluster_type = serializers.CharField(max_length=200)
    cluster_name = serializers.CharField(max_length=200)


class ClusterSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    broker = BrokerSerializer(read_only=True)
    zookeeper = ZookeeperSerializer(read_only=True)
    topics = TopicSerializer(read_only=True)
    cluster_users = ClusterUserSerializer(read_only=True)
    cluster_bridge = BridgeSerializer(read_only=True)
    cluster_virtual_service = VirtualServiceSerializer(read_only=True)

    class Meta:
        model = KafkaCluster
        fields = [
            'id',
            'name',
            # 'version',
            'broker',
            'zookeeper',
            # 'initial_service_account',
            # 'initial_topic',
            # 'initial_service_name',
            'topics',
            'cluster_users',
            'cluster_bridge',
            'cluster_virtual_service'
        ]
        # fields = ['id', 'topics']


class AddKafkaTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaTopic
        fields = ['name', 'cluster']


class AddKafkaBrokerSerializer(serializers.ModelSerializer):
    class Meta:
        model = KafkaBroker
        fields = ['version', 'replicas', 'broker_type', 'cluster']


class AddListeners(serializers.ModelSerializer):
    class Meta:
        model = KafkaBrokerListeners
        # fields = ['plain_name', 'plain_port', 'plain_type', 'tls_type','tls_name','tls_port', 'tls_tls_type', 'broker']
