
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModel } from '../Models/LocationModel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly API_URL = "http://localhost:8091/travelup/api/v1/trip";
  readonly  LOC_API_LINK="http://localhost:8091/travelup/api/v1/location";
  private locations!: Observable<LocationModel[]>;
  constructor(private httpClient: HttpClient) { }
  getAllCounrties(): Observable<LocationModel[]> {

    if (!this.locations) {
      this.locations
      console.log(this.locations);
      this.locations = this.httpClient.get<LocationModel[]>(`${this.API_URL}/countries`);

    }
    return this.locations;
  }




  getStateByCountri(location: string): Observable<LocationModel[]> {
    return this.httpClient.get<LocationModel[]>(`${this.API_URL}/country/${location}/states`);

  }
  getCitiesbyCountryAndState(countryTag: string, stateTag: string): Observable<LocationModel[]> {
    return this.httpClient.get<LocationModel[]>(`${this.API_URL}/country/${countryTag}/states/${stateTag}`)
  }
  addLocation(loc:LocationModel):Observable<LocationModel>{
    return this.httpClient.post<LocationModel>(`${this.LOC_API_LINK}/add`,loc);
  }
  addLocationToTrip(idLoc:number,idTrip:number){
    return this.httpClient.post(`${this.API_URL}/addLocation/${idLoc}/${idTrip}`,null);
  }
  addLocationToUser(){
    
  }
  



}

