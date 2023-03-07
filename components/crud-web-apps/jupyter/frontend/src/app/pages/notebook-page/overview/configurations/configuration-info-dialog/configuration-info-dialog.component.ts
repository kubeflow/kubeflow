import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Configuration } from 'src/app/types/configuration';
import { dump } from 'js-yaml';
export interface DialogData {
  config: Configuration;
}

@Component({
  selector: 'app-configuration-info-dialog',
  templateUrl: './configuration-info-dialog.component.html',
  styleUrls: ['./configuration-info-dialog.component.scss'],
})
export class ConfigurationInfoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}

  yaml(configuration: Configuration) {
    if (!configuration) {
      return 'No information available about the configuration';
    }

    // Keep original configuration unaffected
    const config = { ...configuration };
    delete config.name;

    return dump(config);
  }
}
