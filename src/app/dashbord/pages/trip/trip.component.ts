import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { Trip } from 'src/app/Models/TripModel';
import { TripService } from 'src/app/Service/trip.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { LocationModel } from 'src/app/Models/LocationModel';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements AfterViewInit,OnInit {
  dataSource!:MatTableDataSource<Trip>;
  displayedColumns!: string[] ;
  listTrip!:Trip[];
  
  constructor(private tripService:TripService,private dialog:MatDialog){

  }
  ngOnInit(): void {
  this.getAllTrip()
  
   this.displayedColumns=['id', 'tripLocation', 'description', 'entreprise','employee','departDate','arrivalDate','delete','update','Details'];
   this.dataSource = new MatTableDataSource<Trip>(this.listTrip);
  }
  getAllTrip(){
    this.tripService.getAllTrips().subscribe((res)=>{this.listTrip=res;
      this.dataSource = new MatTableDataSource<Trip>(this.listTrip);
    })
  }
 
  deleteTrip(idtrip:number){
    this.tripService.deleteTrip(idtrip).subscribe(()=>{
      this.getAllTrip();
    })
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

onCreate(){
  
  const dialfConf=new MatDialogConfig();
  dialfConf.disableClose=true;
  dialfConf.autoFocus=true;
  dialfConf.width="60%";
  this.dialog.open(FormComponent,dialfConf).afterClosed().subscribe((val)=>{
    if(val==='Save'){
      this.getAllTrip();
    }
  
  });
}
onUpdate(row:any){
  
  const dialfConf=new MatDialogConfig();
  dialfConf.disableClose=true;
  dialfConf.autoFocus=true;
  dialfConf.width="60%";
  dialfConf.data=row;
  console.log(row)
  this.dialog.open(FormComponent,dialfConf,).afterClosed().subscribe((val)=>{
    if(val==='Update'){
      this.getAllTrip()
    }
  
  });

}
onDetails(row:any){
  
}


}

