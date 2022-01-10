from django.urls import path
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register('profiles', views.ProfileViewSet)
router.register('provision', views.ResponseViewSet)


##Url Conf
urlpatterns = router.urls