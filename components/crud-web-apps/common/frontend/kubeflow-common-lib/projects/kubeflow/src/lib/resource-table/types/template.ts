import { TemplateRef } from '@angular/core';

export interface TemplateConfig {
  ref: TemplateRef<any>;
}

export class TemplateValue {
  ref: TemplateRef<any>;

  constructor(config: TemplateConfig = { ref: undefined }) {
    const { ref } = config;
    this.ref = ref;
  }
}
