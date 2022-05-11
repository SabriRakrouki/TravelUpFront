import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/Models/Post';
import { Topic } from 'src/app/Models/Topic';
import { UserStorage } from 'src/app/Models/UserStorage';
import { PostService } from 'src/app/Service/post.service';
import { TopicService } from 'src/app/Service/topic.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {
userName!:UserStorage;
listPosts!:Post[];
postForm!: FormGroup;
postEntity: Post = {
  id: null,
  content: null,
  datePost: null,
  photo: null,
  subject: null,
  topic: null
}
listTopic!:Topic[];


  constructor(private postService :PostService,private formBuilder: FormBuilder,private topicService:TopicService) { }

  ngOnInit(): void {
    this.getAllTopic()
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      topic: ['', [Validators.required]],
    })
    this.getAllPosts()
     var retrievedObject = sessionStorage.getItem('auth-user');
    this.userName=JSON.parse(JSON.parse(JSON.stringify(retrievedObject)))as UserStorage;
   
    
  }
test(){
  
}
getAllPosts() {
  this.postService.getAllPosts().subscribe({
    next: (res) => {
      this.listPosts = res
    }, error: (err) => {
      console.log(err)
    }
  })
}
getAllTopic(){
  this.topicService.getAllTopic().subscribe({
    next:(res)=>{
      this.listTopic=res;
      
    },error:(err)=>{
      console.log(`erorr in geting tpoic: ${err}`)
    }
  })
}


addPost(){
  console.log("test")
  console.log(this.postForm.valid)
  if (this.postForm.valid) {
    
    console.log("stage 1")
    this.postEntity.content = this.postForm.get('content')?.value
    this.postEntity.subject = this.postForm.get('subject')?.value
    this.postEntity.topic = this.postForm.get('topic')?.value
    console.log("test2")
    this.postService.addPost(this.postEntity).subscribe({
      next: (res) => {
        console.log("stage 1")
        console.log("Post added")
        this.postForm.reset()
        this.getAllPosts()
        
      }, error: (err) => {
        console.log(`error adding Post: ${err}`)
  
  
      }
    })
  
  }
}
}
