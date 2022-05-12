import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvitationService } from 'src/app/Service/invitation.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
fileName:any;
  constructor(private invitationService:InvitationService,private formBuilder: FormBuilder) { }
pathfile!:string;
file!: File ;
invForm!:FormGroup;
  ngOnInit(): void {
    this.invitationService.test()
    this.invForm=this.formBuilder.group({
      path:['', Validators.required]
    });
  }





addInvitation (){
this.invitationService.addInvitation(this.invForm.get('path')?.value).subscribe({
  next:(res)=>{
    console.log("succes")
  },error:(err)=>{
    console.log(err)
  }
})
}



onFilechange(event: any) {
  console.log(event.target.files[0])
  this.file = event.target.files[0]
}

upload() {
  if (this.file) {
    this.invitationService.uploadfile(this.file).subscribe(resp => {
      alert("Uploaded")
    })
  } else {
    alert("Please select a file first")
  }
}
}
