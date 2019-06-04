IMG := gcr.io/arrikto-interns/notebooksui-backend

run:
	python main.py

run-rok:
	UI=rok python main.py

build:
	docker build -t $(IMG) .

push:
	docker push $(IMG)

publish: build push
