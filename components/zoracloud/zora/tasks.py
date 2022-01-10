""""""
import pprint
import asyncio
import uvloop
import requests
import ujson
from aiohttp import ClientSession
import json
from celery import shared_task
from django.core.cache import cache

asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())


@shared_task
def get_profiles(backend_url):
    """Get profiles from the k8s cluster"""
    key = 'get_profiles'
    response = requests.get(backend_url)
    data = response.json()
    cache.set(key, data)


@shared_task
def profile_creation(backend, task_name):
    loop = asyncio.get_event_loop()

    create_prof = loop.create_task(create_profile(backend=backend, task_name=task_name))
    response_result = loop.create_task(return_response(task_name=task_name))

    final_task = asyncio.gather(create_prof, response_result)
    loop.run_until_complete(final_task)
    return response_result.result()


async def create_profile(backend, task_name):
    task = await read_cache(task_name)

    task_response = "response" + task_name

    # if task is none and not in created profile
    if task is None:
        print("No data in the cache")
    else:
        data_in_json = json.dumps(task)
        headers = {'Content-type': 'application/json'}
        # response = await requests.post(backend, data=data_in_json, headers=headers)

        async with ClientSession(json_serialize=ujson.dumps) as session:
            async with session.post(url=backend, data=data_in_json, headers=headers) as resp:
                response = await resp.json()

        # print(response.text)
        # data = response.json()
        # cache.set(task_response, response)
        await write_to_cache(key=task_response, data=response)
        await read_cache(key=task_response)
        return response


async def read_cache(key):
    return cache.get(key)


async def write_to_cache(key, data):
    data_from_cache = cache.get(key)
    if data_from_cache is None:
        cache.set(key, data)
    else:
        return cache.get(key)


async def return_response(task_name):
    task_response = "response" + task_name
    await read_cache(task_response)


def scheduled_profiles():
    pass
    # pick from redis
    # Go for it
    # if status is ok
    # check created profile
    # remove from the sceduled

# def schedule():
#     fetched_profile = dict(cache.get("schedule_create_profile"))
#     if cache.get("get_profiles")
#     data = {
#         'user_name': str(profile.user.username),
#         'email': str(profile.user.email),
#         'cpu': str(profile.cpu),
#         'memory': str(profile.memory),
#         'gpu': str(profile.gpu),
#         'pvc': str(profile.number_of_disks),
#         'storage': str(profile.volume)
#     }
#     # create_profile_task.delay(self.BACKEND_URL, data=json.dumps(data))
#     pp.pprint(data)
