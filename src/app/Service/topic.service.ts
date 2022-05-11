import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../Models/Topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  readonly API_URL = "http://localhost:8091/travelup/api/v1/topic"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }
  constructor(private httpClient:HttpClient) { }


  getAllTopic():Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(`${this.API_URL}/getTopics`)
  }
  addTopic(topic:Topic){
    return this.httpClient.post(`${this.API_URL}/addTopic`,topic)
  }
  updateTopic(topic:Topic){
    return this.httpClient.put(`${this.API_URL}/updateTopic/${topic.id}`,topic);
  }
  deleteTopic(idNumm:number){
    return this.httpClient.delete(`${this.API_URL}/remove-topic/${idNumm}`)
  }


}
