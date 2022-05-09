import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../Models/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  readonly API_URL = "http://localhost:8091/travelup/api/v1/program"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }
  constructor(private httpClient:HttpClient) { }

  getProgramsByTrip(idTrip:any):Observable<Program[]>{
    return this.httpClient.get<Program[]>(`${this.API_URL}/getprogrambytrip/${idTrip}`);

  }
  addProgramByTrip(idTrip:any,program:Program){
    return this.httpClient.post(`${this.API_URL}/addProgramTrip/${idTrip}`,program);
  }
  updatePorgamByTrip(idTrip:any,program:Program){
    return this.httpClient.put(`${this.API_URL}/updateProgramTrip/${idTrip}`,program);
  }
  deleteProgram(idProgram:any){
    return this.httpClient.delete(`${this.API_URL}/DeleteProgramById/${idProgram}`)
  }



}
