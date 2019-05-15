# -*- coding: utf-8 -*-
from argparse import ArgumentParser

from controller import Controller


def main():
  parser = ArgumentParser()
  parser.add_argument('--namespace', type=str, required=True)
  parser.add_argument('--master', type=str, required=True)
  parser.add_argument('--num-gpus', type=int, default=0)
  parser.add_argument('--timeout-secs', type=int, default=300)
  parser.add_argument('--download-data-from', type=str)
  parser.add_argument('--download-data-to', type=str)
  parser.add_argument('--upload-data-from', type=str)
  parser.add_argument('--upload-data-to', type=str)
  args = parser.parse_args()

  with Controller(
      namespace=args.namespace,
      master=args.master,
      num_gpus=args.num_gpus,
      timeout_secs=args.timeout_secs,
      download_data_from=args.download_data_from,
      download_data_to=args.download_data_to,
      upload_data_from=args.upload_data_from,
      upload_data_to=args.upload_data_to) as ctl:
    ctl.wait_ready()
    ctl.wait_done()


if __name__ == '__main__':
  main()
