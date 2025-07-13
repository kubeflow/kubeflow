import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JWABackendService } from '../../../../services/backend.service';
import { NamespaceService } from 'kubeflow';

export interface GPUCullingPolicy {
  source: 'notebook' | 'profile' | 'cluster' | 'default';
  enabled: boolean;
  mode: 'gpu-only' | 'gpu-priority' | 'time-priority' | 'disabled';
  memoryThreshold: number;
  computeThreshold: number;
  kernelTimeout: string;
  sustainedDuration: string;
}

export interface GPUMetrics {
  namespace: string;
  name: string;
  devices: GPUDeviceMetrics[];
  timestamp: Date;
  hasGPUResources: boolean;
}

export interface GPUDeviceMetrics {
  deviceUUID: string;
  virtualDeviceID: string;
  containerName: string;
  memoryUsage: {
    usedBytes: number;
    limitBytes: number;
    utilizationPercentage: number;
  };
  computeUtilization: {
    utilizationPercentage: number;
  };
  secondsSinceLastKernel: number;
}

@Component({
  selector: 'app-form-gpu-culling',
  templateUrl: './form-gpu-culling.component.html',
  styleUrls: ['./form-gpu-culling.component.scss'],
})
export class FormGPUCullingComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;
  @Input() readonly = false;

  effectiveGPUPolicy: GPUCullingPolicy | null = null;
  gpuMetrics: GPUMetrics | null = null;
  hasGPUResources = false;
  showGPUWarning = false;
  subscriptions = new Subscription();

  constructor(
    private backend: JWABackendService,
    private ns: NamespaceService,
  ) {}

  ngOnInit() {
    // Watch for GPU resource changes
    this.watchGPUResources();

    // Load effective GPU culling policy for the current namespace
    this.loadEffectiveGPUPolicy();

    // Watch for form changes to update policy display
    const formSub = this.parentForm.get('gpuCulling')?.valueChanges.subscribe(() => {
      this.updateGPUPolicyDisplay();
    });
    if (formSub) {
      this.subscriptions.add(formSub);
    }

    // Watch for namespace changes
    const nsSub = this.ns.getSelectedNamespace().subscribe(() => {
      this.loadEffectiveGPUPolicy();
      this.loadGPUMetrics();
    });
    this.subscriptions.add(nsSub);

    // Load current GPU metrics if available
    this.loadGPUMetrics();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private watchGPUResources() {
    // Watch for changes in GPU allocation
    const gpuSub = this.parentForm.get('gpus')?.valueChanges.subscribe((gpuConfig) => {
      this.hasGPUResources = gpuConfig?.num && gpuConfig.num !== 'none';
      this.showGPUWarning = !this.hasGPUResources;
      
      if (!this.hasGPUResources) {
        // Disable GPU culling if no GPU resources
        this.parentForm.get('gpuCulling.enabled')?.setValue(false);
      }
    });
    
    if (gpuSub) {
      this.subscriptions.add(gpuSub);
    }

    // Check initial GPU state
    const initialGPU = this.parentForm.get('gpus')?.value;
    this.hasGPUResources = initialGPU?.num && initialGPU.num !== 'none';
    this.showGPUWarning = !this.hasGPUResources;
  }

  private loadEffectiveGPUPolicy() {
    // Get current namespace
    this.ns.getSelectedNamespace().subscribe(namespace => {
      if (Array.isArray(namespace)) {
        return; // Skip if multiple namespaces selected
      }

      // Load effective GPU culling policy from backend
      this.backend.getGPUCullingPolicy(namespace).subscribe(
        policy => {
          this.effectiveGPUPolicy = policy;
          this.updateGPUPolicyDisplay();
        },
        error => {
          console.warn('Could not load GPU culling policy:', error);
          // Set default policy if none found
          this.effectiveGPUPolicy = {
            source: 'default',
            enabled: true,
            mode: 'gpu-priority',
            memoryThreshold: 10,
            computeThreshold: 5,
            kernelTimeout: '5m',
            sustainedDuration: '10m'
          };
        }
      );
    });
  }

  private loadGPUMetrics() {
    if (!this.hasGPUResources) {
      return;
    }

    // Get current namespace and notebook name
    this.ns.getSelectedNamespace().subscribe(namespace => {
      if (Array.isArray(namespace)) {
        return;
      }

      const notebookName = this.parentForm.get('name')?.value;
      if (!notebookName) {
        return;
      }

      // Load current GPU metrics for preview
      this.backend.getGPUMetrics(namespace, notebookName).subscribe(
        metrics => {
          this.gpuMetrics = metrics;
        },
        error => {
          console.warn('Could not load GPU metrics:', error);
          this.gpuMetrics = null;
        }
      );
    });
  }

  private updateGPUPolicyDisplay() {
    // Update the effective GPU policy display based on current form values
    if (!this.effectiveGPUPolicy) {
      return;
    }

    const gpuCullingForm = this.parentForm.get('gpuCulling');
    if (gpuCullingForm?.get('enabled')?.value) {
      // If user has enabled GPU culling, show what the effective policy will be
      const memoryThreshold = gpuCullingForm.get('memoryThreshold')?.value || 10;
      const computeThreshold = gpuCullingForm.get('computeThreshold')?.value || 5;
      const kernelTimeoutValue = gpuCullingForm.get('kernelTimeoutValue')?.value || 5;
      const kernelTimeoutUnit = gpuCullingForm.get('kernelTimeoutUnit')?.value || 'minutes';
      const sustainedDurationValue = gpuCullingForm.get('sustainedDurationValue')?.value || 10;
      const sustainedDurationUnit = gpuCullingForm.get('sustainedDurationUnit')?.value || 'minutes';
      const mode = gpuCullingForm.get('mode')?.value || 'gpu-priority';

      this.effectiveGPUPolicy = {
        ...this.effectiveGPUPolicy,
        source: 'notebook',
        enabled: true,
        mode: mode,
        memoryThreshold: memoryThreshold,
        computeThreshold: computeThreshold,
        kernelTimeout: this.formatDuration(kernelTimeoutValue, kernelTimeoutUnit),
        sustainedDuration: this.formatDuration(sustainedDurationValue, sustainedDurationUnit)
      };
    }
  }

  private formatDuration(value: number, unit: string): string {
    const unitMap = {
      'minutes': 'm',
      'hours': 'h',
      'days': 'd'
    };
    return `${value}${unitMap[unit] || 'm'}`;
  }

  // UI Helper Methods
  getUsageClass(percentage: number): string {
    if (percentage < 10) return 'usage-low';
    if (percentage < 50) return 'usage-medium';
    return 'usage-high';
  }

  getLastKernelText(seconds: number): string {
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  }

  // Validation helpers
  hasValidationErrors(): boolean {
    const gpuCullingForm = this.parentForm.get('gpuCulling');
    return gpuCullingForm?.invalid && gpuCullingForm?.touched;
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];
    const gpuCullingForm = this.parentForm.get('gpuCulling');

    if (!gpuCullingForm || !gpuCullingForm.errors) {
      return errors;
    }

    // Add individual field errors
    const memoryThreshold = gpuCullingForm.get('memoryThreshold');
    if (memoryThreshold?.hasError('required')) {
      errors.push('GPU memory threshold is required');
    }
    if (memoryThreshold?.hasError('min')) {
      errors.push('GPU memory threshold must be at least 1%');
    }
    if (memoryThreshold?.hasError('max')) {
      errors.push('GPU memory threshold cannot exceed 100%');
    }

    const computeThreshold = gpuCullingForm.get('computeThreshold');
    if (computeThreshold?.hasError('required')) {
      errors.push('GPU compute threshold is required');
    }
    if (computeThreshold?.hasError('min')) {
      errors.push('GPU compute threshold must be at least 1%');
    }
    if (computeThreshold?.hasError('max')) {
      errors.push('GPU compute threshold cannot exceed 100%');
    }

    const kernelTimeoutValue = gpuCullingForm.get('kernelTimeoutValue');
    if (kernelTimeoutValue?.hasError('required')) {
      errors.push('GPU kernel timeout is required');
    }
    if (kernelTimeoutValue?.hasError('min')) {
      errors.push('GPU kernel timeout must be at least 1');
    }

    const sustainedDurationValue = gpuCullingForm.get('sustainedDurationValue');
    if (sustainedDurationValue?.hasError('required')) {
      errors.push('Sustained duration is required');
    }
    if (sustainedDurationValue?.hasError('min')) {
      errors.push('Sustained duration must be at least 1');
    }

    return errors;
  }

  // Helper to get the final GPU culling configuration for form submission
  getGPUCullingConfiguration(): any {
    const gpuCullingForm = this.parentForm.get('gpuCulling');

    if (!gpuCullingForm?.get('enabled')?.value || !this.hasGPUResources) {
      return null; // No GPU culling configuration if disabled or no GPU resources
    }

    // Check if form is valid before returning configuration
    if (gpuCullingForm.invalid) {
      throw new Error('Cannot get GPU culling configuration: form has validation errors');
    }

    const memoryThreshold = gpuCullingForm.get('memoryThreshold')?.value;
    const computeThreshold = gpuCullingForm.get('computeThreshold')?.value;
    const kernelTimeoutValue = gpuCullingForm.get('kernelTimeoutValue')?.value;
    const kernelTimeoutUnit = gpuCullingForm.get('kernelTimeoutUnit')?.value;
    const sustainedDurationValue = gpuCullingForm.get('sustainedDurationValue')?.value;
    const sustainedDurationUnit = gpuCullingForm.get('sustainedDurationUnit')?.value;
    const mode = gpuCullingForm.get('mode')?.value;

    return {
      enabled: true,
      mode: mode,
      memoryThreshold: memoryThreshold,
      computeThreshold: computeThreshold,
      kernelTimeout: this.formatDuration(kernelTimeoutValue, kernelTimeoutUnit),
      sustainedDuration: this.formatDuration(sustainedDurationValue, sustainedDurationUnit)
    };
  }
}
