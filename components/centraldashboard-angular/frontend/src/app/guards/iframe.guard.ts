import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class IframeGuard implements CanActivateChild {
  constructor(private router: Router, private location: Location) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url = state.url;
    const decodedUrl = decodeURIComponent(url);
    if (decodedUrl.includes('{ns}')) {
      this.router.navigate(['namespace-needed'], {
        queryParams: {
          path: decodedUrl,
        },
      });
      this.location.replaceState(decodedUrl);
      return false;
    }
    return true;
  }
}
