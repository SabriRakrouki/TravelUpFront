import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly API_URL = 'http://localhost:8091/travelup/api/v1/admin'

  constructor(private httpClient:HttpClient) { }
  getAllUsers():Observable<User[]>{
return this.httpClient.get<User[]>(`${this.API_URL}/getUsers`)
  }
}
