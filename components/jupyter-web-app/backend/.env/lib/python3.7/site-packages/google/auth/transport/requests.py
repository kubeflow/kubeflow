# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Transport adapter for Requests."""

from __future__ import absolute_import

import functools
import logging
import numbers
import time

try:
    import requests
except ImportError as caught_exc:  # pragma: NO COVER
    import six

    six.raise_from(
        ImportError(
            "The requests library is not installed, please install the "
            "requests package to use the requests transport."
        ),
        caught_exc,
    )
import requests.adapters  # pylint: disable=ungrouped-imports
import requests.exceptions  # pylint: disable=ungrouped-imports
import six  # pylint: disable=ungrouped-imports

from google.auth import exceptions
from google.auth import transport

_LOGGER = logging.getLogger(__name__)


class _Response(transport.Response):
    """Requests transport response adapter.

    Args:
        response (requests.Response): The raw Requests response.
    """

    def __init__(self, response):
        self._response = response

    @property
    def status(self):
        return self._response.status_code

    @property
    def headers(self):
        return self._response.headers

    @property
    def data(self):
        return self._response.content


class TimeoutGuard(object):
    """A context manager raising an error if the suite execution took too long.

    Args:
        timeout ([Union[None, float, Tuple[float, float]]]):
            The maximum number of seconds a suite can run without the context
            manager raising a timeout exception on exit. If passed as a tuple,
            the smaller of the values is taken as a timeout. If ``None``, a
            timeout error is never raised.
        timeout_error_type (Optional[Exception]):
            The type of the error to raise on timeout. Defaults to
            :class:`requests.exceptions.Timeout`.
    """

    def __init__(self, timeout, timeout_error_type=requests.exceptions.Timeout):
        self._timeout = timeout
        self.remaining_timeout = timeout
        self._timeout_error_type = timeout_error_type

    def __enter__(self):
        self._start = time.time()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_value:
            return  # let the error bubble up automatically

        if self._timeout is None:
            return  # nothing to do, the timeout was not specified

        elapsed = time.time() - self._start
        deadline_hit = False

        if isinstance(self._timeout, numbers.Number):
            self.remaining_timeout = self._timeout - elapsed
            deadline_hit = self.remaining_timeout <= 0
        else:
            self.remaining_timeout = tuple(x - elapsed for x in self._timeout)
            deadline_hit = min(self.remaining_timeout) <= 0

        if deadline_hit:
            raise self._timeout_error_type()


class Request(transport.Request):
    """Requests request adapter.

    This class is used internally for making requests using various transports
    in a consistent way. If you use :class:`AuthorizedSession` you do not need
    to construct or use this class directly.

    This class can be useful if you want to manually refresh a
    :class:`~google.auth.credentials.Credentials` instance::

        import google.auth.transport.requests
        import requests

        request = google.auth.transport.requests.Request()

        credentials.refresh(request)

    Args:
        session (requests.Session): An instance :class:`requests.Session` used
            to make HTTP requests. If not specified, a session will be created.

    .. automethod:: __call__
    """

    def __init__(self, session=None):
        if not session:
            session = requests.Session()

        self.session = session

    def __call__(
        self, url, method="GET", body=None, headers=None, timeout=120, **kwargs
    ):
        """Make an HTTP request using requests.

        Args:
            url (str): The URI to be requested.
            method (str): The HTTP method to use for the request. Defaults
                to 'GET'.
            body (bytes): The payload / body in HTTP request.
            headers (Mapping[str, str]): Request headers.
            timeout (Optional[int]): The number of seconds to wait for a
                response from the server. If not specified or if None, the
                requests default timeout will be used.
            kwargs: Additional arguments passed through to the underlying
                requests :meth:`~requests.Session.request` method.

        Returns:
            google.auth.transport.Response: The HTTP response.

        Raises:
            google.auth.exceptions.TransportError: If any exception occurred.
        """
        try:
            _LOGGER.debug("Making request: %s %s", method, url)
            response = self.session.request(
                method, url, data=body, headers=headers, timeout=timeout, **kwargs
            )
            return _Response(response)
        except requests.exceptions.RequestException as caught_exc:
            new_exc = exceptions.TransportError(caught_exc)
            six.raise_from(new_exc, caught_exc)


class AuthorizedSession(requests.Session):
    """A Requests Session class with credentials.

    This class is used to perform requests to API endpoints that require
    authorization::

        from google.auth.transport.requests import AuthorizedSession

        authed_session = AuthorizedSession(credentials)

        response = authed_session.request(
            'GET', 'https://www.googleapis.com/storage/v1/b')

    The underlying :meth:`request` implementation handles adding the
    credentials' headers to the request and refreshing credentials as needed.

    Args:
        credentials (google.auth.credentials.Credentials): The credentials to
            add to the request.
        refresh_status_codes (Sequence[int]): Which HTTP status codes indicate
            that credentials should be refreshed and the request should be
            retried.
        max_refresh_attempts (int): The maximum number of times to attempt to
            refresh the credentials and retry the request.
        refresh_timeout (Optional[int]): The timeout value in seconds for
            credential refresh HTTP requests.
        auth_request (google.auth.transport.requests.Request):
            (Optional) An instance of
            :class:`~google.auth.transport.requests.Request` used when
            refreshing credentials. If not passed,
            an instance of :class:`~google.auth.transport.requests.Request`
            is created.
    """

    def __init__(
        self,
        credentials,
        refresh_status_codes=transport.DEFAULT_REFRESH_STATUS_CODES,
        max_refresh_attempts=transport.DEFAULT_MAX_REFRESH_ATTEMPTS,
        refresh_timeout=None,
        auth_request=None,
    ):
        super(AuthorizedSession, self).__init__()
        self.credentials = credentials
        self._refresh_status_codes = refresh_status_codes
        self._max_refresh_attempts = max_refresh_attempts
        self._refresh_timeout = refresh_timeout

        if auth_request is None:
            auth_request_session = requests.Session()

            # Using an adapter to make HTTP requests robust to network errors.
            # This adapter retrys HTTP requests when network errors occur
            # and the requests seems safely retryable.
            retry_adapter = requests.adapters.HTTPAdapter(max_retries=3)
            auth_request_session.mount("https://", retry_adapter)

            # Do not pass `self` as the session here, as it can lead to
            # infinite recursion.
            auth_request = Request(auth_request_session)

        # Request instance used by internal methods (for example,
        # credentials.refresh).
        self._auth_request = auth_request

    def request(self, method, url, data=None, headers=None, timeout=None, **kwargs):
        """Implementation of Requests' request.

        Args:
            timeout (Optional[Union[float, Tuple[float, float]]]): The number
                of seconds to wait before raising a ``Timeout`` exception. If
                multiple requests are made under the hood, ``timeout`` is
                interpreted as the approximate total time of **all** requests.

                If passed as a tuple ``(connect_timeout, read_timeout)``, the
                smaller of the values is taken as the total allowed time across
                all requests.
        """
        # pylint: disable=arguments-differ
        # Requests has a ton of arguments to request, but only two
        # (method, url) are required. We pass through all of the other
        # arguments to super, so no need to exhaustively list them here.

        # Use a kwarg for this instead of an attribute to maintain
        # thread-safety.
        _credential_refresh_attempt = kwargs.pop("_credential_refresh_attempt", 0)

        # Make a copy of the headers. They will be modified by the credentials
        # and we want to pass the original headers if we recurse.
        request_headers = headers.copy() if headers is not None else {}

        # Do not apply the timeout unconditionally in order to not override the
        # _auth_request's default timeout.
        auth_request = (
            self._auth_request
            if timeout is None
            else functools.partial(self._auth_request, timeout=timeout)
        )

        with TimeoutGuard(timeout) as guard:
            self.credentials.before_request(auth_request, method, url, request_headers)
        timeout = guard.remaining_timeout

        with TimeoutGuard(timeout) as guard:
            response = super(AuthorizedSession, self).request(
                method,
                url,
                data=data,
                headers=request_headers,
                timeout=timeout,
                **kwargs
            )
        timeout = guard.remaining_timeout

        # If the response indicated that the credentials needed to be
        # refreshed, then refresh the credentials and re-attempt the
        # request.
        # A stored token may expire between the time it is retrieved and
        # the time the request is made, so we may need to try twice.
        if (
            response.status_code in self._refresh_status_codes
            and _credential_refresh_attempt < self._max_refresh_attempts
        ):

            _LOGGER.info(
                "Refreshing credentials due to a %s response. Attempt %s/%s.",
                response.status_code,
                _credential_refresh_attempt + 1,
                self._max_refresh_attempts,
            )

            if self._refresh_timeout is not None:
                if timeout is None:
                    timeout = self._refresh_timeout
                elif isinstance(timeout, numbers.Number):
                    timeout = min(timeout, self._refresh_timeout)
                else:
                    timeout = tuple(min(x, self._refresh_timeout) for x in timeout)

            # Do not apply the timeout unconditionally in order to not override the
            # _auth_request's default timeout.
            auth_request = (
                self._auth_request
                if timeout is None
                else functools.partial(self._auth_request, timeout=timeout)
            )

            with TimeoutGuard(timeout) as guard:
                self.credentials.refresh(auth_request)
            timeout = guard.remaining_timeout

            # Recurse. Pass in the original headers, not our modified set, but
            # do pass the adjusted timeout (i.e. the remaining time).
            return self.request(
                method,
                url,
                data=data,
                headers=headers,
                timeout=timeout,
                _credential_refresh_attempt=_credential_refresh_attempt + 1,
                **kwargs
            )

        return response
