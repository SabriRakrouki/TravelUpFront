import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuardGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
     private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(localStorage.getItem('currentUser')){
        console.log('test test etststtstststs')
        return true;
      }
      this.router.navigate(['/travelup'],{queryParams:{returnUrl : state.url}});
      return false;
    }
  
}