# Copyright 2016 Google Inc. All Rights Reserved.
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
"""Unit tests for the retry module."""

import unittest

import _exceptions
import _retry


class FakeClock(object):
  """A fake clock object implementing sleep() and recording calls."""

  def __init__(self):
    self.calls = []

  def sleep(self, value):
    self.calls.append(value)


class FakeLogger(object):
  """A fake logger object implementing log() and recording calls."""

  def __init__(self):
    self.calls = []

  def log(self, message, interval, func_name, exn_name, exn_traceback):
    _ = interval, exn_traceback
    self.calls.append((message, func_name, exn_name))


@_retry.with_exponential_backoff(clock=FakeClock())
def test_function(a, b):
  _ = a, b
  raise NotImplementedError


@_retry.with_exponential_backoff(initial_delay_secs=1.0, num_retries=1)
def test_function_with_real_clock(a, b):
  _ = a, b
  raise NotImplementedError


@_retry.no_retries
def test_no_retry_function(a, b):
  _ = a, b
  raise NotImplementedError


class RetryTest(unittest.TestCase):

  def setUp(self):
    self.clock = FakeClock()
    self.logger = FakeLogger()
    self.calls = 0

  def permanent_failure(self, a, b):
    raise NotImplementedError

  def transient_failure(self, a, b):
    self.calls += 1
    if self.calls > 8:
      return a + b
    raise NotImplementedError

  def http_error(self, code):
    raise _exceptions._RequestException(code, '')

  def test_with_explicit_decorator(self):
    # We pass one argument as positional argument and one as keyword argument
    # so that we cover both code paths for argument handling.
    self.assertRaises(NotImplementedError, test_function, 10, b=20)

  def test_with_no_retry_decorator(self):
    self.assertRaises(NotImplementedError, test_no_retry_function, 1, 2)

  def test_with_real_clock(self):
    self.assertRaises(NotImplementedError,
                      test_function_with_real_clock,
                      10,
                      b=20)

  def test_with_default_number_of_retries(self):
    self.assertRaises(NotImplementedError,
                      _retry.with_exponential_backoff(
                          clock=self.clock)(self.permanent_failure), 10, b=20)
    self.assertEqual(len(self.clock.calls), 10)

  def test_with_explicit_number_of_retries(self):
    self.assertRaises(NotImplementedError,
                      _retry.with_exponential_backoff(
                          clock=self.clock,
                          num_retries=10)(self.permanent_failure), 10, b=20)
    self.assertEqual(len(self.clock.calls), 10)

  def test_with_http_error_that_should_not_be_retried(self):
    self.assertRaises(_exceptions._RequestException,
                      _retry.with_exponential_backoff(
                          clock=self.clock, num_retries=10)(self.http_error),
                      404)
    # Make sure just one call was made.
    self.assertEqual(len(self.clock.calls), 0)

  def test_with_http_error_that_should_be_retried(self):
    self.assertRaises(_exceptions._RequestException,
                      _retry.with_exponential_backoff(
                          clock=self.clock, num_retries=10)(self.http_error),
                      500)
    self.assertEqual(len(self.clock.calls), 10)

  def test_with_explicit_initial_delay(self):
    self.assertRaises(NotImplementedError,
                      _retry.with_exponential_backoff(
                          initial_delay_secs=10.0,
                          clock=self.clock,
                          fuzz=False)(self.permanent_failure), 10, b=20)
    self.assertEqual(len(self.clock.calls), 10)
    self.assertEqual(self.clock.calls[0], 10.0)

  def test_log_calls_for_permanent_failure(self):
    self.assertRaises(NotImplementedError,
                      _retry.with_exponential_backoff(
                          clock=self.clock,
                          logger=self.logger.log)(self.permanent_failure), 10,
                      b=20)
    self.assertEqual(len(self.logger.calls), 10)
    for message, func_name, exn_name in self.logger.calls:
      self.assertTrue(message.startswith('Retry with exponential backoff:'))
      self.assertEqual(exn_name, 'NotImplementedError\n')
      self.assertEqual(func_name, 'permanent_failure')

  def test_log_calls_for_transient_failure(self):
    result = _retry.with_exponential_backoff(
        clock=self.clock, logger=self.logger.log,
        fuzz=False)(self.transient_failure)(10, b=20)
    self.assertEqual(result, 30)
    self.assertEqual(len(self.clock.calls), 8)
    self.assertEqual(self.clock.calls, [1.0 * 1, 1.0 * 2, 1.0 * 4, 1.0 * 8,
                                        1.0 * 16, 1.0 * 30, 1.0 * 30,
                                        1.0 * 30])
    self.assertEqual(len(self.logger.calls), 8)
    for message, func_name, exn_name in self.logger.calls:
      self.assertTrue(message.startswith('Retry with exponential backoff:'))
      self.assertEqual(exn_name, 'NotImplementedError\n')
      self.assertEqual(func_name, 'transient_failure')


if __name__ == '__main__':
  unittest.main()
