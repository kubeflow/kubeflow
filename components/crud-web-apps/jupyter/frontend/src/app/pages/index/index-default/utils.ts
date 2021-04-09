import { NotebookProcessedObject } from 'src/app/types';

export function parseServerType(nb: NotebookProcessedObject) {
  if (!nb.serverType) {
    return '';
  }

  if (nb.serverType === 'jupyter') {
    return 'Jupyter';
  }

  if (nb.serverType === 'vscode') {
    return 'VSCode';
  }

  if (nb.serverType === 'rstudio') {
    return 'RStudio';
  }
}
