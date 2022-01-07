""""""
import requests
from celery import shared_task
from django.core.cache import cache


@shared_task
def get_profiles(backend_url):
    """Get profiles from the k8s cluster"""
    key = 'get_profiles'
    response = requests.get(backend_url)
    data = response.json()
    cache.set(key, data)


@shared_task
def create_profile(backend, data):
    key = 'created_profiles'
    response = requests.post(backend, data=data)
    data = response.json()
    cache.set(key, data)
