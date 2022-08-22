import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlsComponent } from './urls.component';

describe('LinksComponent', () => {
  let component: UrlsComponent;
  let fixture: ComponentFixture<UrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
