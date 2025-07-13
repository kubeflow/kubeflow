import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { GPU, Config } from 'src/app/types';
import { getNameSyncValidators, getNameAsyncValidators } from 'kubeflow';
import { createFormGroupFromVolume } from 'src/app/shared/utils/volumes';

export function getFormDefaults(): FormGroup {
  const fb = new FormBuilder();

  return fb.group({
    name: ['', [Validators.required]],
    namespace: ['', [Validators.required]],
    image: ['', [Validators.required]],
    imageGroupOne: ['', [Validators.required]],
    imageGroupTwo: ['', [Validators.required]],
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
      fractional: ['', []],
      fractionalType: ['none', []],
      fractionalMemory: ['', []],
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
              storage: ['5Gi'],
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
    culling: fb.group({
      enabled: [false, []],
      idleTimeValue: [5, [Validators.required, Validators.min(1), Validators.max(365)]],
      idleTimeUnit: ['minutes', [Validators.required]],
      checkPeriodValue: [1, [Validators.min(1), Validators.max(60)]],
      checkPeriodUnit: ['minutes', [Validators.required]],
      exempt: [false, []],
    }, { validators: [cullingTimeValidator] }),
    gpuCulling: fb.group({
      enabled: [false, []],
      mode: ['gpu-priority', [Validators.required]],
      memoryThreshold: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
      computeThreshold: [5, [Validators.required, Validators.min(1), Validators.max(100)]],
      kernelTimeoutValue: [5, [Validators.required, Validators.min(1)]],
      kernelTimeoutUnit: ['minutes', [Validators.required]],
      sustainedDurationValue: [10, [Validators.required, Validators.min(1)]],
      sustainedDurationUnit: ['minutes', [Validators.required]],
    }, { validators: [gpuCullingValidator] }),
  });
}

// Custom validator for culling time settings
export function cullingTimeValidator(group: AbstractControl): ValidationErrors | null {
  if (!group || !group.get) {
    return null;
  }

  const enabled = group.get('enabled')?.value;
  if (!enabled) {
    return null; // Skip validation if culling is disabled
  }

  const idleTimeValue = group.get('idleTimeValue')?.value;
  const idleTimeUnit = group.get('idleTimeUnit')?.value;
  const checkPeriodValue = group.get('checkPeriodValue')?.value;
  const checkPeriodUnit = group.get('checkPeriodUnit')?.value;

  // Convert to minutes for comparison
  const idleTimeMinutes = convertToMinutes(idleTimeValue, idleTimeUnit);
  const checkPeriodMinutes = convertToMinutes(checkPeriodValue, checkPeriodUnit);

  const errors: ValidationErrors = {};

  // Check period should be less than idle time
  if (checkPeriodMinutes >= idleTimeMinutes) {
    errors['checkPeriodTooLarge'] = {
      message: 'Check period must be less than idle timeout'
    };
  }

  // Minimum idle time should be at least 1 minute
  if (idleTimeMinutes < 1) {
    errors['idleTimeTooSmall'] = {
      message: 'Idle timeout must be at least 1 minute'
    };
  }

  // Maximum idle time should not exceed 30 days
  if (idleTimeMinutes > 43200) { // 30 days in minutes
    errors['idleTimeTooLarge'] = {
      message: 'Idle timeout cannot exceed 30 days'
    };
  }

  // Check period should be reasonable (between 1 minute and 24 hours)
  if (checkPeriodMinutes < 1 || checkPeriodMinutes > 1440) {
    errors['checkPeriodInvalid'] = {
      message: 'Check period must be between 1 minute and 24 hours'
    };
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

// Custom validator for GPU culling settings
export function gpuCullingValidator(group: AbstractControl): ValidationErrors | null {
  if (!group || !group.get) {
    return null;
  }

  const enabled = group.get('enabled')?.value;
  if (!enabled) {
    return null; // Skip validation if GPU culling is disabled
  }

  const memoryThreshold = group.get('memoryThreshold')?.value;
  const computeThreshold = group.get('computeThreshold')?.value;
  const kernelTimeoutValue = group.get('kernelTimeoutValue')?.value;
  const sustainedDurationValue = group.get('sustainedDurationValue')?.value;

  const errors: ValidationErrors = {};

  // Validate thresholds are reasonable
  if (memoryThreshold && computeThreshold) {
    if (memoryThreshold < computeThreshold) {
      errors['memoryLowerThanCompute'] = {
        message: 'Memory threshold should typically be higher than compute threshold'
      };
    }
  }

  // Validate sustained duration is longer than kernel timeout
  if (kernelTimeoutValue && sustainedDurationValue) {
    const kernelTimeoutUnit = group.get('kernelTimeoutUnit')?.value || 'minutes';
    const sustainedDurationUnit = group.get('sustainedDurationUnit')?.value || 'minutes';

    const kernelTimeoutMinutes = convertToMinutes(kernelTimeoutValue, kernelTimeoutUnit);
    const sustainedDurationMinutes = convertToMinutes(sustainedDurationValue, sustainedDurationUnit);

    if (sustainedDurationMinutes <= kernelTimeoutMinutes) {
      errors['sustainedDurationTooShort'] = {
        message: 'Sustained duration must be longer than kernel timeout'
      };
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

function convertToMinutes(value: number, unit: string): number {
  switch (unit) {
    case 'minutes': return value;
    case 'hours': return value * 60;
    case 'days': return value * 60 * 24;
    default: return value;
  }
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
  
  // Set fractional values if they exist
  if (gpu.fractional) {
    formCtrl.get('fractional').setValue(gpu.fractional);
    formCtrl.get('fractionalType').setValue('fraction');
  } else if (gpu.fractionalMemory) {
    formCtrl.get('fractionalMemory').setValue(gpu.fractionalMemory);
    formCtrl.get('fractionalType').setValue('memory');
  } else {
    formCtrl.get('fractional').setValue('');
    formCtrl.get('fractionalMemory').setValue('');
    formCtrl.get('fractionalType').setValue('none');
  }
  // Don't allow the user to edit them if the admin does not allow it
  if (gpuConf.readOnly) {
    formCtrl.get('num').disable();
    formCtrl.get('vendor').disable();
    formCtrl.get('fractional').disable();
    formCtrl.get('fractionalType').disable();
    formCtrl.get('fractionalMemory').disable();
  }
}

export function calculateLimits(
  requests: number | string,
  factor: number | string,
): string | null {
  const limit = configSizeToNumber(requests) * configSizeToNumber(factor);

  if (isNaN(limit)) {
    return null;
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
  }

  formCtrl.controls.cpuLimit.setValue(
    calculateLimits(cpu, config.cpu.limitFactor),
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
  }

  formCtrl.controls.memoryLimit.setValue(
    calculateLimits(memory, config.memory.limitFactor),
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

  // Culling configuration
  if (config.culling?.value) {
    const cullingGroup = formCtrl.get('culling') as FormGroup;
    cullingGroup.get('enabled').setValue(config.culling.value.enabled || false);

    // Parse idle timeout (e.g., "5m", "2h", "1d")
    const idleTimeout = config.culling.value.idleTimeout || "5m";
    const idleMatch = idleTimeout.match(/^(\d+)([mhd])$/);
    if (idleMatch) {
      cullingGroup.get('idleTimeValue').setValue(parseInt(idleMatch[1]));
      const unitMap = { 'm': 'minutes', 'h': 'hours', 'd': 'days' };
      cullingGroup.get('idleTimeUnit').setValue(unitMap[idleMatch[2]] || 'minutes');
    }

    // Parse check period
    const checkPeriod = config.culling.value.checkPeriod || "1m";
    const checkMatch = checkPeriod.match(/^(\d+)([mh])$/);
    if (checkMatch) {
      cullingGroup.get('checkPeriodValue').setValue(parseInt(checkMatch[1]));
      const unitMap = { 'm': 'minutes', 'h': 'hours' };
      cullingGroup.get('checkPeriodUnit').setValue(unitMap[checkMatch[2]] || 'minutes');
    }

    cullingGroup.get('exempt').setValue(config.culling.value.exempt || false);

    if (config.culling.readOnly) {
      cullingGroup.disable();
    }
  }

  // GPU Culling configuration
  if (config.gpuCulling?.value) {
    const gpuCullingGroup = formCtrl.get('gpuCulling') as FormGroup;
    gpuCullingGroup.get('enabled').setValue(config.gpuCulling.value.enabled || false);
    gpuCullingGroup.get('mode').setValue(config.gpuCulling.value.mode || 'gpu-priority');
    gpuCullingGroup.get('memoryThreshold').setValue(config.gpuCulling.value.memoryThreshold || 10);
    gpuCullingGroup.get('computeThreshold').setValue(config.gpuCulling.value.computeThreshold || 5);

    // Parse kernel timeout (e.g., "5m", "2h")
    const kernelTimeout = config.gpuCulling.value.kernelTimeout || "5m";
    const kernelMatch = kernelTimeout.match(/^(\d+)([mh])$/);
    if (kernelMatch) {
      gpuCullingGroup.get('kernelTimeoutValue').setValue(parseInt(kernelMatch[1]));
      const unitMap = { 'm': 'minutes', 'h': 'hours' };
      gpuCullingGroup.get('kernelTimeoutUnit').setValue(unitMap[kernelMatch[2]] || 'minutes');
    }

    // Parse sustained duration (e.g., "10m", "1h")
    const sustainedDuration = config.gpuCulling.value.sustainedDuration || "10m";
    const sustainedMatch = sustainedDuration.match(/^(\d+)([mh])$/);
    if (sustainedMatch) {
      gpuCullingGroup.get('sustainedDurationValue').setValue(parseInt(sustainedMatch[1]));
      const unitMap = { 'm': 'minutes', 'h': 'hours' };
      gpuCullingGroup.get('sustainedDurationUnit').setValue(unitMap[sustainedMatch[2]] || 'minutes');
    }

    if (config.gpuCulling.readOnly) {
      gpuCullingGroup.disable();
    }
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
