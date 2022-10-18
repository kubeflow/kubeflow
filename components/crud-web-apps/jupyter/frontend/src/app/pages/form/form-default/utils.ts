import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GPU, Config } from 'src/app/types';
import { getNameSyncValidators, getNameAsyncValidators } from 'kubeflow';
import { createFormGroupFromVolume } from 'src/app/shared/utils/volumes';

export function getFormDefaults(): FormGroup {
  const fb = new FormBuilder();

  return fb.group({
    name: ['', [Validators.required]],
    namespace: ['', [Validators.required]],
    notebookType: ['', []],
    image: ['', [Validators.required]],
    imageGroupOne: ['', []],
    imageGroupTwo: ['', []],
    allowCustomImage: [true, []],
    imagePullPolicy: ['IfNotPresent', [Validators.required]],
    customImage: ['', []],
    customImageCheck: [false, []],
    serverType: ['jupyter', [Validators.required]],
    cpu: [1, [Validators.required]],
    cpuLimit: ['', []],
    memory: [1, [Validators.required]],
    memoryLimit: ['', []],
    gpus: fb.group({
      vendor: ['', []],
      num: ['', []],
    }),
    workspace: fb.group({
      mount: ['/home/jovyan', [Validators.required]],
      newPvc: fb.group({
        metadata: fb.group({
          name: ['{notebook-name}-volume', [Validators.required]],
        }),
        spec: fb.group({
          accessModes: [['ReadWriteOnce']],
          resources: fb.group({
            requests: fb.group({
              storage: ['10Gi'],
            }),
          }),
        }),
      }),
    }),
    affinityConfig: ['', []],
    tolerationGroup: ['', []],
    datavols: fb.array([]),
    shm: [true, []],
    configurations: [[], []],
  });
}

export function updateGPUControl(formCtrl: FormGroup, gpuConf: any) {
  // If the backend didn't send the value, default to none
  if (gpuConf == null) {
    formCtrl.get('num').setValue('none');
    return;
  }

  // Set the values
  const gpu = gpuConf.value as GPU;
  formCtrl.get('num').setValue(gpu.num);
  formCtrl.get('vendor').setValue(gpu.vendor);

  // Don't allow the user to edit them if the admin does not allow it
  if (gpuConf.readOnly) {
    formCtrl.get('num').disable();
    formCtrl.get('vendor').disable();
  }
}

export function calculateLimits(
  requests: number | string,
  factor: number | string,
  max: number | string | null
): string | null {
  let limit = configSizeToNumber(requests) * configSizeToNumber(factor);

  if (isNaN(limit)) {
    return null;
  }

  const maxAsNum = configSizeToNumber(max);
  if (maxAsNum) {
    // Max is clamp on what the calculated limit can be
    limit = Math.min(limit, maxAsNum);
  }
  return limit.toFixed(1);
}

export function initCpuFormControls(formCtrl: FormGroup, config: Config) {
  const cpu = Number(config.cpu.value);
  if (!isNaN(cpu)) {
    formCtrl.controls.cpu.setValue(cpu);
  }

  if (config.cpu.readOnly) {
    formCtrl.controls.cpu.disable();
    formCtrl.controls.cpuLimit.disable();
  } else {
    if (config.cpu.max) {
      formCtrl.controls.cpu.setValidators([Validators.required, Validators.max(config.cpu.max)]);
      formCtrl.controls.cpuLimit.setValidators([Validators.max(config.cpu.max)]);
    } else {
      formCtrl.controls.cpu.setValidators([Validators.required]);
      formCtrl.controls.cpuLimit.clearValidators();
    }
  }

  formCtrl.controls.cpuLimit.setValue(
    calculateLimits(cpu, config.cpu.limitFactor, config.cpu.max),
  );
}

export function initMemoryFormControls(formCtrl: FormGroup, config: Config) {
  const memory = configSizeToNumber(config.memory.value);
  if (!isNaN(memory)) {
    formCtrl.controls.memory.setValue(memory);
  }

  if (config.memory.readOnly) {
    formCtrl.controls.memory.disable();
    formCtrl.controls.memoryLimit.disable();
  } else {
    if (config.memory.maxGi) {
      formCtrl.controls.memory.setValidators([
        Validators.required, Validators.max(config.memory.maxGi)]);
      formCtrl.controls.memoryLimit.setValidators([Validators.max(config.memory.maxGi)]);
    } else {
      formCtrl.controls.memory.setValidators([Validators.required]);
      formCtrl.controls.memoryLimit.clearValidators();
    }
  }

  formCtrl.controls.memoryLimit.setValue(
    calculateLimits(memory, config.memory.limitFactor, config.memory.maxGi),
  );
}

export function initFormControls(formCtrl: FormGroup, config: Config) {
  initCpuFormControls(formCtrl, config);

  initMemoryFormControls(formCtrl, config);

  formCtrl.controls.image.setValue(config.image.value);

  if (config.imageGroupOne?.value) {
    formCtrl.controls.imageGroupOne.setValue(config.imageGroupOne.value);
  } else {
    formCtrl.controls.imageGroupOne.disable();
  }

  if (config.imageGroupTwo?.value) {
    formCtrl.controls.imageGroupTwo.setValue(config.imageGroupTwo.value);
  } else {
    formCtrl.controls.imageGroupTwo.disable();
  }

  formCtrl.controls.imagePullPolicy.setValue(config.imagePullPolicy.value);
  if (config.imagePullPolicy.readOnly) {
    formCtrl.controls.imagePullPolicy.disable();
  }

  // Workspace volume
  initWorkspaceVolumeControl(formCtrl, config);

  // Data volumes
  initDataVolumeControl(formCtrl, config);

  // Affinity
  formCtrl.controls.affinityConfig.setValue(config.affinityConfig.value);
  if (config.affinityConfig.readOnly) {
    formCtrl.controls.affinityConfig.disable();
  }

  // Tolerations
  formCtrl.controls.tolerationGroup.setValue(config.tolerationGroup.value);
  if (config.tolerationGroup.readOnly) {
    formCtrl.controls.tolerationGroup.disable();
  }

  // GPUs
  updateGPUControl(formCtrl.get('gpus') as FormGroup, config.gpus);

  formCtrl.controls.shm.setValue(config.shm.value);
  if (config.shm.readOnly) {
    formCtrl.controls.shm.disable();
  }

  // PodDefaults / Configurations. Set the pre selected labels
  formCtrl.controls.configurations.setValue(config.configurations.value);
  if (config.configurations.readOnly) {
    formCtrl.controls.configurations.disable();
  }
}

export function initWorkspaceVolumeControl(form: FormGroup, config: Config) {
  const workspace = config.workspaceVolume.value;
  if (!workspace) {
    form.get('workspace').disable();
    return;
  }

  form.setControl('workspace', createFormGroupFromVolume(workspace));
}

export function initDataVolumeControl(form: FormGroup, config: Config) {
  const datavols = config.dataVolumes.value;

  const datavolsArray = new FormArray([]);
  form.setControl('datavols', datavolsArray);

  for (const vol of datavols) {
    datavolsArray.push(createFormGroupFromVolume(vol));
  }
}

export function configSizeToNumber(size: string | number): number {
  if (size == null) {
    return NaN;
  }

  if (typeof size === 'number') {
    return size;
  }

  return Number(size.replace('Gi', ''));
}
