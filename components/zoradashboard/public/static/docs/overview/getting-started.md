---
title: Getting Started
---

# Getting Started

Before proceeding, you'll need to have the last stable [NodeJS](https://nodejs.org/en/)
and [npm](https://www.npmjs.com)
installed on your machine.

You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or
[nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to
switch Node versions between different projects.

## Install dependencies

Open the project folder and install its dependencies. You can use any package manager you
want: [Yarn](https://yarnpkg.com)
or [npm](https://www.npmjs.com). There might be other package managers that were not listed here.

```shell
cd project-folder
npm install
```

## Start development server

Once the installation is done, you can now run your app by running `npm start` or `yarn start`.

```shell
npm start
```

You will see something similar to:

```shell
Compiled successfully!

You can now view carpatin-retail-dashboard in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

This runs the app in development mode. Open [localhost:3000](http://localhost:3000) to view it in
the browser.

While in development mode, the page will automatically reload if you make changes to the code.
Should you have any, you will see the build errors and lint warnings in the console.

The app uses `ESLint`, so you will get detailed warnings and errors as well as best practice hints.

## Build project files

```shell
npm run build
```

or `yarn build`

Builds the app for production to the build folder. It correctly bundles React in production mode and
optimizes the build for the best performance.

The build is minified, and the filenames include hashes.

If you have made your necessary changes, by this time, your app should ready to be deployed.

> Please keep in mind that this project **_does not_** handle any backend logic nor databases; it is just a frontend you can use
> it with any backend you want. This means that you will have to build such a backend or use any existing one you might
> already have.
