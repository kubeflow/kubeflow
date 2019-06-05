# Kubeflow Rotation

## Schedule
TODO: add rotation sheet

## Responsibility

1. Kubeflow-discuss email group: `kubeflow-discuss` is a public email group. Users frequently reach out on it for help. If there are user/customer messages for help on kubeflow-discuss email group that have not been answered by anyone, please do the following:
    - Take the time to read the message
    - Identify if the problem they are facing makes sense to you and you can answer it. If so, please answer.
    - If you cannot answer the question on your own, please identify the area they are having difficulty with. Gently reach out to the corresponding area expert, and inform them of the pending question.
    - If you are having trouble identifying the person, please escalate to (abhishek, jlewi).
1. Kubeflow slack channels: `#general`, `#random` sometimes gets similar questions. Please follow a procedure similar to the kubeflow-discuss and see if you can answer the question. If not, follow a process similar to above to identify someone who can answer.
1. Please go through the questions on Stack Overflow and see if you can answer a couple. Even if we get 2-3 questions answered per week, we’ll make progress.
1. Monitor Kubeflow pre-submit/post-submit tests and notice if any of the test failures are block the submission of PRs. If so, please help fix and document what you did to fix it in testing [playbook](https://github.com/kubeflow/testing/blob/master/playbook.md).
1. Pay attention to Github PRs that need reviews and either reassign to reviewers appropriately or see if you can review the PR.
1. At the end of the week send out a report (TODO: where?) using the report template which includes the following sections:
    - Any instances where you had to intervene with the Kubeflow CI Infrastructure and fix things. Please document what you did to fix.
    - Thread titles from Kubeflow-Discuss that you needed to route to specific people or answered yourself.
    - Stack Overflow questions you paid attention to. Links to those questions would be ideal.
    - Github PRs that you routed or reviewed.

Note: The goal with above report is to have sufficient context to transfer to the next on-call shift as well as provide visibility to the team. Please keep the report brief.
