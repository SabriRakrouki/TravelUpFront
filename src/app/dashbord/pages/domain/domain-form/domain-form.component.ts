import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Domain } from 'src/app/Models/Domain';
import { DomainService } from 'src/app/Service/domain.service';

@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.css']
})
export class DomainFormComponent implements OnInit {
  actionBtn: string = "Save";
  actionTitile: string = "Add new Domain";
  domainForm!: FormGroup;
  domaiEntity:Domain={
    id:null,
    nameDomain:null
  }
  constructor(private domainService: DomainService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DomainFormComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.domainForm = this.formBuilder.group({
      domain: ['', [Validators.required, Validators.minLength(3)]],
    })
    if (this.editData) {

      this.actionBtn = "Update";
      this.actionTitile = "Update Domain";
      this.domainForm.controls["domain"].setValue(this.editData.domain)
    }
  }
  onClose() {
    this.dialogRef.close()
  }

addDomain(){
  console.log(this.domainForm.value)
  if(!this.editData){
    if (this.domainForm.valid) {
     
      this.domaiEntity.nameDomain=this.domainForm.get("domain")?.value
        this.domainService.addDomain(this.domaiEntity).subscribe({
          next:(res)=>{
            console.log('domain added');
            this.domainForm.reset();
            this.dialogRef.close('Save');
          },error:(err)=>{
            console.log('error  adding domain');
            console.log(err);


          }
        })
      
      
  
    }
   }else {
      this.domaiEntity.id=this.editData.id;
      this.domaiEntity.nameDomain=this.domainForm.get("domain")?.value
     this.domainService.editDomain(this.domaiEntity).subscribe({
       next:()=>{
        console.log('domain updated');
        this.domainForm.reset();
        this.dialogRef.close('Update');
       },error:(err)=>{
        console.log('error  updating domain');
        console.log(err);


      }
     })
     
      
      
  
  
  
   
    }
  
}
}
