import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from 'src/app/Models/Comment';
import { Post } from 'src/app/Models/Post';
import { User } from 'src/app/Models/User';
import { AdminService } from 'src/app/Service/admin.service';
import { CommentService } from 'src/app/Service/comment.service';
import { EmployeeService } from 'src/app/Service/employee.service';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  actionBtn: string = "Save";
  actionTitile: string = "Add new Comment";
  commentForm!: FormGroup;
  listPosts!:Post[];
  listUsers!:User[];
  commentEntity: Comment = {
    content: null,
    id: null,
    posts: null,
    user: null
  }
  constructor(private userService:EmployeeService,private postService:PostService,private commentService: CommentService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommentFormComponent>, @Inject(MAT_DIALOG_DATA) public dataEdit: any) { }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllPosts()
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      posts: ['', [Validators.required]],
      user:['',[Validators.required]]
    });
    if(this.dataEdit){
      this.actionBtn="Update";
      this.actionTitile="Update Comment";
      this.commentForm.controls['content'].setValue(this.dataEdit.content);
      this.commentForm.controls['posts'].setValue(this.dataEdit.content);
      this.commentForm.controls['user'].setValue(this.dataEdit.content);
    }
  }
  getAllPosts(){
    this.postService.getAllPosts().subscribe({
      next:(res)=>{
        this.listPosts=res
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  onClose(){
    this.dialogRef.close();
  }
  getAllUsers(){
    this.userService.getAllEmployees().subscribe({
      next:(res)=>{
        this.listUsers=res;

      },error:(err)=>{

        console.log(err)
      }
    })
  }
addComment(){
  console.log("stage1")
  if(!this.dataEdit){
  console.log("stage2")

    if(this.commentForm.valid){
  console.log("stage3")

      this.commentEntity.content=this.commentForm.get("content")?.value;
      this.commentEntity.posts=this.commentForm.get("posts")?.value;
      this.commentEntity.user=this.commentForm.get("user")?.value;
      console.log(this.commentEntity)
      this.commentService.addComment(this.commentEntity).subscribe({
        next:(res)=>{
  console.log("stage4")

          console.log('comment added');
          this.commentForm.reset();
          this.dialogRef.close('Save');
        },error:(err)=>{
          console.log('error  adding domain');
          console.log(err);
        }
      })
    }
  }
  else{
    this.commentEntity.id=this.dataEdit.id
    this.commentEntity.posts=this.dataEdit.posts
    this.commentEntity.user=this.dataEdit.user
    this.commentEntity.content=this.commentForm.get("content")?.value;
    this.commentService.updateComment(this.commentEntity).subscribe({
      next:()=>{
       console.log('comment updated');
       this.commentForm.reset();
       this.dialogRef.close('Update');
      },error:(err)=>{
       console.log('error  updating domain');
       console.log(err);


     }
    })
  }
}



}
