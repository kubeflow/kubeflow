"""Modules for scheduling tasks in cluster"""
import hashlib
import uuid
from django.core.cache import cache
from .tasks import profile_creation as create_profile_task
from .backend import get_profiles
from .tasks import write_to_cache, read_cache

BACKEND_URL = "http://localhost:5000/api/profiles"


def create_profile_schedule(profile):
    """Schedule creation of profiles
    Args:
        profile:
    """

    data = {
        'user_name': 'profile-' + str(profile.user.username).lower(),
        'email': str(profile.user.email),
        'cpu': int(profile.cpu),
        'memory': str(profile.memory) + 'Gi',
        'gpu': str(profile.gpu),
        'pvc': str(profile.number_of_disks),
        'storage': str(profile.volume) + 'Gi'
    }

    namespace = uuid.uuid4()
    task_name = uuid.uuid5(namespace, str(profile.user.username).lower())
    key = "request"+str(task_name)

    # await write_to_cache(key=key, data=dict(data))

    cache.set(key, dict(data))
    # task_name = 'create-' + str(profile.user.username)
    return create_profile_task.delay(BACKEND_URL, task_name=key), key

    # cache.set(task_name + '-response', response)
    # cache.set(task_name + '-response', response)

    # Check if profiles exists
    # profile_exists = is_profile_in_cache(
    #     profile_name='profile-'+str(profile.user.username).lower(),
    #     fetched_profiles=get_profiles)
    #
    # if profile_exists:
    #     print("profile_exists")
    #
    # else:
    #     cache.set(str(profile.user.email), dict(data))
    #     task_name = 'create-' + str(profile.user.username)
    #     response = create_profile_task.delay(BACKEND_URL, task_name)
    #     cache.set(task_name + '-response', response)


def is_profile_in_cache(profile_name, fetched_profiles):
    """Checks if profile name exists in cache

    Args:
        profile_name: str
        fetched_profiles: func

    Returns
        Boolean
    """
    fetched = fetched_profiles(BACKEND_URL)

    if fetched is not None and fetched["status"] == 200:
        # Check if profile exist
        profiles = fetched["profiles"]
        for profile in profiles:
            name = profile["spec"]["owner"]["name"]
            if name == profile_name:
                return True
            else:
                return False
