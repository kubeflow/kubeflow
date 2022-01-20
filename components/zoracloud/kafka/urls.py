from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

# router = routers.DefaultRouter()
router = DefaultRouter()
router.register('clusters', views.KafkaClusterViewSet)
# router.register('brokers', views.BrokerViewSet)
# router.register('clusters/<uuid:uuid>/', views.KafkaClusterViewSet)

# clusters_router = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
# clusters_router.register('clusters', views.KafkaClusterViewSet, basename='clusters')

topics_router = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
topics_router.register('topics', views.KafkaTopicViewSet, basename='stream-topics')

users_router = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
users_router.register('users', views.ClusterUserViewSet, basename='stream-users')

bridge_router = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
bridge_router.register('bridges', views.ClusterBridgeViewSet, basename='stream-bridges')

virtual_service = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
virtual_service.register('service', views.ClusterVirtualServiceViewSet, basename='stream-services')

broker = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
broker.register('broker', views.BrokerViewSet, basename='broker')

listeners = routers.NestedDefaultRouter(router, "clusters", lookup='cluster')
listeners.register('listeners', views.ListenersViewSet, basename='listener')

urlpatterns = router.urls + topics_router.urls + users_router.urls + bridge_router.urls + virtual_service.urls + broker.urls + listeners.urls