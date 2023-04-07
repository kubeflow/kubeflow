import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainPageComponent } from './main-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NamespaceSelectorComponent } from './namespace-selector/namespace-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const SvgIconsServiceStub = {};

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, NamespaceSelectorComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatIconTestingModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('isLinkActive should return correct values', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue(
      '/_/path?qs=queryParam#fragment',
    );
    expect(component.isLinkActive('/path')).toEqual(true);
    expect(component.isLinkActive('/path/')).toEqual(true);

    expect(component.isLinkActive('/badpath')).toEqual(false);
    expect(component.isLinkActive('/badpath/')).toEqual(false);

    expect(component.isLinkActive('/path/#fragment')).toEqual(true);
    expect(component.isLinkActive('/path#fragment')).toEqual(true);

    expect(component.isLinkActive('/path/#bad-fragment')).toEqual(false);
    expect(component.isLinkActive('/path#bad-fragment')).toEqual(false);

    // isLinkActive doesn't consider query params during check
    expect(component.isLinkActive('/path/?qs=queryParam')).toEqual(false);
    expect(component.isLinkActive('/path?qs=queryParam')).toEqual(false);
  });

  it('getNamespaceParams should return object with ns parameter', () => {
    expect(component.getNamespaceParams('test-namespace')).toEqual({
      ns: 'test-namespace',
    });
  });
});
