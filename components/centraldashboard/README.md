# Kubeflow Landing-Page
This component is the dashboard for Kubeflow deployments

## Getting Started
For devmode, do these steps to spin up a stand-alone server locally:
- Clone the repo
- `cd` to this component on the repo (*components/centraldashboard*)
- **One Time Step**:
    - Make sure node, npm (*part of node*), and bower (**`npm i -g bower`**) are installed
    - `pushd` into *frontend*
    - Run `bower install`
    - `popd` back to folder in step 1
- Host the server locally with: `python -m SimpleHTTPServer`
