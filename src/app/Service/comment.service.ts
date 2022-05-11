import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  readonly API_URL = 'http://localhost:8091/travelup/api/v1/comment'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      "Access-Control-Allow-Origin": "*",
      
    } )}
  constructor(private httpClient:HttpClient) { }
  getAllComment():Observable<Comment[]>
  {
    return this.httpClient.get<Comment[]>(`${this.API_URL}/getComments`)
  }
  addComment(comment:Comment){
    return this.httpClient.post(`${this.API_URL}/addComment`,comment)
  }
  updateComment(comment:Comment){
    return this.httpClient.put(`${this.API_URL}/updatecomment/${comment.id}`,comment)
  }
  deleteComment(idNumComment:number){
    return this.httpClient.delete(`${this.API_URL}/remove-commment/${idNumComment}`)
  }}
