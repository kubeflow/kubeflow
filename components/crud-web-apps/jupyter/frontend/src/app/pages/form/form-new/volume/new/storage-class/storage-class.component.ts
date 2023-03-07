import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JWABackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-storage-class',
  templateUrl: './storage-class.component.html',
  styleUrls: ['./storage-class.component.scss'],
})
export class StorageClassComponent implements OnInit {
  storageClasses: string[] = [];
  defaultStoraceClass: string;

  @Input()
  scControl: FormControl;

  constructor(private backend: JWABackendService) {}

  ngOnInit(): void {
    // get list of storage classes
    this.backend.getStorageClasses().subscribe(classes => {
      this.storageClasses = classes;
    });

    // get the default storage class
    this.backend.getDefaultStorageClass().subscribe(sc => {
      this.defaultStoraceClass = sc;

      if (!this.scControl || !this.scControl.disabled) {
        return;
      }

      // if control is disabled then the user wants to use the default SC
      this.scControl.setValue(sc);
    });
  }

  useDefaultSC(useDefault: boolean) {
    if (useDefault) {
      this.scControl.disable();
      return;
    }

    this.scControl.enable();
  }
}
