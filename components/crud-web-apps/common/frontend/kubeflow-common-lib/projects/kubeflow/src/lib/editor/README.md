## Use Editor component

In order to use the editor component in one of our web apps, you need to do the following:

- Import it from the Kubeflow common code
- Add monaco-editor package to the web app (`npm install monaco-editor --save`)
- Add the following code to the web app's `angular.json`:

```
            "assets": [
              ...
              {
                "glob": "**/*",
                "input": "node_modules/monaco-editor",
                "output": "assets/monaco-editor"
              }
            ],
```

### Test a component using the editor

In order to run unit tests for a component that uses the editor,you need to edit your `karma.conf.js` file and add the following:

```
    files: [
      {
        pattern: 'node_modules/monaco-editor/**',
        watched: false,
        included: false,
        served: true,
      },
      {
        pattern: 'src/assets/**',
        watched: false,
        included: false,
        served: true,
      },
    ],
    proxies: {
      '/static/assets/monaco-editor/': '/base/node_modules/monaco-editor/',
      '/static/assets/': '/base/src/assets/',
    },
```

This will ensure that all neccessary files are loaded during tests.

## Monaco.ts

The file specifies the API of the editor and its content was copied from https://github.com/microsoft/monaco-editor/blob/v0.32.0/website/typedoc/monaco.d.ts.

### Update

In case you need to update the editor's API to a newer version, follow these steps:

- Select a new tag in from the repo https://github.com/microsoft/monaco-editor/blob/main/website/typedoc/monaco.d.ts
- Update the README to reference the new tag and link
- Copy the contents of the `monaco.d.ts` file into `monaco.ts`, replacing its previous content.
