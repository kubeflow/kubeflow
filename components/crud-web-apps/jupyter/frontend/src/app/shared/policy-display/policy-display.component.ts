import { Component, Input } from '@angular/core';

export interface PolicyInfo {
  source: 'notebook' | 'profile' | 'cluster' | 'default';
  enabled: boolean;
  idleTimeout: string;
  checkPeriod: string;
  exempt?: boolean;
}

@Component({
  selector: 'app-policy-display',
  templateUrl: './policy-display.component.html',
  styleUrls: ['./policy-display.component.scss'],
})
export class PolicyDisplayComponent {
  @Input() policy: PolicyInfo | null = null;
  @Input() title: string = '';
  @Input() showHierarchy: boolean = true;
  @Input() showOverrideInfo: boolean = true;
  @Input() canOverride: boolean = true;

  getIcon(): string {
    if (!this.policy) return 'help';
    
    switch (this.policy.source) {
      case 'notebook': return 'description';
      case 'profile': return 'account_circle';
      case 'cluster': return 'cloud';
      case 'default': return 'settings';
      default: return 'help';
    }
  }

  getIconClass(): string {
    if (!this.policy) return 'icon-default';
    
    const baseClass = 'policy-icon';
    const sourceClass = `icon-${this.policy.source}`;
    const statusClass = this.policy.enabled ? 'icon-enabled' : 'icon-disabled';
    
    return `${baseClass} ${sourceClass} ${statusClass}`;
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
      'notebook': 'source-notebook',
      'profile': 'source-profile',
      'cluster': 'source-cluster',
      'default': 'source-default'
    };
    return classes[source] || 'source-default';
  }

  getPriorityLevel(source: string): number {
    const priorities = {
      'notebook': 4,
      'profile': 3,
      'cluster': 2,
      'default': 1
    };
    return priorities[source] || 1;
  }

  isHigherPriority(source: string): boolean {
    if (!this.policy) return false;
    return this.getPriorityLevel(source) > this.getPriorityLevel(this.policy.source);
  }

  isCurrentSource(source: string): boolean {
    return this.policy?.source === source;
  }

  formatDuration(duration: string): string {
    // Convert duration strings like "5m", "2h", "1d" to human-readable format
    const match = duration.match(/^(\d+)([mhd])$/);
    if (!match) return duration;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    const unitNames = {
      'm': value === 1 ? 'minute' : 'minutes',
      'h': value === 1 ? 'hour' : 'hours',
      'd': value === 1 ? 'day' : 'days'
    };
    
    return `${value} ${unitNames[unit] || unit}`;
  }
}
