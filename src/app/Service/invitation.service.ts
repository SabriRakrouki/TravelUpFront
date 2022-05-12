import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  readonly API_URL = 'http://localhost:8091/travelup/api/v1/invitation'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}
  constructor(private httpClient: HttpClient) { }
  addInvitation(file:any){
    console.log(file)
  let  httpparm=new HttpParams().append('path',file)
  console.log(httpparm)
    return this.httpClient.post(`${this.API_URL}/upload`,httpparm)
  }


  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('path', file)
    return this.httpClient.post(`${this.API_URL}/upload`, formParams)
  }
public test(){
  console.log("test")
  this.httpClient.get("http://localhost:8091/travelup/api/v1/auth/test").subscribe(res=>console.log(res))
}
}
