import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TripService } from 'src/app/Service/trip.service';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationModel } from 'src/app/Models/LocationModel';
import { LocationService } from 'src/app/Service/location.service';
import { Trip } from 'src/app/Models/TripModel';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  tripForm!: FormGroup;
  listCountry!: LocationModel[];
  listState!: LocationModel[];
  listCities!: LocationModel[];
  location:LocationModel={
    id:null,
    city:null,
    country:null,
    countryTag:null,
    state:null,
    stateTage:null
  };

  tripEntity:Trip={
    id:null,
    arrivalDate:null,
    attribution:null,
    compteur:0,
    departDate:null,
    description:null,
    employee:null,
    entreprise:null,
    note:0,
    programs:null,
    rating:0,
    totalattribution:0,
    tripLocation:null
  }
  actionBtn:string="Save";
  actionTitile:string="Add new Trip";



  constructor(public service: TripService, public dialogRef: MatDialogRef<FormComponent>
    , private formBuilder: FormBuilder, private locationService: LocationService,@Inject(MAT_DIALOG_DATA) public editDate:any) { }

  ngOnInit(): void {
    this.getCountryList();
    this.tripForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      description: [''],
      employee: ['', Validators.required],
      entreprise: ['', Validators.required],
      departDate: ['', Validators.required],
      arrivalDate: ['', Validators.required],
    })
  if(this.editDate){

    this.actionBtn="Update";
    this.actionTitile="Update Trip";
    console.log(this.editDate.tripLocation.countryTag)
    this.tripForm.controls["country"].setValue(this.editDate.tripLocation.countryTag)
    this.tripForm.controls["state"].setValue(this.editDate.tripLocation.stateTage)
    this.tripForm.controls["city"].setValue(this.editDate.tripLocation.city)
    this.tripForm.controls["description"].setValue(this.editDate.description)
    this.tripForm.controls["arrivalDate"].setValue(this.editDate.arrivalDate)
    this.tripForm.controls["departDate"].setValue(this.editDate.departDate)
    this.tripForm.controls["entreprise"].setValue(this.editDate.entreprise)
    this.tripForm.controls["employee"].setValue(this.editDate.employee)

  }
  }

  onClose() {
    this.dialogRef.close()
  }
  getCountryList() {
    this.locationService.getAllCounrties().subscribe({
      next: (res) => {
        this.listCountry = res;

      }, error: () => {
        console.log("error parsing the country location")
      }
    })
  }
  getStateByCountry(country: LocationModel) {
  
    console.log(this.location);
    console.log()
    this.locationService.getStateByCountri(country.countryTag).subscribe({
      next: (res) => {
        this.listState = res;
        console.log(res)

      }, error: () => {
        console.log("error parsing the state location")

      }
    });
  }

  getCityByCountryAndState(state:LocationModel) {
    
    console.log(state.stateTage)
    this.locationService.getCitiesbyCountryAndState(state.countryTag, state.stateTage).subscribe({
      next: (res) => {
        this.listCities = res;
        console.log(res);
      }, error: () => {
        console.log("error parsing cities location");
      }
    })
  }

 


  addTrip() {
    
 if(!this.editDate){
  if (this.tripForm.valid) {
    let daoCountry:LocationModel= this.tripForm.get('country')?.value;
    let daoState:LocationModel= this.tripForm.get('state')?.value;  
    this.location.country=daoCountry.country;
    this.location.countryTag=daoCountry.countryTag;
    this.location.state=daoState.state;
    this.location.stateTage=daoState.stateTage;
    this.location.city=this.tripForm.get('city')?.value;
    this.tripEntity.arrivalDate=this.tripForm.get('arrivalDate')?.value;
        this.tripEntity.departDate=this.tripForm.get('departDate')?.value;
        this.tripEntity.description=this.tripForm.get('description')?.value;
    this.locationService.addLocation(this.location).subscribe({
      next:(res)=>{
        console.log("stage 1")
        
        this.service.addTrip(this.tripEntity).subscribe({
          next:(resTrip)=>{
        console.log("stage 2")

            this.locationService.addLocationToTrip(res.id,resTrip.id).subscribe({
              next:(res)=>{
                console.log("stage 3")
                this.tripForm.reset();
                this.dialogRef.close('Save')
                console.log("succes")
              },error:()=>{
                console.log("erro adding location to trip")
              }
            });
          },error:()=>{
            console.log("error adding trip")
          }
        })
      },error:()=>{
        console.log("error adding location")
      }
    });
    


  }
 }else {
    let daoCountry:LocationModel= this.tripForm.get('country')?.value;
    let daoState:LocationModel= this.tripForm.get('state')?.value;  
    this.location.country=daoCountry.country;
    this.location.countryTag=daoCountry.countryTag;
    this.location.state=daoState.state;
    this.location.stateTage=daoState.stateTage;
    this.location.city=this.tripForm.get('city')?.value;
    this.tripEntity.arrivalDate=this.tripForm.get('arrivalDate')?.value;
        this.tripEntity.departDate=this.tripForm.get('departDate')?.value;
        this.tripEntity.description=this.tripForm.get('description')?.value;
        this.tripEntity.id=this.editDate.id;
    this.locationService.addLocation(this.location).subscribe({
      next:(res)=>{
        console.log("stage 1")
        
        this.service.editTrip(this.editDate.id,this.tripEntity).subscribe({
          next:(resTrip)=>{
        console.log("stage 2")

            this.locationService.addLocationToTrip(res.id,this.editDate.id).subscribe({
              next:(res)=>{
                console.log("stage 3")
                this.tripForm.reset();
                this.dialogRef.close('Update');
                console.log("succes")
              },error:()=>{
                console.log("erro adding location to trip")
              }
            });
          },error:()=>{
            console.log("error adding trip")
          }
        })
      },error:()=>{
        console.log("error adding location")
      }
    });
    



 
  }

  }
}
