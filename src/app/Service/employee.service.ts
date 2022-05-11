import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/Employee';
import {User} from '../Models/User'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly API_URL = 'http://localhost:8091/travelup/api/v1/Employee'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}
  constructor(private httpClient: HttpClient) { }
  getAllEmployees():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.API_URL}/employee/retrieveEmployees`)
  }
  addEmployee(employee:any){
    return this.httpClient.post(`${this.API_URL}/signup/employee`,employee)
  }
  editEmployee(id:number,employee:Employee){
    employee.id=id;
    return this.httpClient.put(`${this.API_URL}/updateEmployee/${id}`,employee)
  }
  deleteEmployee(id:any){
    
    return this.httpClient.delete(`${this.API_URL}/remove-employee/${id}`,this.httpOptions)
  }
  findUserByusername(username:any):Observable<User>{
    
    return this.httpClient.get<User>(`${this.API_URL}/finduserbyname/${username}`,this.httpOptions)
  }
}
