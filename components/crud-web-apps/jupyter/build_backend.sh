cd components/crud-web-apps/jupyter

# create a virtual env and install deps
# https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
python3.8 -m pip install --user virtualenv
python3.8 -m venv web-apps-dev
source web-apps-dev/bin/activate

# install the deps on the activated virtual env
make -C backend install-deps

# run the backend
# NOTE: if your on MacOS, you might need to disable "AirPlay Receiver" as this uses port 5000
#       https://developer.apple.com/forums/thread/682332
make -C backend run-dev
