import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UrlItem } from './types';

import { UrlsComponent } from './urls.component';

const mockUrls: UrlItem[] = [
  { name: 'urlName1', url: 'url1' },
  { name: 'urlName2', url: 'url2' },
  { name: 'urlName3', url: 'url3' },
  { name: 'urlName4', url: 'url4' },
];
describe('UrlsComponent', () => {
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

  it('should expose the correct links', () => {
    component.urlList = mockUrls;
    fixture.detectChanges();

    const urls = fixture.debugElement.queryAll(By.css('.lib-link'));
    expect(urls.length).toEqual(4);

    const allUrlNames = mockUrls.map(url => url.name);
    for (const url of urls) {
      const urlName = url.nativeElement.text.trim();
      expect(allUrlNames).toContain(urlName);
    }
  });
});
