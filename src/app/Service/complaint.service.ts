import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../Models/Complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  API_URL = 'http://localhost:8091/travelup/api/v1/compaint';
  constructor(private httpClient: HttpClient) { }
  getAllComplaints():Observable<Complaint[]>{

    return this.httpClient.get<Complaint[]>(`${this.API_URL}/getComplaints`);
  }

  deleteComplaint(id:number){
    return this.httpClient.delete(`${this.API_URL}/remove-complaint/${id}`);
    }
    public addComplaintt(complaint:Complaint){
      return this.httpClient.post(`${this.API_URL}/addComplaint/`,complaint);
      }  

      getPdf():Observable<string[]>{

        return this.httpClient.get<string[]>(`${this.API_URL}/export/pdf`);
      }
      getComplaintById(id: number): Observable<Complaint>{
        return this.httpClient.get<Complaint>(`${this.API_URL}/findcomp/${id}`);
      }


      updateComplaint(id: number, complaint:Complaint){
        return this.httpClient.put(`${this.API_URL}/complaintmodif/${id}`, complaint);
      }
      
    }
