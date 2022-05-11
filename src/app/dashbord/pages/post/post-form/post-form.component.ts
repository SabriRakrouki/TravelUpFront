import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/Models/Post';
import { Topic } from 'src/app/Models/Topic';
import { PostService } from 'src/app/Service/post.service';
import { TopicService } from 'src/app/Service/topic.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  actionBtn: string = "Save";
  listTopic!:Topic[]
  actionTitile: string = "Add new Post";
  postForm!: FormGroup;
  postEntity: Post = {
    id: null,
    content: null,
    datePost: null,
    photo: null,
    subject: null,
    topic: null
  }
  constructor(private postService: PostService,private topicService:TopicService, private formBuilder: FormBuilder,
    public diaLogRef: MatDialogRef<PostFormComponent>, @Inject(MAT_DIALOG_DATA) public dataEdit: any) { }

  ngOnInit(): void {
    this.getAllTopic();
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      topic: ['', [Validators.required]],
    })
    if (this.dataEdit) {

      this.actionBtn = "Update";
      this.actionTitile = "Update Post";
      // this.postForm.controls["domain"].setValue(this.dataEdit.domain)
      this.postForm.controls["content"].setValue(this.dataEdit.content)
      this.postForm.controls["subject"].setValue(this.dataEdit.subject)
      this.postForm.controls["topic"].setValue(this.dataEdit.topic)


    }
  }
  onClose() {
    this.diaLogRef.close();
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
  addPost() {
    if (!this.dataEdit) {
      console.log("stage 1")
      if (this.postForm.valid) {
        console.log("stage 1")
        this.postEntity.content = this.postForm.get('content')?.value
        this.postEntity.subject = this.postForm.get('subject')?.value
        this.postEntity.topic = this.postForm.get('topic')?.value
        this.postService.addPost(this.postEntity).subscribe({
          next: (res) => {
            console.log("stage 1")
            console.log("Post added")
            this.postForm.reset()
            this.diaLogRef.close('Save');
          }, error: (err) => {
            console.log(`error adding Post: ${err}`)


          }
        })

      }

    } else {
      this.postEntity.id = this.dataEdit.id;
      this.postEntity.content = this.postForm.get('content')?.value;
      this.postEntity.subject = this.postForm.get('subject')?.value;
      this.postEntity.topic = this.postForm.get('topic')?.value;
      this.postEntity.datePost=this.dataEdit.datePost;
      this.postService.updatePost(this.postEntity).subscribe({
        next: (res) => {
          console.log('post updated')
          this.postForm.reset();
          this.diaLogRef.close('Update')
        }, error: (err) => {
          console.log(`error : ${err.message}`);
        }
      });
    }

  }



}
