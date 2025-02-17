# About the Code-Server Python Image

This file contains notes about the Kubeflow Notebooks _Code-Server Python_ image.

## Jupyter Extension required HTTPS

This image comes with the jupyter extension installed, which allows you to run and edit jupyter notebooks in code-server.

However, because the jupyter extension uses [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), it requires HTTPS to work.
That is, if you access this notebook over HTTP, the Jupyter extension will NOT work.

Additionally, if you are using __Chrome__, the HTTPS certificate must be __valid__ and trusted by your browser.
As a workaround, if you have a self-signed HTTPS certificate, you could use Firefox, or set the [`unsafely-treat-insecure-origin-as-secure`](chrome://flags/#unsafely-treat-insecure-origin-as-secure) flag in Chrome.