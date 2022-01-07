import requests.exceptions
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.generics import CreateAPIView

from .tasks import get_profiles as get_profiles_task
from .tasks import create_profile as create_profile_task
from django.core.cache import cache
from django.utils.decorators import method_decorator
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.cache import cache_page
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.decorators import action
from .backend import get_profiles
from rest_framework import status
import pprint as pp


class EphemeralClusterList(APIView):
    def get(self, request):
        # save in cache and
        return Response({"hello": "Clusters"})

    def post(self, request):
        # create a task to register
        # take data and send it to the api
        # if the response code if accept
        # save in the database
        pass


class ProfileViewSet(ModelViewSet):
    BACKEND_URL = "http://localhost:5000/api/profiles"

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [AllowAny()]
    #     return [IsAuthenticated()]

    # fetched_profile = get_profiles(BACKEND_URL)
    # pp.pprint(fetched_profile)

    # @method_decorator(cache_page(30))
    # def post(self, request, *args, **kwargs):
    #
    #     # create this task to celery
    #     # try:
    #     fetched_profile = get_profiles(self.BACKEND_URL)
    #     # except requests.exceptions.ConnectionError:
    #
    #     if fetched_profile["status"] == 200:
    #         # Look if profile exist
    #         profiles = fetched_profile["profiles"]
    #         for profile in profiles:
    #             resource_quota = profile["spec"]["resourceQuotaSpec"]
    #             name = profile["spec"]["owner"]["name"]
    #             if name == "user@example.com":
    #                 return "profile exists"
    #             else:
    #                 "create the profile"
    #                 if "success" == 200:
    #                     "save to the db"
    #     else:
    #         return "we cannot create your profile at this time do you want " \
    #                "us to send you notification when you can create it"
    #
    #     return self.create(request, *args, **kwargs)
    #     # return "saving"

    # @method_decorator(cache_page(30))
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        get_profiles_task.delay(self.BACKEND_URL)

        # self.perform_create(serializer)
        # pp.pprint("saving")

        # create this task to celery
        try:
            key = 'get_profiles'

            fetched_profile = dict(cache.get(key))
            # return Response(fetched_profile)

            if fetched_profile["status"] == 200:
                # Look if profile exist
                profiles = fetched_profile["profiles"]
                for profile in profiles:
                    resource_quota = profile["spec"]["resourceQuotaSpec"]
                    name = profile["spec"]["owner"]["name"]
                    if name == serializer.data["email"]:
                        return Response("Profile exists")
                    else:
                        return Response("creating the profile")
                        # if "success" == 200:
                        #     "save to the db"
        except requests.exceptions.ConnectionError:
            return Response("we cannot create your profile at this time do you want")

        # # return self.create(request, *args, **kwargs)
        # pp.pprint("saving")
        #     headers = self.get_success_headers(serializer.data)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        # pp.pprint(request.user.email)
        (profile, created) = Profile.objects.get_or_create(user_id=request.user.id)
        data = {
            "user_name": profile.user.username,
            "email": profile.user.email,
            "cpu": profile.cpu,
            "memory": profile.memory,
            "gpu": profile.gpu,
            "pvc": profile.number_of_disks,
            "storage": profile.volume

        }
        # create profile task
        create_profile_task.delay(self.BACKEND_URL, data)

        # pp.pprint(data)
        if request.method == 'GET':
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

# class CreateProfile(CreateAPIView):
#     """Create profile"""
#
#     BACKEND_URL = "localhost:5000/api/profiles"
#
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#
#     @method_decorator(cache_page(30))
#     def post(self, request, *args, **kwargs):
#
#         # create this task to celery
#         fetched_profile = get_profiles(self.BACKEND_URL)
#         if fetched_profile["status"] == 200:
#             # Look if profile exist
#             profiles = fetched_profile["profiles"]
#             for profile in profiles:
#                 resource_quota = profile["spec"]["resourceQuotaSpec"]
#                 name = profile["spec"]["owner"]["name"]
#                 if name == "send_name":
#                     return "profile exists"
#                 else:
#                     "create the profile"
#                     if "success" == 200:
#                         "save to the db"
#         else:
#             return "we cannot create your profile at this time do you want " \
#                    "us to send you notification when you can create it"
#
#         return self.create(request, *args, **kwargs)
