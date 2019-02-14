#!/usr/bin/env python
from kubeflow.rokui import app

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")