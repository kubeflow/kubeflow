import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DefaultRouteGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.getUserEmail().pipe(
      map(user => {
        if (user === 'dcn.admin@ssu.com') {
          // admin: cho phép vào route mặc định ''
          return true;
        }
        // non-admin: chuyển hướng sang '/user'
        this.router.navigate(['user']);
        return false;
      })
    );
  }
}

