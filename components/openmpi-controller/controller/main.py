from argparse import ArgumentParser

from controller import Controller


def main():
    parser = ArgumentParser()
    parser.add_argument('--namespace', type=str, required=True)
    parser.add_argument('--master', type=str, required=True)
    args = parser.parse_args()

    with Controller(args.namespace, args.master) as ctl:
        ctl.wait_master_terminated()


if __name__ == '__main__':
    main()
