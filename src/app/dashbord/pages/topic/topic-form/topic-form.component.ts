import { Component, Inject,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Topic } from 'src/app/Models/Topic';
import { TopicService } from 'src/app/Service/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {
  actionBtn: string = "Save";
  listTopic!:Topic[]
  actionTitile: string = "Add new Topic";
  topicForm!: FormGroup;
  topicEntity:Topic={
    id:null,
    nameTopic:null
  }
  constructor(private topicService:TopicService,private formBuilder:FormBuilder, 
    public dialogRef:MatDialogRef<TopicFormComponent>,@Inject(MAT_DIALOG_DATA) public dataEdit:any ) { }

  ngOnInit(): void {
    this.topicForm=this.formBuilder.group({
      nameTopic:['',[Validators.required,Validators.minLength(3)]]
    });
    if(this.dataEdit){
      this.actionBtn="Update";
      this.actionTitile="Update Topic"
      this.topicForm.controls['nameTopic'].setValue(this.dataEdit.nameTopic)
    }

  }
  onClose() {
    this.dialogRef.close();
  }


  addTopic(){
    if(!this.dataEdit){
      if(this.topicForm.valid){
        this.topicEntity.nameTopic=this.topicForm.get('nameTopic')?.value;
        this.topicService.addTopic(this.topicEntity).subscribe({
          next:(res)=>{
            console.log('topic added')
            this.topicForm.reset();
            this.dialogRef.close('Save');
          },error:(err)=>{
            console.log(`error adding topic :${err}`)
          }
        })
      }
    }else{
      this.topicEntity.id=this.dataEdit.id;
      this.topicEntity.nameTopic=this.topicForm.get('nameTopic')?.value;
      this.topicService.updateTopic(this.topicEntity).subscribe({
        next:(res)=>{
          console.log('topic updated')
          this.topicForm.reset();
          this.dialogRef.close('Update')
          
        },error:(err)=>{
            console.log(`error in update :${err}`)
        }
      })
    }
  }
  

}
