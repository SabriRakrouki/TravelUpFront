import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Complaint } from 'src/app/Models/Complaint';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css']
})
export class ComplaintDetailsComponent implements OnInit {
  complaintForm!:FormGroup;
  entrepriseComplaint:Complaint={
    id:null,
    content:null,
    state:null,
    dateComplaint:null,
    employeId:null
  }
  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ComplaintDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public editDate:any) { }

  ngOnInit(): void {
    this.complaintForm=this.formBuilder.group({
      content:['', Validators.required],
      state: ['', [Validators.required,Validators.required]],
      dateComplaint: ['', Validators.required],
      employeId: ['', [Validators.required]],
    });
    this.entrepriseComplaint.id=this.editDate.id
    this.complaintForm.controls["content"].setValue(this.editDate.content)
    this.complaintForm.controls["state"].setValue(this.editDate.state)
    this.complaintForm.controls["dateComplaint"].setValue(this.editDate.dateComplaint)
    this.complaintForm.controls["employeId"].setValue(this.editDate.employeId)
  }
  onClose() {
    this.dialogRef.close()
  }
}
