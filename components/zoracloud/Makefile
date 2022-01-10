celery-worker:
	 celery -A zoracloud worker --loglevel=info

celery-beat:
	celery -A zoracloud beat

flower:
	celery -A zoracloud flower

redis:
	redis-commander

ngrok:
	./ngrok http 8000


ngrok-account:
	./ngrok authtoken 23Lm3SSyegGqvOQUPAzAMElN2g0_2mNSDebaf6gLLMBmwVARZ

redis-ui:
	redis-commander