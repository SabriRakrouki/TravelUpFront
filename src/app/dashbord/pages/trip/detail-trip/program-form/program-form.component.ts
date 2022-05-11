import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Program } from 'src/app/Models/Program';
import { ProgramService } from 'src/app/Service/program.service';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {
  actionBtn:string="Save";
  actionTitile:string="Add new Trip";
  programForm!:FormGroup;
  programEntity:Program={
    id:null,
    dateProgram:null,
    description:null,
    trip:null
  }
  constructor(public diagLogRef:MatDialogRef<ProgramFormComponent>,private formBuild:FormBuilder
    ,private programService:ProgramService,@Inject(MAT_DIALOG_DATA)public editData:any) { }

  ngOnInit(): void {
    this.programForm=this.formBuild.group({
      dateProgram:['', Validators.required],
      description:['', Validators.required]
        });
        if(this.editData){
          this.actionBtn="Update";
          this.actionTitile="Update Program";
          this.programForm.controls["dateProgram"].setValue(this.editData.dateProgram)
          this.programForm.controls["description"].setValue(this.editData.description)
        }

  }
addPorgram(){

}
onClose(){

}
}
