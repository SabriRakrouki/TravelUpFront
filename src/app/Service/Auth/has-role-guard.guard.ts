import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuardGuard implements CanActivate {
  constructor(private token: TokenStorageService,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.token.getUser()?.roles.includes(route.data.role);
    if (!isAuthorized) {
      this.router.navigate(['/travelup'])
      window.alert('you are not authorized');
    }
    this.router.navigate( ['/dashbord'])
    return isAuthorized || false;
  }
}

