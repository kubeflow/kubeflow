# Load the shared modules dir to PYTHONPATH
MODULE_DIR := $(pwd)

all: run-default

run-default:
	cd default && PYTHONPATH=${PYTHONPATH}:${MODULE_DIR} python run.py

run-rok:
	cd rok && PYTHONPATH=${PYTHONPATH}:${MODULE_DIR} python run.py