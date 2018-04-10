# TODO

A list of things to do before we share outside the company.

* [ ] Finish making the README useful. (Incorportae Joe's suggestions.)
  * [ ] Explicitly declare the goals of the project, and add a roadmap that articulates how we are (currently) planning on accomplishing them.
  * [ ] Create a specific "how to use" section for (_e.g._) the GitLab folks.
* [x] Create compelling "Hello World" example.
* [ ] Move to a constructor-based paradigm. (_e.g._,
  `container.New(...) + container.Ports(...)`.)
  * This should be both more familiar to developers, and also enables
    us to do things like verify that we're `+`'ing components together
    that make sense.
* [ ] Add some rudimentary type checking for the `+` operator.
  (_e.g._, we should error if you try to add a `conatiner` to a
  `deployment`, or something.)
* [ ] Add the ability to add a container to the containers list.
  (_e.g._, `pod.Container(...) + pod.Container(...)` vs
  `pod.Container([...])`.)
* [ ] Move from `kube.v1` -> `kube.core.v1`.
