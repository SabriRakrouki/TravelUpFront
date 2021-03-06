import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Domain } from 'src/app/Models/Domain';
import { Entreprise } from 'src/app/Models/Entreprise';
import { LocationModel } from 'src/app/Models/LocationModel';
import { DomainService } from 'src/app/Service/domain.service';
import { EntrepriseService } from 'src/app/Service/entreprise.service';
import { LocationService } from 'src/app/Service/location.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myControl = new FormControl();
  listCountries!:LocationModel[];
  listStates!:LocationModel[];
  listCities!:LocationModel[];

 listDomain!:Domain[];
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
  constructor(private entrepriseService:EntrepriseService,
    private domainService:DomainService,
    private locationService:LocationService,
     private formBuilder: FormBuilder,
     public dialog: MatDialogRef<SignupComponent>) {

      }

  ngOnInit(): void {
    this.getCountryList()
    this.getAllDomain();
    this.entrepriseForm=this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      domain:['', Validators.required],
      resgistrationNumber:['', Validators.required],
      name: ['', [Validators.required,Validators.minLength(3)]],
      capacity: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      password: ['', [Validators.required,Validators.minLength(3)]],
      phoneNumber: ['', Validators.required],
      username: ['', [Validators.required,Validators.minLength(3)]],
    });
  }
  onClose(){
  this.dialog.close();
}
getAllDomain(){
  this.domainService.getAllDomain().subscribe((res)=>{
    this.listDomain=res;
  })
}

addEntreprise(){
  console.log("test button")
    if(this.entrepriseForm.valid){
      this.entrepriseService.addEntreprise(this.entrepriseForm.value).subscribe({
        next:()=>{
          console.log("added")
          this.entrepriseForm.reset();
          this.dialog.close("Save")
        },error:()=>{
          console.log("error adding entreprise")
        }
      })
    }
  }
  getCountryList() {
    this.locationService.getAllCounrties().subscribe({
      next: (res) => {
        this.listCountries = res;

      }, error: () => {
        console.log("error parsing the country location")
      }
    })
  }
  getStateByCountry(country: LocationModel) {
  
    
    console.log()
    this.locationService.getStateByCountri(country.countryTag).subscribe({
      next: (res) => {
        this.listStates = res;
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
}
