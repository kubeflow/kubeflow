# Show objects from all namespaces

**Authors:** Kimonas Sotirchos kimwnasptd@arrikto.com, Chris Pavlou cspavlou@arrkto.com

## Motivation

We've heard feedback from users that they wanted to be able to view, sort and filter objects from all the namespaces they had access to and not just from one at a time. This would help them have an overview of the whole state of their objects.

This is also reinforces the point that an admin is just a user with more permissions and the whole platform picks up this info from K8s. An admin can be a persona having access to all user namespaces and the apps will allow them to view and manipulate objects from all namespaces.

The apps won't need to have a distinct, admin, page for exposing the state of the objects. This can be achieved via adding permissions to users with our existing mechanisms (Profiles, RoleBindings etc).

## Goals
* Extend the CentralDashboard to
    * allow users to select `All namespaces` in the dropdown
    * pass the list of namespaces to the underlying apps, via the [shared library](https://github.com/kubeflow/kubeflow/blob/7f4231de77eaaa2029112f950eea0245de8d3ef9/components/centraldashboard/public/library.js)
* Extend the common code of the web apps to handle the all-namespaces info from the dashboard
* Extend the Jupyter, TensorBoards and Volumes apps to show objects from all namespaces

## Non-Goals
* Change how users are added to other namespaces
* Change how the CentralDashboard shows the namespaces in the dropdown, aside from the new `All namespaces` option
* Change the backend mechanism for fetching/returning the data in the underlying apps
* Extend all the Kubeflow web apps in one go for this functionality

## Proposal

### Implementation Details

This feature is devided in two parts. The first one is to extend the CentralDashboard to have an extra option, in the namespace dropdown, for `All namespaces` and passing this information to the iframed web app. The second part is how the iframed web apps can pick up this change and handle it accordingly. The information passing between the CentralDashboard and the apps will be exclusively handled by the [shared library](https://github.com/kubeflow/kubeflow/blob/7f4231de77eaaa2029112f950eea0245de8d3ef9/components/centraldashboard/public/library.js).

As mentioned above we want to adopt this mechanism gradually. Initially the CentralDashboard will only allow users to select the `All namespaces` option only for the selected apps that will support this. This will be the Jupyter, TensorBoards and Volumes apps.

We can add more of the KF apps gradually afterwards, once we extend them to support this functionality.

#### CentralDashboard

First off, the information about which namespaces a user has access to is already present in the CentralDashboard. It is always acquired via the [`api/workgroup/env-info`](https://github.com/kubeflow/kubeflow/blob/7f4231de77eaaa2029112f950eea0245de8d3ef9/components/centraldashboard/app/server.ts#L70) call, that queries KFAM. So we don't need to make any extra calls, as we already have the list of user-accessible namespaces in the frontend.

The first design option is how the CentralDashboard should emit this list of namespaces to the underlying apps.

We decided to introduce a new `all-namespaces` event for the shared library, send to the iframed app via [`iframe.contentWindow.postMessage(..)`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow), containing all the namespaces. This will ensure that apps using the library will not get affected out of the box. The apps that want to adopt this new functionality will need to add extra logic for handling this new info.

This `all-namespaces` event will be abstracted away from the shared library, via the new `onAllNamespacesSelected` function. This function will work exactly like the existing [`onNamespaceSelected`](https://github.com/kubeflow/kubeflow/blob/7f4231de77eaaa2029112f950eea0245de8d3ef9/components/centraldashboard/public/library.js#L80-L90), with only difference that it will be used for passing a list namespaces.

#### Iframed web apps

From the iframed apps side we'll need to extend how they interact with the shared library, that exposes the all namespaces information.

Specifically the apps, that want to adopt this functionality, will need to [attach](https://github.com/kubeflow/kubeflow/blob/7f4231de77eaaa2029112f950eea0245de8d3ef9/components/crud-web-apps/common/frontend/kubeflow-common-lib/projects/kubeflow/src/lib/services/namespace.service.ts#L39) a handler function to the new `onAllNamespacesSelected` function of the shared library.

The Jupyter, TensorBoard and Volumes apps will be polling for the list of objects for each of those namespaces.

### API Changes

| Component | Route | Description |
| --- | --- | --- |
| [shared library](https://github.com/kubeflow/kubeflow/blob/7f4231de77eaaa2029112f950eea0245de8d3ef9/components/centraldashboard/public/library.js) | `onAllNamespacesSelected(namespaces: string[])` | Handler for underlying apps to override. The shared library triggers this whenever `All namespaces` is selected |

Apps that were using the `onNamespaceSelected` will not be affected at all, since that handler won't change at all.

### UI Changes

#### Delete button
When selecting `All namespaces` the web apps should disable the option to create a new object, while that option is selected. If a user would like to create an object (Notebook, PVC, TensorBoard etc) they should first select a namespace.

#### Namespace column
Once the user selects `All namespaces` the web apps will need to expose the namespace information for each object. Otherwise it will be confusing if an object with the same name exists in multiple namespaces.

To tackle this the web apps adopting this feature will need to dynamically show a `Namespace` column when the user selects `All namespaces`.
