from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('profiles', views.ProfileViewSet)


##Url Conf
urlpatterns = router.urls