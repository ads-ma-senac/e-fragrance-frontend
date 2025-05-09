import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.checkUserLogin();
  }

  private checkUserLogin(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/produtos']);
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }
}
