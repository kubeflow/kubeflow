# Expose Idleness Information for Jupyter Notebooks

**Authors**: Athanasios Markou athamark@arrikto.com, Kimonas Sotirchos kimwnasptd@arrikto.com, Chris Pavlou cspavlou@arrikto.com

## Motivation

The motivation behind this iteration is to expose information about the idleness for Jupyter Notebooks. More precisely, we want to extend the notebook controller so that it exposes the last time that a Jupyter Notebook Server performed any computations. 

This information will be exposed in the `notebooks.kubeflow.org/last_activity: <timestamp>` annotation on each Jupyter Notebook. Throughout the doc we will call this `LAST_ACTIVITY_ANNOTATION`. 

## Goals

* Expose a timestamp with the last-activity of a Jupyter Notebook
* Track only kernel activity, when updating the last-activity timestamp
* Extend the culling mechanism to use the last-activity information

## Non-Goals

* Marking a Jupyter Notebook as idle
* Using Notebook Server's http info when calculating the last-activity timestamp
* Updating the last-activity timestamp for RStudio or VSCode notebooks
* Modify how we expose idleness thresholds for the culler
* Storing the culling vars in each Notebook instead of the storing them in the Controller

## Proposal

### Kernel States

Each Jupyter Notebook Server launches a set of kernels. Each kernel can be in one of the following [execution states](https://jupyter-client.readthedocs.io/en/latest/messaging.html#kernel-status):
* `starting`: this indicates that the kernel is starting
* `busy`: the kernel is currently performing the computations that the server has specifically requested
* `idle`: the kernel is currently performing no actions/computations.

We can deduce the last time that a Jupyter Notebook performed any computations from the [`/api/kernels`](https://github.com/jupyter/notebook/blob/master/notebook/services/api/api.yaml#L427) endpoint. This endpoint exposes JSON data for all the kernels that are currently running. Among this data, `/api/kernels` exposes the `execution-state` and the `last-activity` timestamp of each kernel for the inspected Server. Here is an example of what this endpoint exposes:
```
[{"id": "470d0112-6dcd-4df3-9016-8a40fc8864ca", "name": "python3", "last_activity": "2021-08-30T14:02:56.821755Z", "execution_state": "idle", "connections": 1}, ...]
```
For more information about the `/api/kernels` endpoint you can check [Jupyter's docs](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#/kernels). 

### Implementation Details

The notebook controller will be periodically checking each Notebook Server. The notebook controller will be both setting and utilizing a special annotation that we will introduce. This annotation (`LAST_ACTIVITY_ANNOTATION`) will be the **cornerstone** of this implementation. Here's how this annotation will be used:
1. **Set** the `LAST_ACTIVITY_ANNOTATION`: When the user creates a Notebook CR, then a respective pod is initialized. The CR object for this Notebook Server does not contain (yet) the `LAST_ACTIVITY_ANNOTATION`. In this case, the controller sets the `LAST_ACTIVITY_ANNOTATION` with the **current time**.
2. **Update** the `LAST_ACTIVITY_ANNOTATION`: If a Notebook Server has already a `Running` pod, then this Notebook Server will already have this annotation set, from step 1. The controller must update properly this annotation. To do so, the notebook controller must examine whether or not all the notebook's kernels are `idle`:
   - If the Notebook Server has at least one `busy` kernel then we must consider the server as `busy`. The Controller will update the `LAST_ACTIVITY_ANNOTATION` with the **current time**. 
   - If the Notebook Server has only `idle` kernels then the notebook controller will update this annotation based on the most recent `last-activity` of the kernels (as exposed by the `/api/kernels` endpoint).
3. **Delete** the `LAST_ACTIVITY_ANNOTATION`: The notebook controller will examine CR objects. If a CR object does not have a pod running then the notebook controller will delete the `LAST_ACTIVITY_ANNOTATION` of this CR object. Notebooks with no pods should not have the `LAST_ACTIVITY_ANNOTATION` annotation.

Here is a **pseudocode** that presents how we implement these functionalities:
```bash
if (podFound != true) then
   delete(CR, LAST_ACTIVITY_ANNOTATION)
else
   if (exists(CR, LAST_ACTIVITY_ANNOTATION) != true) then
      set(CR, LAST_ACTIVITY_ANNOTATION, time.Now())
   else
      if (AllKernelsIdle != true) then
          update(CR, LAST_ACTIVITY_ANNOTATION, time.Now())
      else
          kernels_la = get_latest_last_activity(/api/kernels) 
          update(CR, LAST_ACTIVITY_ANNOTATION, kernels_la)          
      endif
   endif
endif
```
Both `last-activity` and `execution-state`, that the `/api/kernels` endpoint exposes, are necessary for our new approach. Therefore, we do not make any requests on the `/api/status` endpoint. 

### API changes

A summary for the endpoints, the ENV Vars, and the annotations that we use is the following:

| ENV Var | Default value | Desc |
| --- | --- | --- |
| `CULL_IDLE_TIMEOUT` | "1440" (minutes) | If a Notebook's `LAST_ACTIVITY_ANNOTATION` from the current timestamp exceeds this value then the Notebook will be scaled to zero (culled). `ENABLE_CULLING` must be set to "true" for this setting to take effect. |
| `IDLENESS_CHECK_PERIOD` | "1" (minutes) | How frequently the controller should poll each Notebook to update its `LAST_ACTIVITY_ANNOTATION`. |
| `DEV` | "false" | If set to "true" then the controller will check the `/api/kernels` endpoint from localhost. This ENV Var is intended for local development and testing of the notebook controller.|

| Annotation | Desc |
| --- | --- |
| `notebooks.kubeflow.org/last_activity` |  The timestamp of the last activity of the Notebook's kernels. |
| `kubeflow-resource-stopped` | The timestamp of when the Notebook was scaled to zero (culled). |

`CULL_IDLE_TIMEOUT` is the previous `IDLE_TIME` ENV Var in the controller, but we changed its name to make it more accurate. The name is also the same with what the Jupyter server uses for culling idle kernels (https://jupyter-server.readthedocs.io/en/latest/full-config.html).
| Notebook endpoints | Desc |
| --- | --- |
| [`/api/kernels`](https://github.com/jupyter/notebook/blob/master/notebook/services/api/api.yaml#L427-L438) | The Controller uses this endpoint to update the `LAST_ACTIVITY_ANNOTATION` based on whether or not all the kernels are `idle`. |

### Culling Modifications

Instead of making a GET request to a Notebook's `/api/status` endpoint, the notebook controller will now use the `LAST_ACTIVITY_ANNOTATION` of the respective CR. 

### Local Development and Testing

We introduce a new ENV Var named `DEV`. If we set its value to "true" then our controller will be able to access the services and the corresponding `/api/kernels` endpoint from our localhost:
```
http://localhost:8001/api/v1/namespaces/{ns}/services/{name}:{port-name}/proxy/{path}
```
 

To enable this functionality the developers must have first set properly their `kubectl proxy`-ing with:

```
kubectl proxy
```
and enforce the number of notebook controller replicas to zero:
```
kubectl edit deployment notebook-controller-deployment -n=kubeflow
```


## Upgrade Notes

For users already using the current culling feature, they should be aware of the following ENV Var name changes:

### IDLE_TIME

The `IDLE_TIME` has been **renamed** to `CULL_IDLE_TIME`. If a Notebook's `LAST_ACTIVITY_ANNOTATION` from the current timestamp exceeds this value then the Notebook will be scaled to zero (culled). `ENABLE_CULLING` must be set to "true" for  this setting to take effect. The default value of this variable is still "1440" minutes. So when the users want to change this value they should switch from setting the value of the `IDLE_TIME` to setting the value of the `CULL_IDLE_TIME`. For example:

   **Old approach**
   ```
   $ export ENABLE_CULLING=true
   $ export IDLE_TIME=360
   ```
   **New approach**
   ```
   $ export ENABLE_CULLING=true
   $ export CULL_IDLE_TIME=360
   ```

### CULLING_CHECK_PERIOD

The `CULLING_CHECK_PERIOD` has been **renamed** to `IDLENESS_CHECK_PERIOD`. This variable determines how frequently the controller should poll each Notebook. Every polling now leads to an update of the `LAST_ACTIVITY_ANNOTATION` of each   Notebook. The default value is "1" minute. If the user wants to change this period then:

   **Old approach**
   ```
   $ export CULLING_CHECK_PERIOD=3 
   ```
   **New approach**
   ```
   $ export IDLENESS_CHECK_PERIOD=3
   ```

## Alternative Considered Approaches

Initially, we wanted to use the `/api/status` endpoint of each Notebook Server, since it got updated both when:
1. An http request would hit the server, aside from this endpoint
2. A kernel's state would change, i.e. from `idle` to `busy`

The problem with this approach is when a Notebook has kernels running long computations and no opened browsers are connected. In this case, the kernels would remain in `busy` state for hours and not update the `/api/status`. Also no http requests would be made, so the `/api/status` would remain the same. But this is incorrect, since the Notebook is active and performs computations.

To tackle this we extended the controller to also check the `/api/kernels` endpoint, to detect `busy` kernels. But requests to `/api/kernels` were counting as http traffic and thus updating the `/api/status`.

Because of the above we ended up only checking kernel activity via the `/api/kernels` endpoint.

Ideally we would like a mechanism that tracks:
1. **Users'** http requests
2. Kernels state

## Future Improvements

* Expose idleness information for VSCode and RStudio notebooks
* Consider http, and user browser activity, when calculating a notebook's idleness timestamp
* Move the idleness timestamp from an annotation to the CR's status
