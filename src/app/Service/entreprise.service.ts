import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entreprise } from '../Models/Entreprise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  readonly API_URL = 'http://localhost:8091/travelup/api/v1/entreprise'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}
  constructor(private httpClient: HttpClient) { }
  getAllEntreprises():Observable<Entreprise[]>{
    return this.httpClient.get<Entreprise[]>(`${this.API_URL}/entreprise/retrieveEntreprises`)
  }
  addEntreprise(entreprise:any){
    return this.httpClient.post(`${this.API_URL}/signup/entreprise`,entreprise)
  }
  editEntreprise(id:number,entreprise:Entreprise){
    entreprise.id=id;
    return this.httpClient.put(`${this.API_URL}/updateEntreprise/${id}`,entreprise)
  }
  deleteEntreprise(id:any){
    
    return this.httpClient.delete(`${this.API_URL}/remove-entreprise/${id}`,this.httpOptions)
  }
}
