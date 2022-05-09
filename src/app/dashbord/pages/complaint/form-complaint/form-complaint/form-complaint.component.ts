import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Complaint } from 'src/app/Models/Complaint';
import { ComplaintService } from 'src/app/Service/complaint.service';

@Component({
  selector: 'app-form-complaint',
  templateUrl: './form-complaint.component.html',
  styleUrls: ['./form-complaint.component.css']
})
export class FormComplaintComponent implements OnInit {
  actionTitile:string="New Entreprise";
  actionBtn:string="Save";
  complaintForm!:FormGroup;
  entrepriseComplaint:Complaint={
    id:null,
    content:null,
    state:null,
    dateComplaint:null,
    employeId:null
  }
  constructor(private complaintService:ComplaintService,
     private formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<FormComplaintComponent>,
    @Inject(MAT_DIALOG_DATA) public editDate:any) { }

    ngOnInit(): void {
      this.complaintForm=this.formBuilder.group({
        content:['', Validators.required],
        state: ['', [Validators.required,Validators.required]],
        dateComplaint: ['', Validators.required],
        employeId: ['', [Validators.required]],
      });
      if(this.editDate){

        this.actionBtn="Update";
        this.actionTitile="Update Trip";
        
        this.complaintForm.controls["content"].setValue(this.editDate.content)
        this.complaintForm.controls["state"].setValue(this.editDate.state)
        this.complaintForm.controls["dateComplaint"].setValue(this.editDate.dateComplaint)
        this.complaintForm.controls["employeId"].setValue(this.editDate.employeId)
      }
    }
    addComplaint(){
      console.log("test button")
      if(!this.editDate){
        console.log("create")
        if(this.complaintForm.valid){
          this.complaintService.addComplaintt(this.complaintForm.value).subscribe({
            next:()=>{
              console.log("added")
              this.complaintForm.reset();
              this.dialogRef.close("Save")
            },error:()=>{
              console.log("error adding complaint")
            }
          })
        }
      }else{
        this.entrepriseComplaint.id=this.editDate.id
        this.entrepriseComplaint.content=this.complaintForm.get('content')?.value
        this.entrepriseComplaint.state=this.complaintForm.get('state')?.value
        this.entrepriseComplaint.dateComplaint=this.complaintForm.get('dateComplaint')?.value
        this.entrepriseComplaint.employeId=this.complaintForm.get('employeId')?.value
        console.log(this.editDate.dateCreation)
        console.log("update")
        this.complaintService.updateComplaint(this.editDate.id,this.entrepriseComplaint).subscribe({
          next:(res)=>{
            this.complaintForm.reset()
            this.dialogRef.close("Update")
            console.log("update succefuly");
          },error:(error)=>{
            console.log(error.message);
          }
        })
        
      }
    }
    onClose() {
      this.dialogRef.close()
    }
}
