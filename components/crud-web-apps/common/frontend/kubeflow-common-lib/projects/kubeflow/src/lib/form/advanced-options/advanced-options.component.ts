import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'lib-advanced-options',
  templateUrl: './advanced-options.component.html',
  styleUrls: ['./advanced-options.component.css'],
})
export class AdvancedOptionsComponent implements OnInit, AfterViewInit {
  @Input() sectionIsExpanded = false;
  @Input() maxHeight = '100px';
  @ViewChild('options', { static: true }) optionsWrapper: ElementRef;

  get buttonIcon() {
    return this.sectionIsExpanded
      ? 'material:expand_less'
      : 'material:expand_more';
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.updateHeight();
  }

  updateHeight() {
    const options = this.optionsWrapper.nativeElement;

    options.style.maxHeight = 0;
    if (this.sectionIsExpanded) {
      options.style.maxHeight = this.maxHeight;
    }
  }

  toggleClicked() {
    this.sectionIsExpanded = !this.sectionIsExpanded;
    this.updateHeight();
  }
}
