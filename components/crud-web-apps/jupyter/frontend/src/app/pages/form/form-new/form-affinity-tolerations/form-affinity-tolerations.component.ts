import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TolerationGroup, AffinityConfig } from 'src/app/types';

@Component({
  selector: 'app-form-affinity-tolerations',
  templateUrl: './form-affinity-tolerations.component.html',
  styleUrls: ['./form-affinity-tolerations.component.scss'],
})
export class FormAffinityTolerationsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() tolerationGroups: TolerationGroup[];
  @Input() affinityConfigs: AffinityConfig[];

  public vendorsNums = {};
  public vendorinfo = "";

  public gpusType = [];

  constructor(public backend: JWABackendService) {}

  ngOnInit() {

    this.backend.getGPUCount().subscribe(count => { 
      console.log('gpu count: ', count);
      this.vendorsNums = new Object(count);
      const vendorKey = Object.keys(this.vendorsNums);
      console.log('vendorKey: ', vendorKey);

      (Object.keys(this.vendorsNums)).forEach((key) => {
        console.log('@');
        console.log(key, this.vendorsNums[key]);
        this.vendorinfo += this.vendorsNums[key] + ' ' + key;
        this.gpusType.push(key);
      });

      console.log('form affinity: ')
      console.log('vendorinfo: ', this.vendorinfo)
      console.log('gpusType: ', this.gpusType)

      
    });
  }
}
