import { Component, Input } from '@angular/core';
import { GPUCullingPolicy } from '../../pages/form/form-new/form-gpu-culling/form-gpu-culling.component';

@Component({
  selector: 'app-gpu-policy-display',
  templateUrl: './gpu-policy-display.component.html',
  styleUrls: ['./gpu-policy-display.component.scss'],
})
export class GPUPolicyDisplayComponent {
  @Input() policy: GPUCullingPolicy | null = null;
  @Input() title = 'GPU Culling Policy';
  @Input() showHierarchy = false;
  @Input() showOverrideInfo = false;
  @Input() canOverride = false;

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

  getPolicySourceIcon(source: string): string {
    const icons = {
      'notebook': 'description',
      'profile': 'group',
      'cluster': 'dns',
      'default': 'settings'
    };
    return icons[source] || 'settings';
  }

  getCullingModeLabel(mode: string): string {
    const labels = {
      'gpu-only': 'GPU Only',
      'gpu-priority': 'GPU Priority',
      'time-priority': 'Time Priority',
      'disabled': 'Disabled'
    };
    return labels[mode] || mode;
  }

  getCullingModeIcon(mode: string): string {
    const icons = {
      'gpu-only': 'memory',
      'gpu-priority': 'priority_high',
      'time-priority': 'schedule',
      'disabled': 'block'
    };
    return icons[mode] || 'settings';
  }

  getHierarchyItemClass(level: string, activeSource: string): string {
    const baseClass = 'hierarchy-item';
    if (level === activeSource) {
      return `${baseClass} active`;
    }
    
    // Show which levels are higher priority than the active source
    const hierarchy = ['notebook', 'profile', 'cluster', 'default'];
    const levelIndex = hierarchy.indexOf(level);
    const activeIndex = hierarchy.indexOf(activeSource);
    
    if (levelIndex < activeIndex) {
      return `${baseClass} higher-priority`;
    }
    
    return `${baseClass} lower-priority`;
  }

  getHierarchyStatusIcon(level: string, activeSource: string): string {
    if (level === activeSource) {
      return 'check_circle';
    }
    
    const hierarchy = ['notebook', 'profile', 'cluster', 'default'];
    const levelIndex = hierarchy.indexOf(level);
    const activeIndex = hierarchy.indexOf(activeSource);
    
    if (levelIndex < activeIndex) {
      return 'radio_button_unchecked'; // Available but not used
    }
    
    return 'remove_circle_outline'; // Lower priority
  }

  getThresholdClass(threshold: number, type: 'memory' | 'compute'): string {
    // Provide visual feedback for threshold values
    if (type === 'memory') {
      if (threshold <= 5) return 'threshold-very-sensitive';
      if (threshold <= 15) return 'threshold-sensitive';
      if (threshold <= 30) return 'threshold-moderate';
      return 'threshold-conservative';
    } else { // compute
      if (threshold <= 3) return 'threshold-very-sensitive';
      if (threshold <= 10) return 'threshold-sensitive';
      if (threshold <= 25) return 'threshold-moderate';
      return 'threshold-conservative';
    }
  }

  getThresholdTooltip(threshold: number, type: 'memory' | 'compute'): string {
    const thresholdClass = this.getThresholdClass(threshold, type);
    const typeLabel = type === 'memory' ? 'Memory' : 'Compute';
    
    const tooltips = {
      'threshold-very-sensitive': `Very sensitive ${typeLabel.toLowerCase()} threshold - notebooks will be culled quickly when usage drops`,
      'threshold-sensitive': `Sensitive ${typeLabel.toLowerCase()} threshold - good for development environments`,
      'threshold-moderate': `Moderate ${typeLabel.toLowerCase()} threshold - balanced approach`,
      'threshold-conservative': `Conservative ${typeLabel.toLowerCase()} threshold - allows for longer periods of low usage`
    };
    
    return tooltips[thresholdClass] || `${typeLabel} usage threshold: ${threshold}%`;
  }

  getDurationTooltip(duration: string, type: 'kernel' | 'sustained'): string {
    const typeLabel = type === 'kernel' ? 'Kernel timeout' : 'Sustained duration';
    
    if (type === 'kernel') {
      return `Time since last GPU kernel execution before considering notebook for culling: ${duration}`;
    } else {
      return `How long low GPU usage conditions must persist before triggering culling: ${duration}`;
    }
  }

  formatDuration(duration: string): string {
    // Convert duration string to human-readable format
    if (duration.endsWith('m')) {
      const minutes = parseInt(duration.slice(0, -1));
      if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
          return `${hours} hour${hours !== 1 ? 's' : ''}`;
        } else {
          return `${hours}h ${remainingMinutes}m`;
        }
      }
    } else if (duration.endsWith('h')) {
      const hours = parseInt(duration.slice(0, -1));
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (duration.endsWith('d')) {
      const days = parseInt(duration.slice(0, -1));
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    return duration;
  }

  getRecommendationText(): string {
    if (!this.policy || !this.policy.enabled) {
      return '';
    }

    const { memoryThreshold, computeThreshold, mode } = this.policy;
    
    if (mode === 'gpu-only') {
      if (memoryThreshold <= 5 && computeThreshold <= 5) {
        return 'Very aggressive GPU culling - suitable for development environments with expensive GPU resources.';
      } else if (memoryThreshold <= 15 && computeThreshold <= 15) {
        return 'Moderate GPU culling - good balance between resource optimization and user experience.';
      } else {
        return 'Conservative GPU culling - allows for longer periods of low usage before culling.';
      }
    } else if (mode === 'gpu-priority') {
      return 'GPU metrics take priority with time-based fallback - recommended for most production environments.';
    } else if (mode === 'time-priority') {
      return 'Time-based culling with GPU metrics as additional criteria - good for mixed workloads.';
    }
    
    return '';
  }
}
