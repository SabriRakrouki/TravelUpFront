import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/Models/Program';
import { Trip } from 'src/app/Models/TripModel';
import { ProgramService } from 'src/app/Service/program.service';
import { TripService } from 'src/app/Service/trip.service';
import { ProgramFormComponent } from './program-form/program-form.component';

@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.css']
})
export class DetailTripComponent implements OnInit {
  dataSource!: MatTableDataSource<Program>;
  displayedColumns!: string[];
  listProgram!: Program[];
  parmurl!: any
  trip: Trip = { arrivalDate: null, attribution: null, compteur: 0, departDate: null, description: null, employee: null, entreprise: null, id: null, note: null, programs: null, rating: null, totalattribution: null, tripLocation: null };
  constructor(private activatedroute: ActivatedRoute, private tripService: TripService, private dialog: MatDialog,private programService:ProgramService) { }

  ngOnInit(): void {
   
    this.displayedColumns = ['id', 'tripId', 'dateProgram', 'description','delete','update','details'];
    
    this.parmurl = this.activatedroute.snapshot.params.id;
    this.getTripById(this.parmurl);
    this.programService.getProgramsByTrip(this.parmurl).subscribe((res)=>{
      this.listProgram=res;
    this.dataSource = new MatTableDataSource<Program>(this.listProgram);
    });
    

  }
  getTripById(id: any) {
    this.tripService.getTripById(id).subscribe((res) => {
      this.trip = res;
    });
  }
  onUpdate(test:any){

  }
deleteProgram(Num:any){

}
onCreate(){
  
  const dialfConf=new MatDialogConfig();
  dialfConf.disableClose=true;
  dialfConf.autoFocus=true;
  dialfConf.width="60%";
  this.dialog.open(ProgramFormComponent,dialfConf).afterClosed().subscribe((val)=>{
    if(val==='Save'){
      this.getTripById(this.parmurl);
    }
  
  });
}







}
