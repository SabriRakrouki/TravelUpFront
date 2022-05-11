import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Position } from 'src/app/Models/Postion';
import { PositionService } from 'src/app/Service/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit {
  actionBtn: string = "Save";
  actionTitile: string = "Add new Position";
  positionForm!: FormGroup;
  positionEntity:Position={
    id:null,
    potionName:null
  }
  constructor(private positionService:PositionService,private formBuilder:FormBuilder,
    public dialogRef:MatDialogRef<PositionFormComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.positionForm=this.formBuilder.group({
      postion: ['', [Validators.required, Validators.minLength(3)]]
    })
    if (this.editData) {

      this.actionBtn = "Update";
      this.actionTitile = "Update Position";
      this.positionForm.controls["postion"].setValue(this.editData.domain)
    }
  }
  onClose() {
    this.dialogRef.close()
  }
  addPositon(){
    console.log(this.positionForm.value)
    if(!this.editData){
      if (this.positionForm.valid) {
       
        this.positionEntity.potionName=this.positionForm.get("postion")?.value
          this.positionService.addPosition(this.positionEntity).subscribe({
            next:(res)=>{
              console.log('domain added');
              this.positionForm.reset();
              this.dialogRef.close('Save');
            },error:(err)=>{
              console.log('error  adding domain');
              console.log(err);
  
  
            }
          })
        
        
    
      }
     }else {
        this.positionEntity.id=this.editData.id;

        this.positionEntity.potionName=this.positionForm.get("postion")?.value
    console.log(this.positionEntity)

       this.positionService.updatePosition(this.positionEntity).subscribe({
         next:()=>{
          console.log('domain updated');
          this.positionForm.reset();
          this.dialogRef.close('Update');
         },error:(err)=>{
          console.log('error  updating domain');
          console.log(err);
  
  
        }
       })
       
        
        
    
    
    
     
      }
    
  }
}
