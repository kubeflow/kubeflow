# HubSync
## Syncing GCR to DockerHub

If you are using DockerHub, copy _keys.yaml.sample_ to _keys.yaml_ and add the DockerHub "username" and "password".

In _hubsync.py_ you will want to change the __myRepo__ url to yours. If DockerHub, just your username with a "/" at the end. If GCR.io, then "gcr.io/<myrepo>/"

Before executing, be sure to run this line to install Python modules (be sure to use a virtualenv).

```
pip install -r requirements.txt
```

This will install a few components such as pyyaml and jinja.
