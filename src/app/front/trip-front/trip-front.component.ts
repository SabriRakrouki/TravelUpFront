import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from 'src/app/Models/TripModel';
import { TripService } from 'src/app/Service/trip.service';
import { AddUserComponent } from './add-user/add-user.component';
import { FormTripComponent } from './form-trip/form-trip.component';

@Component({
  selector: 'app-trip-front',
  templateUrl: './trip-front.component.html',
  styleUrls: ['./trip-front.component.css']
})
export class TripFrontComponent implements OnInit {
  dataSource!:MatTableDataSource<Trip>;
  displayedColumns!: string[] ;
  listTrip!:Trip[];
  search!:string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private tripService:TripService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllTrip()
    this.displayedColumns=['id', 'tripLocation', 'description', 'entreprise','employee','departDate','arrivalDate','delete','update','Details','AddUser'];
    this.dataSource = new MatTableDataSource<Trip>(this.listTrip);
    this.ngAfterViewInit();
  }
  getAllTrip(){
    this.tripService.getAllTrips().subscribe((res)=>{this.listTrip=res;
      this.dataSource = new MatTableDataSource<Trip>(this.listTrip);
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteTrip(idtrip:number){
    this.tripService.deleteTrip(idtrip).subscribe(()=>{
      this.getAllTrip();
    })
  }
  onCreate(){
  
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    this.dialog.open(FormTripComponent,dialfConf).afterClosed().subscribe((val)=>{
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
    this.dialog.open(FormTripComponent,dialfConf,).afterClosed().subscribe((val)=>{
      if(val==='Update'){
        this.getAllTrip()
      }
    
    });
  
  }
  addUser(){
    
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    this.dialog.open(AddUserComponent,dialfConf).afterClosed().subscribe((val)=>{
      if(val==='Save'){
        this.getAllTrip();
      }
    
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
