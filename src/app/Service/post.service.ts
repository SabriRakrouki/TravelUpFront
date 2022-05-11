import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly API_URL = "http://localhost:8091/travelup/api/v1/post"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }
  constructor(private httpClient:HttpClient) { }
  getAllPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.API_URL}/getPosts`)
  }
  addPost(post:Post){
    return this.httpClient.post(`${this.API_URL}/addPost`,post);
  }
  updatePost(post:Post){
    return this.httpClient.put(`${this.API_URL}/updatepost/${post.id}`,post)
  }
  deletePost(idNum:number){
    return this.httpClient.delete(`${this.API_URL}/remove-post/${idNum}`)
  }


}
