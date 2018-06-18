"""
run_with_retry runs the given process with the given number of retries

Example:
python run_with_retry --retries=5 -- bash my_flaky_script.sh

This runs bash my_flaky_script.sh upto 5 times till it succeeds
"""
import argparse
from kubeflow.testing import test_helper, util
from retrying import retry


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
    "--retries",
    required=True,
    type=int,
    help="The number of retries.")

  parser.add_argument('remaining_args', nargs=argparse.REMAINDER)
  args, _ = parser.parse_known_args()
  return args



def run_with_retry(_):
  """Deploy Kubeflow."""
  args = parse_args()

  @retry(stop_max_attempt_number=args.retries)
  def run():
    util.run(args.remaining_args[1:])

  run()

def main():
  test_case = test_helper.TestCase(
    name='run_with_retry', test_func=run_with_retry)
  test_suite = test_helper.init(name='run_with_retry', test_cases=[test_case])
  test_suite.run()


if __name__ == "__main__":
  main()
