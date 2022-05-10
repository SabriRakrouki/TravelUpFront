import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domain } from '../Models/Domain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  readonly API_URL = 'http://localhost:8091/travelup/api/v1/domain'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}
  constructor(private httpClient:HttpClient) { }
    getAllDomain():Observable<Domain[]>{
      return this.httpClient.get<Domain[]>(`${this.API_URL}/getallDomain`);
    }
    addDomain(domain:Domain){
      return this.httpClient.post(`${this.API_URL}/addDomain`,domain)
    }
    editDomain(domain:Domain){
      return this.httpClient.put(`${this.API_URL}/updateDomain/${domain.id}`,domain)
    }
    deleteDomain(id:number):Observable<any>{
      return this.httpClient.delete<any>(`${this.API_URL}/deletDomain/${id}`)
    }


}
