import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { JWABackendService } from '../../../../services/backend.service';
import { GPUCullingPolicy, GPUMetrics } from '../../../form/form-new/form-gpu-culling/form-gpu-culling.component';

@Component({
  selector: 'app-gpu-culling-status',
  templateUrl: './gpu-culling-status.component.html',
  styleUrls: ['./gpu-culling-status.component.scss'],
})
export class GPUCullingStatusComponent implements OnInit, OnDestroy {
  @Input() element: any; // Notebook object from the table

  gpuCullingPolicy: GPUCullingPolicy | null = null;
  gpuMetrics: GPUMetrics | null = null;
  nextEvaluationTime: Date | null = null;
  hasError = false;
  showDetailedMetrics = false;

  // Computed properties for display
  avgMemoryUsage = 0;
  avgComputeUsage = 0;
  maxSecondsSinceKernel = 0;

  private subscriptions = new Subscription();
  private refreshTimer: Subscription | null = null;

  constructor(private backend: JWABackendService) {}

  ngOnInit() {
    if (this.element) {
      this.loadGPUCullingData();
      this.startPeriodicRefresh();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  private loadGPUCullingData() {
    if (!this.element?.namespace || !this.element?.name) {
      return;
    }

    // Load GPU culling policy
    const policySub = this.backend.getGPUCullingPolicy(this.element.namespace).subscribe(
      policy => {
        this.gpuCullingPolicy = policy;
        this.calculateNextEvaluationTime();
      },
      error => {
        console.warn('Could not load GPU culling policy:', error);
        this.hasError = true;
      }
    );
    this.subscriptions.add(policySub);

    // Load GPU metrics if notebook has GPU resources
    if (this.element.hasGPUResources) {
      this.loadGPUMetrics();
    }
  }

  private loadGPUMetrics() {
    const metricsSub = this.backend.getGPUMetrics(this.element.namespace, this.element.name).subscribe(
      metrics => {
        this.gpuMetrics = metrics;
        this.calculateAverageUsage();
        this.hasError = false;
      },
      error => {
        console.warn('Could not load GPU metrics:', error);
        this.hasError = true;
      }
    );
    this.subscriptions.add(metricsSub);
  }

  private calculateAverageUsage() {
    if (!this.gpuMetrics?.devices || this.gpuMetrics.devices.length === 0) {
      this.avgMemoryUsage = 0;
      this.avgComputeUsage = 0;
      this.maxSecondsSinceKernel = 0;
      return;
    }

    let totalMemory = 0;
    let totalCompute = 0;
    let maxKernel = 0;

    for (const device of this.gpuMetrics.devices) {
      totalMemory += device.memoryUsage.utilizationPercentage;
      totalCompute += device.computeUtilization.utilizationPercentage;
      maxKernel = Math.max(maxKernel, device.secondsSinceLastKernel);
    }

    this.avgMemoryUsage = totalMemory / this.gpuMetrics.devices.length;
    this.avgComputeUsage = totalCompute / this.gpuMetrics.devices.length;
    this.maxSecondsSinceKernel = maxKernel;
  }

  private calculateNextEvaluationTime() {
    if (!this.gpuCullingPolicy?.enabled) {
      return;
    }

    // Estimate next evaluation time based on check period
    // This would typically come from the culling controller's status
    const checkPeriodMinutes = 5; // Default check period
    this.nextEvaluationTime = new Date(Date.now() + checkPeriodMinutes * 60 * 1000);
  }

  private startPeriodicRefresh() {
    // Refresh GPU metrics every 30 seconds
    this.refreshTimer = timer(30000, 30000).subscribe(() => {
      if (this.element?.hasGPUResources) {
        this.loadGPUMetrics();
      }
    });
  }

  // UI Helper Methods
  getStatusClass(): string {
    if (!this.gpuCullingPolicy?.enabled) {
      return 'status-disabled';
    }

    if (this.hasError) {
      return 'status-error';
    }

    if (!this.gpuMetrics?.hasGPUResources) {
      return 'status-no-gpu';
    }

    // Determine status based on usage levels
    if (this.isLowUsage()) {
      return 'status-low-usage';
    } else if (this.isHighUsage()) {
      return 'status-high-usage';
    } else {
      return 'status-moderate-usage';
    }
  }

  getStatusIcon(): string {
    if (!this.gpuCullingPolicy?.enabled) {
      return 'block';
    }

    if (this.hasError) {
      return 'warning';
    }

    if (!this.gpuMetrics?.hasGPUResources) {
      return 'info';
    }

    if (this.isLowUsage()) {
      return 'trending_down';
    } else if (this.isHighUsage()) {
      return 'trending_up';
    } else {
      return 'trending_flat';
    }
  }

  getStatusText(): string {
    if (!this.gpuCullingPolicy?.enabled) {
      return 'Disabled';
    }

    if (this.hasError) {
      return 'Error';
    }

    if (!this.gpuMetrics?.hasGPUResources) {
      return 'No GPU';
    }

    if (this.isLowUsage()) {
      return 'Low Usage';
    } else if (this.isHighUsage()) {
      return 'High Usage';
    } else {
      return 'Active';
    }
  }

  getStatusTooltip(): string {
    if (!this.gpuCullingPolicy?.enabled) {
      return 'GPU culling is disabled for this notebook';
    }

    if (this.hasError) {
      return 'Unable to load GPU metrics';
    }

    if (!this.gpuMetrics?.hasGPUResources) {
      return 'This notebook has no GPU resources allocated';
    }

    const memThreshold = this.gpuCullingPolicy?.memoryThreshold || 10;
    const computeThreshold = this.gpuCullingPolicy?.computeThreshold || 5;

    return `GPU Usage: Memory ${this.avgMemoryUsage.toFixed(1)}% (threshold: ${memThreshold}%), ` +
           `Compute ${this.avgComputeUsage.toFixed(1)}% (threshold: ${computeThreshold}%)`;
  }

  getUsageClass(percentage: number): string {
    if (percentage < 10) return 'usage-low';
    if (percentage < 50) return 'usage-medium';
    return 'usage-high';
  }

  getProgressColor(percentage: number): 'primary' | 'accent' | 'warn' {
    if (percentage < 25) return 'primary';
    if (percentage < 75) return 'accent';
    return 'warn';
  }

  getLastKernelText(): string {
    if (this.maxSecondsSinceKernel < 60) {
      return `${this.maxSecondsSinceKernel}s`;
    } else if (this.maxSecondsSinceKernel < 3600) {
      return `${Math.floor(this.maxSecondsSinceKernel / 60)}m`;
    } else {
      return `${Math.floor(this.maxSecondsSinceKernel / 3600)}h`;
    }
  }

  getPolicySourceClass(): string {
    const source = this.gpuCullingPolicy?.source || 'default';
    return `policy-source-${source}`;
  }

  getPolicySourceIcon(): string {
    const source = this.gpuCullingPolicy?.source || 'default';
    const icons = {
      'notebook': 'description',
      'profile': 'group',
      'cluster': 'dns',
      'default': 'settings'
    };
    return icons[source] || 'settings';
  }

  getPolicySourceText(): string {
    const source = this.gpuCullingPolicy?.source || 'default';
    const labels = {
      'notebook': 'Notebook',
      'profile': 'Profile',
      'cluster': 'Cluster',
      'default': 'Default'
    };
    return labels[source] || 'Default';
  }

  getCullingModeText(): string {
    const mode = this.gpuCullingPolicy?.mode || 'gpu-priority';
    const labels = {
      'gpu-only': 'GPU Only',
      'gpu-priority': 'GPU Priority',
      'time-priority': 'Time Priority',
      'disabled': 'Disabled'
    };
    return labels[mode] || 'GPU Priority';
  }

  toggleDetails() {
    this.showDetailedMetrics = !this.showDetailedMetrics;
  }

  private isLowUsage(): boolean {
    if (!this.gpuCullingPolicy || !this.gpuMetrics?.hasGPUResources) {
      return false;
    }

    const memThreshold = this.gpuCullingPolicy.memoryThreshold || 10;
    const computeThreshold = this.gpuCullingPolicy.computeThreshold || 5;

    return this.avgMemoryUsage < memThreshold && this.avgComputeUsage < computeThreshold;
  }

  private isHighUsage(): boolean {
    return this.avgMemoryUsage > 75 || this.avgComputeUsage > 75;
  }
}
