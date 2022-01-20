""""""
import json
import ujson
import asyncio
import uvloop
from celery import shared_task
from aiohttp import ClientSession


class TaskCreator:
    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())

    def __init__(self, backend_url, data):
        self.backend_url = backend_url
        self.data = data
        self.headers = {'Content-type': 'application/json'}
        self.loop = asyncio.get_event_loop()

    @shared_task
    def task_create_cluster(self):
        task = self.loop.create_task(await self.post())
        final_task = asyncio.gather(task)
        self.loop.run_until_complete(final_task)

    async def post(self):
        data = json.dumps(self.data)
        async with ClientSession(json_serialize=ujson.dumps) as session:
            async with session.post(url=self.backend_url, data=data, headers=self.headers) as resp:
                response = await resp.json()
            return response