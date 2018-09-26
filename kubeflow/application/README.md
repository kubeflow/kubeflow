## Overview

The Application Kind needs to build a set of components based on the components that 
that kubeflow sends to the api-server. Using kfctl this would be the components sent 
to the api-server via `ks apply default`. Changing kfctl to call
`ks apply default -c <application>` will generate the Application Manifest along with 
the components manifests.

Examples:




