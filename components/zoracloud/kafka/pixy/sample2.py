import grpc
from kafkapixy_pb2 import ConsNAckRq
from kafkapixy_pb2_grpc import KafkaPixyStub
import sys

grpc_channel = grpc.insecure_channel("[::1]:19091")
kafkapixy_client = KafkaPixyStub(grpc_channel)

def consume(kafkapixy_client, group, topic):

    ack_partition = None
    ack_offset = None
    rq = ConsNAckRq(topic=topic, group=group)
    keep_running = True
    while keep_running:
        if ack_offset is None:
            rq.no_ack = True
            rq.ack_partition = 0
            rq.ack_offset = 0
        else:
            rq.no_ack = False
            rq.ack_partition = ack_partition
            rq.ack_offset = ack_offset

        try:
            rs = kafkapixy_client.ConsumeNAck(rq)
        except grpc.RpcError as err:
            if err.code() == grpc.StatusCode.NOT_FOUND:
                ack_offset = None
                continue
            else:
                print(err.result)
                continue

        try:
            ack_partition = rs.partition
            ack_offset = rs.offset
        except:
            ack_offset = None

        print(rs.message)
        ack_partition = rs.partition
        ack_offset = rs.offset

def main():
    topic = sys.argv[1]
    group = sys.argv[2]
    consume(kafkapixy_client, group, topic)

if __name__ == "__main__":
    main()