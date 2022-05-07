import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Trip } from '../Models/TripModel';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  readonly API_URL="http://localhost:8091/travelup/api/v1/trip"
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}

  constructor(private httpClient:HttpClient) { 
   
  }


 

  getAllTrips():Observable<Trip[]>{
    
    return this.httpClient.get<Trip[]>(`${this.API_URL}/getAll`)
  }
  addTrip(trip:Trip):Observable<Trip>{
    return this.httpClient.post<Trip>(`${this.API_URL}/addTrip`,trip)
  }
  editTrip(id:number,trip:Trip){
    return this.httpClient.put(`${this.API_URL}/updateTrip/${id}`,trip)
  }
  deleteTrip(id:any){
    
    return this.httpClient.delete(`${this.API_URL}/deleteTrip/${id}`,this.httpOptions)
  }
  addUserToTrip(idTrip:number,idUser:number){
    return this.httpClient.post(`${this.API_URL}/${idTrip}/${idUser}`,null);
  }





}
