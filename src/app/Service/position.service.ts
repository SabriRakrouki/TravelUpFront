import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../Models/Postion';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  readonly API_URL = 'http://localhost:8091/travelup/api/v1/position'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}
  constructor(private httpClient:HttpClient) { }
    getAllPosition():Observable<Position[]>{
      return this.httpClient.get<Position[]>(`${this.API_URL}/getallPosition`);
    }
    addPosition(position:Position){
      return this.httpClient.post(`${this.API_URL}/addPosition`,position)
    }
    updatePosition(position:Position){
      console.log (position)
      return this.httpClient.put(`${this.API_URL}/updatePosition/${position.id}`,position)
    }
    deletePostiion(idPosition:number){
      return this.httpClient.delete(`${this.API_URL}/deletPosition/${idPosition}`);
    }
    addPositionToUser(idempl:number,position:Position){
      return this.httpClient.post(`${this.API_URL}/afftctPOs/${idempl}`,position);
    }

}
