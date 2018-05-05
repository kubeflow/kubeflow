from kubernetes.client.rest import ApiException
from retrying import retry

RETRY_MAX_ATTEMPTS = 5
RETRY_BACKOFF_MS = 1000
POLL_BACKOFF_MS = 10000

api_retry = retry(stop_max_attempt_number=RETRY_MAX_ATTEMPTS,
                  wait_exponential_multiplier=RETRY_BACKOFF_MS,
                  retry_on_exception=lambda e: isinstance(e, ApiException))


def log(msg):
    print(msg, flush=True)


def long_poll(poll_fn, timeout_secs=None):
    @retry(stop_max_delay=timeout_secs * 1000 if timeout_secs else None,
           wait_fixed=POLL_BACKOFF_MS,
           retry_on_exception=lambda _: False,
           retry_on_result=lambda result: not result)
    def poll_wrapper():
        return poll_fn()

    return poll_wrapper()
