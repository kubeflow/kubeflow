import grpc
import time
from kafkapixy_pb2 import ConsNAckRq, AckRq
from kafkapixy_pb2_grpc import KafkaPixyStub
grpc_chan = grpc.insecure_channel("127.0.0.1:19091")

global _kp_clt
_kp_clt = KafkaPixyStub(grpc_chan)


def run_consume_n_ack(group, topic, msg_handler):
    """
    Runs consume-n-ack loop until global variable _keep_running is set to False.
    """
    ack_partition = None
    ack_offset = None

    rq = ConsNAckRq(topic=topic, group=group)
    global _keep_running
    while _keep_running:
        if ack_offset is None:
            rq.no_ack = True
            rq.ack_partition = 0
            rq.ack_offset = 0
        else:
            rq.no_ack = False
            rq.ack_partition = ack_partition
            rq.ack_offset = ack_offset

        try:
            # Make sure _CONSUME_TIMEOUT is at least greater then
            # consumer.long_polling_timeout Kafka-Pixy config parameter value.
            global _CONSUME_TIMEOUT
            global _kp_clt
            rs = _kp_clt.ConsumeNAck(rq, timeout=_CONSUME_TIMEOUT)
        except Exception as e:
            if isinstance(e, grpc.RpcError) and hasattr(e, 'code'):
                if e.code() == grpc.StatusCode.NOT_FOUND:
                    # Long polling timeout. The topic is empty. Just make
                    # another request.
                    ack_offset = None
                    continue

            # Unexpected errors can be generated in rapid succession e.g.
            # when a Kafka-Pixy is down. So it makes sense to back off.
            global _BACK_OFF_TIMEOUT
            time.sleep(_BACK_OFF_TIMEOUT)
            continue

        try:
            msg_handler(rs.message)
            ack_partition = rs.partition
            ack_offset = rs.offset
        except:
            ack_offset = None
            # The message handler raised an exception, it is up to you what
            # to do in this case.

    # If there is nothing to acknowledge then return.
    if ack_offset is None:
        return

    # Acknowledge the last consumed message.
    rq = AckRq(topic=topic,
               group=group,
               partition=ack_partition,
               offset=ack_offset)
    try:
        global _kp_clt
        _kp_clt.Ack(rq, timeout=_CONSUME_TIMEOUT)
    except:
        print('Failed to ack last message: topic=%s, partition=%d, '
                       'offset=%d' % (topic, ack_partition, ack_offset))
