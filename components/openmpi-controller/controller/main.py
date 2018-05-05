from argparse import ArgumentParser

from controller import Controller


def main():
    parser = ArgumentParser()
    parser.add_argument('--namespace', type=str, required=True)
    parser.add_argument('--master', type=str, required=True)
    parser.add_argument('--num-gpus', type=int, default=0)
    parser.add_argument('--timeout-secs', type=int, default=300)
    args = parser.parse_args()

    with Controller(namespace=args.namespace,
                    master=args.master,
                    num_gpus=args.num_gpus,
                    timeout_secs=args.timeout_secs) as ctl:
        ctl.wait_ready()
        ctl.wait_done()


if __name__ == '__main__':
    main()
