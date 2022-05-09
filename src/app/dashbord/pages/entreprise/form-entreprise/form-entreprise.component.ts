import { Component,Inject ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entreprise } from 'src/app/Models/Entreprise';
import { EntrepriseService } from 'src/app/Service/entreprise.service';

@Component({
  selector: 'app-form-entreprise',
  templateUrl: './form-entreprise.component.html',
  styleUrls: ['./form-entreprise.component.css']
})
export class FormEntrepriseComponent implements OnInit {
  actionTitile:string="New Entreprise";
  actionBtn:string="Save";
  entrepriseForm!:FormGroup;
  entrepriseEntity:Entreprise={
    id:null,
    username:null,
    capacity:null,
    dateCreation:null,
    domain:null,
    email:null,
    employees:null,
    invitations:null,
    name:null,
    password:null,
    phoneNumber:null,
    photo:null,
    resgistrationNumber:null,
    trips:null
  };

  constructor(private entrepriseService:EntrepriseService, private formBuilder: FormBuilder,public dialogRef: MatDialogRef<FormEntrepriseComponent>,@Inject(MAT_DIALOG_DATA) public editDate:any) { }

  ngOnInit(): void {
    this.entrepriseForm=this.formBuilder.group({
      resgistrationNumber:['', Validators.required],
      name: ['', [Validators.required,Validators.minLength(3)]],
      capacity: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      password: ['', [Validators.required,Validators.minLength(3)]],
      phoneNumber: ['', Validators.required],
      username: ['', [Validators.required,Validators.minLength(3)]],
    });
    if(this.editDate){

      this.actionBtn="Update";
      this.actionTitile="Update Trip";
      
      this.entrepriseForm.controls["username"].setValue(this.editDate.username)
      this.entrepriseForm.controls["email"].setValue(this.editDate.email)
      this.entrepriseForm.controls["resgistrationNumber"].setValue(this.editDate.resgistrationNumber)
      this.entrepriseForm.controls["name"].setValue(this.editDate.name)
      this.entrepriseForm.controls["password"].setValue(this.editDate.password)
      this.entrepriseForm.controls["phoneNumber"].setValue(this.editDate.phoneNumber)
      this.entrepriseForm.controls["capacity"].setValue(this.editDate.capacity)
  
    }
  }
  addEntreprise(){
    console.log("test button")
    if(!this.editDate){
      console.log("create")
      if(this.entrepriseForm.valid){
        this.entrepriseService.addEntreprise(this.entrepriseForm.value).subscribe({
          next:()=>{
            console.log("added")
            this.entrepriseForm.reset();
            this.dialogRef.close("Save")
          },error:()=>{
            console.log("error adding entreprise")
          }
        })
      }
    }else{
      this.entrepriseEntity.id=this.editDate.id
      this.entrepriseEntity.username=this.entrepriseForm.get('username')?.value
      this.entrepriseEntity.email=this.entrepriseForm.get('email')?.value
      this.entrepriseEntity.resgistrationNumber=this.entrepriseForm.get('resgistrationNumber')?.value
      this.entrepriseEntity.name=this.entrepriseForm.get('name')?.value
      this.entrepriseEntity.capacity=this.entrepriseForm.get('capacity')?.value
      this.entrepriseEntity.password=this.entrepriseForm.get('password')?.value
      this.entrepriseEntity.phoneNumber=this.entrepriseForm.get('phoneNumber')?.value
      this.entrepriseEntity.dateCreation=this.editDate.dateCreation;
      console.log(this.editDate.dateCreation)
      console.log("update")
      this.entrepriseService.editEntreprise(this.editDate.id,this.entrepriseEntity).subscribe({
        next:(res)=>{
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
