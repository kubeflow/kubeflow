import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { NamespaceService } from 'kubeflow';

export interface CullingPolicy {
  source: 'notebook' | 'profile' | 'cluster' | 'default';
  enabled: boolean;
  idleTimeout: string;
  checkPeriod: string;
  exempt?: boolean;
}

@Component({
  selector: 'app-form-culling',
  templateUrl: './form-culling.component.html',
  styleUrls: ['./form-culling.component.scss'],
})
export class FormCullingComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;
  @Input() readonly = false;

  effectivePolicy: CullingPolicy | null = null;
  subscriptions = new Subscription();

  constructor(
    private backend: JWABackendService,
    private ns: NamespaceService,
  ) {}

  ngOnInit() {
    // Load effective culling policy for the current namespace
    this.loadEffectivePolicy();

    // Watch for form changes to update policy display
    const formSub = this.parentForm.get('culling').valueChanges.subscribe(() => {
      this.updatePolicyDisplay();
    });
    this.subscriptions.add(formSub);

    // Watch for namespace changes
    const nsSub = this.ns.getSelectedNamespace().subscribe(() => {
      this.loadEffectivePolicy();
    });
    this.subscriptions.add(nsSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadEffectivePolicy() {
    // Get current namespace
    this.ns.getSelectedNamespace().subscribe(namespace => {
      if (Array.isArray(namespace)) {
        return; // Skip if multiple namespaces selected
      }

      // Load effective culling policy from backend
      this.backend.getCullingPolicy(namespace).subscribe(
        policy => {
          this.effectivePolicy = policy;
          this.updatePolicyDisplay();
        },
        error => {
          console.warn('Could not load culling policy:', error);
          // Set default policy if none found
          this.effectivePolicy = {
            source: 'default',
            enabled: true,
            idleTimeout: '24h',
            checkPeriod: '1m',
            exempt: false
          };
        }
      );
    });
  }

  private updatePolicyDisplay() {
    // Update the effective policy display based on current form values
    if (!this.effectivePolicy) {
      return;
    }

    const cullingForm = this.parentForm.get('culling');
    if (cullingForm.get('enabled').value) {
      // If user has enabled culling, show what the effective policy will be
      const idleTimeValue = cullingForm.get('idleTimeValue').value || 5;
      const idleTimeUnit = cullingForm.get('idleTimeUnit').value || 'minutes';
      const checkPeriodValue = cullingForm.get('checkPeriodValue').value || 1;
      const checkPeriodUnit = cullingForm.get('checkPeriodUnit').value || 'minutes';

      this.effectivePolicy = {
        ...this.effectivePolicy,
        source: 'notebook',
        enabled: true,
        idleTimeout: this.formatDuration(idleTimeValue, idleTimeUnit),
        checkPeriod: this.formatDuration(checkPeriodValue, checkPeriodUnit),
        exempt: cullingForm.get('exempt').value || false
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

  getPolicySourceLabel(source: string): string {
    const labels = {
      'notebook': 'Notebook Level',
      'profile': 'Profile Level',
      'cluster': 'Cluster Level',
      'default': 'System Default'
    };
    return labels[source] || source;
  }

  getPolicySourceClass(source: string): string {
    const classes = {
      'notebook': 'policy-notebook',
      'profile': 'policy-profile',
      'cluster': 'policy-cluster',
      'default': 'policy-default'
    };
    return classes[source] || 'policy-default';
  }

  // Validation helpers
  getIdleTimeError(): string | null {
    const control = this.parentForm.get('culling.idleTimeValue');
    if (control.hasError('required')) {
      return 'Idle timeout is required';
    }
    if (control.hasError('min')) {
      return 'Idle timeout must be at least 1';
    }
    return null;
  }

  getCheckPeriodError(): string | null {
    const control = this.parentForm.get('culling.checkPeriodValue');
    if (control.hasError('min')) {
      return 'Check period must be at least 1 minute';
    }
    return null;
  }

  // Validation methods
  hasValidationErrors(): boolean {
    const cullingForm = this.parentForm.get('culling');
    return cullingForm.invalid && cullingForm.touched;
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];
    const cullingForm = this.parentForm.get('culling');

    if (!cullingForm || !cullingForm.errors) {
      return errors;
    }

    if (cullingForm.hasError('checkPeriodTooLarge')) {
      errors.push('Check period must be less than idle timeout');
    }

    if (cullingForm.hasError('idleTimeTooSmall')) {
      errors.push('Idle timeout must be at least 1 minute');
    }

    if (cullingForm.hasError('idleTimeTooLarge')) {
      errors.push('Idle timeout cannot exceed 30 days');
    }

    if (cullingForm.hasError('checkPeriodInvalid')) {
      errors.push('Check period must be between 1 minute and 24 hours');
    }

    // Add individual field errors
    const idleTimeValue = cullingForm.get('idleTimeValue');
    if (idleTimeValue?.hasError('required')) {
      errors.push('Idle timeout value is required');
    }
    if (idleTimeValue?.hasError('min')) {
      errors.push('Idle timeout value must be at least 1');
    }
    if (idleTimeValue?.hasError('max')) {
      errors.push('Idle timeout value cannot exceed 365');
    }

    const checkPeriodValue = cullingForm.get('checkPeriodValue');
    if (checkPeriodValue?.hasError('min')) {
      errors.push('Check period value must be at least 1');
    }
    if (checkPeriodValue?.hasError('max')) {
      errors.push('Check period value cannot exceed 60');
    }

    return errors;
  }

  // Helper to get the final culling configuration for form submission
  getCullingConfiguration(): any {
    const cullingForm = this.parentForm.get('culling');

    if (!cullingForm.get('enabled').value) {
      return null; // No culling configuration if disabled
    }

    // Check if form is valid before returning configuration
    if (cullingForm.invalid) {
      throw new Error('Cannot get culling configuration: form has validation errors');
    }

    const idleTimeValue = cullingForm.get('idleTimeValue').value;
    const idleTimeUnit = cullingForm.get('idleTimeUnit').value;
    const checkPeriodValue = cullingForm.get('checkPeriodValue').value;
    const checkPeriodUnit = cullingForm.get('checkPeriodUnit').value;

    return {
      enabled: true,
      idleTimeout: this.formatDuration(idleTimeValue, idleTimeUnit),
      checkPeriod: this.formatDuration(checkPeriodValue, checkPeriodUnit),
      exempt: cullingForm.get('exempt').value || false
    };
  }
}
