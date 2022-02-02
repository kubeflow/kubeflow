import { ComponentType } from '@angular/cdk/portal';
import { TableColumnComponent } from '../component-value/component-value.component';

export interface ComponentConfig {
  component: ComponentType<TableColumnComponent>;
}

export class ComponentValue {
  component: ComponentType<TableColumnComponent>;

  constructor(config: ComponentConfig) {
    const { component } = config;
    this.component = component;
  }
}
