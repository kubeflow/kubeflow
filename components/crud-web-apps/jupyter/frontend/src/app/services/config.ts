import { DialogConfig } from 'kubeflow';

// --- Configs for the Confirm Dialogs ---
export function getDeleteDialogConfig(name: string): DialogConfig {
  return {
    title: $localize`Are you sure you want to delete this notebook server? ${name}`,
    message: $localize`Warning: Your data might be lost if the notebook server
                       is not backed by persistent storage`,
    accept: $localize`DELETE`,
    confirmColor: 'warn',
    cancel: $localize`CANCEL`,
    error: '',
    applying: $localize`DELETING`,
    width: '600px',
  };
}

export function getStopDialogConfig(name: string): DialogConfig {
  return {
    title: $localize`Are you sure you want to stop this notebook server? ${name}`,
    message: $localize`Warning: Your data might be lost if the notebook server
                       is not backed by persistent storage.`,
    accept: $localize`STOP`,
    confirmColor: 'primary',
    cancel: $localize`CANCEL`,
    error: '',
    applying: $localize`STOPPING`,
    width: '600px',
  };
}

/* Lance - begin 20240906 */
export function getDisableTemplateDialogConfig(name: string): DialogConfig {
  return {
    title: $localize`Are you sure you want to disable this notebook ${name} as template?`,
    message: $localize`Warning: The notebook will be invisible after 
                       entering new notebook.`,
    accept: $localize`DISABLE`,
    confirmColor: 'primary',
    cancel: $localize`CANCEL`,
    error: '',
    applying: $localize`DISABLING`,
    width: '600px',
  };
}
/* Lance - end 20240906 */