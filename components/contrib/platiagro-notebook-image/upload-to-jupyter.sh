#!/bin/bash

content=$(cat output.ipynb)

curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' --data '{"type":"directory"}'
curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/$1 -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' --data '{"type":"directory"}'
curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/$1/operators -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' --data '{"type":"directory"}'
curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/$1/operators/$2 -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' --data '{"type":"directory"}'
echo "{\"type\":\"notebook\", \"content\":" > data.json
cat output.ipynb >> data.json
echo "}" >> data.json
curl -v -X PUT http://server.anonymous:80/notebook/anonymous/server/api/contents/experiments/$1/operators/$2/$3 -H 'Content-Type: application/json' -H 'X-XSRFToken: token' -H 'Cookie: _xsrf=token' --data @data.json
