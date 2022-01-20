from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin
# from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from .models import KafkaCluster, KafkaTopic, KafkaUser, KafkaBridge, KafkaVirtualService, KafkaBroker, \
    KafkaBrokerListeners
from .serializers import ClusterSerializer, TopicSerializer, ClusterUserSerializer, BridgeSerializer, \
    VirtualServiceSerializer, AddKafkaTopicSerializer, BrokerSerializer, ListenersSerializer, AddKafkaBrokerSerializer, \
    AddListeners, CreateClusterSerializer

from rest_framework.decorators import action


class KafkaClusterViewSet(CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = KafkaCluster.objects.all()
    serializer_class = ClusterSerializer

    # lookup_field = id

    @action(detail=False, methods=['GET', 'POST'])
    def create_cluster(self, request):
        serializer = CreateClusterSerializer()
        print(request.user)
        return Response({"scheduled": True})


class KafkaTopicViewSet(ModelViewSet):
    serializer_class = TopicSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddKafkaTopicSerializer
        return TopicSerializer

    def get_queryset(self):
        return KafkaTopic.objects.filter(cluster_id=self.kwargs['cluster_pk'])


class ClusterUserViewSet(ModelViewSet):
    serializer_class = ClusterUserSerializer

    def get_queryset(self):
        return KafkaUser.objects.filter(cluster_id=self.kwargs['cluster_pk'])


class ClusterBridgeViewSet(ModelViewSet):
    serializer_class = BridgeSerializer

    def get_queryset(self):
        return KafkaBridge.objects.filter(cluster_id=self.kwargs['cluster_pk'])


class ClusterVirtualServiceViewSet(ModelViewSet):
    serializer_class = VirtualServiceSerializer

    def get_queryset(self):
        return KafkaVirtualService.objects.filter(cluster_id=self.kwargs['cluster_pk'])


class BrokerViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddKafkaBrokerSerializer
        return BrokerSerializer

    def get_queryset(self):
        return KafkaBroker.objects.filter(cluster_id=self.kwargs['cluster_pk'])


class ListenersViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddListeners
        return ListenersSerializer

    def get_queryset(self):
        sample = self.kwargs
        return KafkaBrokerListeners.objects.filter(broker__cluster_id=self.kwargs['cluster_pk'])
