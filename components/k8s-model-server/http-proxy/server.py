from __future__ import print_function

from itertools import repeat
import base64
import logging

from grpc.beta import implementations
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2
from tornado import gen
from tornado.ioloop import IOLoop
from tornado.options import define, options, parse_command_line
import tensorflow as tf
import tornado.web


define("port", default=8888, help="run on the given port", type=int)
define("rpc_timeout", default=1.0, help="seconds for time out rpc request", type=float)
define("rpc_port", default=9000, help="tf serving on the given port", type=int)
define("rpc_address", default='localhost', help="tf serving on the given address", type=str)
define("instances_key", default='instances', help="requested instances json object key")
define("debug", default=False, help="run in debug mode")
B64_KEY = 'b64'
WELCOME = "Hello World"

#### START code took from https://github.com/grpc/grpc/wiki/Integration-with-tornado-(python)

def _fwrap(f, gf):
    try:
        f.set_result(gf.result())
    except Exception as e:
        f.set_exception(e)


def fwrap(gf, ioloop=None):
    '''
        Wraps a GRPC result in a future that can be yielded by tornado
        
        Usage::
        
            @coroutine
            def my_fn(param):
                result = yield fwrap(stub.function_name.future(param, timeout))
        
    '''
    f = gen.Future()

    if ioloop is None:
        ioloop = IOLoop.current()

    gf.add_done_callback(lambda _: ioloop.add_callback(_fwrap, f, gf))
    return f

#### END code took from https://github.com/grpc/grpc/wiki/Integration-with-tornado-(python)

def decode_b64_if_needed(value):
    if isinstance(value, dict):
        if B64_KEY in value:
            return base64.b64decode(value[B64_KEY])
        else:
            new_value = {}
            for k, v in value.iteritems():
                new_value[k] = decode_b64_if_needed(v)
            return new_value
    elif isinstance(value, list):
        new_value = []
        for v in value:
            new_value.append(decode_b64_if_needed(v))
        return new_value
    else:
        return value

class PredictHandler(tornado.web.RequestHandler):
    @gen.coroutine
    def post(self, model, version=None):
        request_key = self.settings['request_key']
        request_data = tornado.escape.json_decode(self.request.body)
        instances = request_data.get(request_key)
        if not instances:
            self.send_error('Request json object have to use the key: %s'%request_key)

        if len(instances) < 1 or not isinstance(instances, (list, tuple)):
            self.send_error('Request instances object have to use be a list')

        instances = decode_b64_if_needed(instances)

        input_columns = instances[0].keys()

        request = predict_pb2.PredictRequest()
        request.model_spec.name = model

        if version is not None:
            request.model_spec.version = version
        
        for input_column in input_columns:
            values = [instance[input_column] for instance in instances]
            request.inputs[input_column].CopyFrom(tf.make_tensor_proto(values, shape=[len(values)]))

        stub = self.settings['stub']
        result = yield fwrap(stub.Predict.future(request, self.settings['rpc_timeout']))
        output_keys = result.outputs.keys()
        predictions = zip(*[tf.make_ndarray(result.outputs[output_key]).tolist() for output_key in output_keys])
        predictions = [dict(zip(*t)) for t in zip(repeat(output_keys), predictions)]
        self.write(dict(predictions=predictions))


class IndexHanlder(tornado.web.RequestHandler):
    def get(self):
        self.write('Hello World')


def get_application(**settings):
    return tornado.web.Application(
            [
            (r"/model/(.*):predict", PredictHandler),
            (r"/model/(.*)/version/(.*):predict", PredictHandler),
            (r"/", IndexHanlder),
            ],
            xsrf_cookies=False,
            debug=options.debug,
            rpc_timeout = options.rpc_timeout,
            request_key = options.instances_key,
            **settings)

def main():
    parse_command_line()

    channel = implementations.insecure_channel(options.rpc_address, options.rpc_port)
    stub = prediction_service_pb2.beta_create_PredictionService_stub(channel)
    extra_settings = dict(
            stub = stub,
        )
    app = get_application(**extra_settings)
    app.listen(options.port)
    logging.info('running at http://localhost:%s'%options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
