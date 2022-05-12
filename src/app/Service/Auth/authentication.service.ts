import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './ApiService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Models/User';
const AUTH_API = 'http://localhost:8091/travelup/api/v1/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  roleAs: any;
  isLoggedin: boolean = false;
  private token: string="";
  private loggedInUsername: string="";
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
  isLoggedIn() {

    if (JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))).auth_token == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }
  public logOut(): void {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
  getRole() {
    this.roleAs = localStorage.getItem('roles');
    return this.roleAs;
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public loadToken(): void {
      this.token =  localStorage.getItem('token')!;
      
  }

  public getToken(): string {
    return this.token=localStorage.getItem("token")!;
  }

  public isUserLoggedIn(): boolean{
    if(this.getToken() && this.jwtHelper.decodeToken(this.getToken()).sub &&
       !this.jwtHelper.isTokenExpired(this.getToken())){

        return true;
    }else{

      this.logOut();
      return false;
    }
  }

  private getUserRole(): string {
    return this.getUserFromLocalCache().roles;
  }


}
