import json
import pprint

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
from .models import Profile, ProvisionResponse
from .serializers import ProfileSerializer, Provision
from rest_framework.decorators import action
from .backend import get_profiles
from rest_framework import status
from .scheduler import create_profile_schedule
import pprint as pp
from celery.result import AsyncResult


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    # permission_classes = [IsAuthenticated]
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
        (profile, created) = Profile.objects.get_or_create(user_id=request.user.id)
        if request.method == 'GET':
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    @action(detail=False, methods=['GET', 'POST'])
    def provision(self, request):
        (profile, created) = Profile.objects.get_or_create(user_id=request.user.id)
        task, key = create_profile_schedule(profile)
        # res = AsyncResult(task_id).status
        key_name = 'response' + key

        if cache.get(key_name) is None:
            print("still fetching")
        else:
            print(cache.get(key_name))
        return Response({
            "response_id": key_name
        })

    @action(detail=False, methods=['POST'])
    def provision_result(self, request):
        return Response(request.data)


class ResponseViewSet(ModelViewSet):
    queryset = ProvisionResponse.objects.all()
    serializer_class = Provision

    @action(detail=False, methods=['POST'])
    def result(self, request):
        ProvisionResponse.objects.create()
        key_name = request.data['provision_response']
        if cache.get(key_name) is None:
            return Response({
                "message": "data not available at this time or did not provide the data"
            })
        else:
            return Response(cache.get(key_name))