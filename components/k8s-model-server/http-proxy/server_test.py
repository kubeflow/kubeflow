import json
import base64

import pytest
from tornado import gen

from server import decode_b64_if_needed, get_application, WELCOME


@pytest.fixture
def app():
    return get_application(stub=None)

@pytest.fixture(params=['xa', u'sada'])
def mock_data(request):
    return request.param

def predict_template(data):
    return {'instances': [{'images': data}]}

@pytest.fixture
def raw_predict_payload(mock_data):
    return predict_template({'b64': base64.b64encode(mock_data)})

@pytest.fixture
def predict_payload(raw_predict_payload):
    return json.dumps(raw_predict_payload)

def test_base64_decodes(raw_predict_payload, mock_data):
    actual = decode_b64_if_needed(raw_predict_payload)
    expected = predict_template(mock_data)
    assert actual == expected

def test_base64_not_doing_extra_1(mock_data):
    actual = decode_b64_if_needed(mock_data)
    assert actual == mock_data

def test_base64_not_doing_extra_2(mock_data):
    actual = decode_b64_if_needed(predict_template(mock_data))
    assert actual == predict_template(mock_data)

def test_base64_not_doing_extra_3(mock_data):
    actual = decode_b64_if_needed(predict_template(predict_template(mock_data)))
    assert actual == predict_template(predict_template(mock_data))

@pytest.mark.gen_test
def test_index_success(app, http_client, base_url):
    response = yield http_client.fetch(base_url)
    assert response.code == 200
    assert WELCOME in response.body

@pytest.mark.gen_test
def test_index_get_only(app, http_client, base_url, predict_payload):
    with pytest.raises(Exception) as e:
        yield http_client.fetch(base_url, method='POST', body=predict_payload)
    assert 'Method Not Allowed' in e.value.message

def test_predict_with_get(app, http_client, base_url, io_loop):
    @gen.coroutine
    def test_gen():
        with pytest.raises(Exception) as e:
            response = yield http_client.fetch('%s/model/name:predict' % base_url)
        assert 'Method Not Allowed' in e.value.message
    io_loop.run_sync(test_gen)

def test_predict_with_post_without_payload(app, http_client, base_url, io_loop):
    @gen.coroutine
    def test_gen():
        with pytest.raises(Exception) as e:
            response = yield http_client.fetch('%s/model/name:predict' % base_url, method='POST')
        assert 'Body must not be None for method POST' in e.value.message
    io_loop.run_sync(test_gen)

