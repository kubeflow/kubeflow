from django.urls import path
from .views import say_hello


##Url Conf
urlpatterns = [
    path("clusters/", say_hello)
]