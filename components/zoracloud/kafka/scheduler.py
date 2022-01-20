from .tasks import TaskCreator

BACKEND_URL = "http://localhost:5000/api/profiles"


def create_cluster(request):
    """Que creation of cluster
    Args:
        cluster:
    """

    data = {
        'user_name': 'profile-' + str().lower(),
        'cluster_name': str(),
    }

    task_creator = TaskCreator(backend_url=BACKEND_URL, data=data)

    return task_creator.task_create_cluster.delay()
