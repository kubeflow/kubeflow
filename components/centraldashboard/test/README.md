# Kubeflow End-to-End Testing
This folder contains all the end-to-end tests for Kubeflow Central-Dashboard

## How it works
The goal of the test in [`e2e.test.ts`](./e2e.test.ts) is to run through the IAP flow with a successful first time registration. Steps:
- Environmental Dependencies:
  - `'KF_HOST'`, `'CLIENT_ID'`, `'SERVICE_ACCOUNT_EMAIL'`, `'SERVICE_ACCOUNT_KEY'`
- Launch Browser (with Puppeteer), fetch auth tokens, enforce headers, and navigate to `KF_HOST`
- Validate HTML Contents before proceeding with the test:
  - This step allows us to pass IAP, or server errors to the user in clear text, rather than having it buried under some exception
- Wait for polymer to kick in and render the page
- Validate that a registration flow component was generated
  - If not the server is either in an invalid setup (`isolationMode: single-user`) or there has already been a binding created for this user
  - If the case is the latter, you can temporarily swap the test case inside this file that is labelled as **`xit()`** (ignore this case) to **`fit()`** (run **only** this test case). This will clear out test remnants from the server.
- Proceed with the registration flow, validate that the namespace matches the `SERVICE_ACCOUNT_EMAIL`'s ldap when we finish the flow
- Clear the profile binding we just created and end the test

## Running
### Setup
As with all node projects, if you've never run or setup central-dashboard, or recently updated it, then please run at CDash Root:
```shell
npm i
```

### Invoke Test
From the CDash Root level, run:
```shell
npm run test-e2e
```

## Developer

### Stacks
The test suite is built with the combination of ***NodeJS***, ***Puppeteer***, and ***Jasmine***.

Stack | Description
--- | ---
| [NodeJS](https://nodejs.org/en/) | Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
| [Puppeteer](https://pptr.dev/) | A chrome based test-driving framework (maintained by the Google Chrome team)
| [Jasmine](https://jasmine.github.io/) | Jasmine is a behavior-driven development framework for testing JavaScript code

### Open Questions:
- > How is puppeteer different from selenium?
  - Puppeteer is faster than selenium
  - It only supports Google Chrome (unlike Selenium)
  - Maintained directly by Google Chrome team
- > What does this mean in terms of requirements for a container that is running puppeter? Do we have to have chrome installed?
  - Nope! Runs out of the box ![image](https://user-images.githubusercontent.com/5303018/74990269-b7914580-53f7-11ea-8620-f367b1aaf9ab.png)