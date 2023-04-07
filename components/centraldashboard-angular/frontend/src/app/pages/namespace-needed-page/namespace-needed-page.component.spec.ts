import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NamespaceNeededPageComponent } from './namespace-needed-page.component';

describe('NamespaceNeededPageComponent', () => {
  let component: NamespaceNeededPageComponent;
  let fixture: ComponentFixture<NamespaceNeededPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NamespaceNeededPageComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceNeededPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
