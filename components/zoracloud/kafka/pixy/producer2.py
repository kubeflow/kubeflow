import random

import grpc
from kafkapixy_pb2 import ProdRq
from kafkapixy_pb2_grpc import KafkaPixyStub
import sys

grpc_channel = grpc.insecure_channel("127.0.0.1:19091")

kafkapixy_client = KafkaPixyStub(grpc_channel)


def produce(kafkapixy_client, topic, msg):

    rq = ProdRq(topic=topic, message=msg)
    rs = kafkapixy_client.Produce(rq)
    return rs


def main():
    # topic = sys.argv[1]
    # msg = bytes(sys.argv[2], encoding="utf-8")
    flag = True
    while flag:
        msg = random.randint(1, 1000)
        produce(kafkapixy_client, "test", bytes(msg))


if __name__ == "__main__":
    main()
