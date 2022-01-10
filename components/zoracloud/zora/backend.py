"""Calling backend services"""
import requests
from django.core.cache import cache


def get_profiles(backend_url):
    """Get profiles from the k8s cluster and sets it in cache
    Args:
        backend_url: the backend url to make the request

    Returns:
        cached profiles

    """
    key = 'get_profiles'
    if cache.get(key) is None:
        response = requests.get(backend_url)
        data = response.json()
        cache.set(key, data)
    else:
        return cache.get(key)