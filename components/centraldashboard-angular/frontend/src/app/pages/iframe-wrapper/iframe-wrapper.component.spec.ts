import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SafePipe } from 'src/app/pipes/safe.pipe';

import { IframeWrapperComponent } from './iframe-wrapper.component';

describe('IframeWrapperComponent', () => {
  let component: IframeWrapperComponent;
  let fixture: ComponentFixture<IframeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [IframeWrapperComponent, SafePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
