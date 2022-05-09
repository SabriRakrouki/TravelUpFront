import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Complaint } from 'src/app/Models/Complaint';
import { ComplaintService } from 'src/app/Service/complaint.service';
import { FormComplaintComponent } from '../form-complaint/form-complaint/form-complaint.component';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements  AfterViewInit,OnInit {
  dataSource!:MatTableDataSource<Complaint>;
  displayedColumns!: string[] ;
  listComplaint!:Complaint[];
  constructor(private complaintService:ComplaintService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllComplaint();
    this.displayedColumns=['id', 'content', 'state','dateComplaint','employeId','delete','update'];
    this.dataSource = new MatTableDataSource<Complaint>(this.listComplaint);
   }
   getAllComplaint(){
    this.complaintService.getAllComplaints().subscribe((res)=>{this.listComplaint=res;
      this.dataSource = new MatTableDataSource<Complaint>(this.listComplaint);
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  deleteComplaint(idcomplaint:number){

    
    this.complaintService.deleteComplaint(idcomplaint).subscribe(()=>{
      this.getAllComplaint();
    })
  }
  updateComplaint(row:any){
  
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    dialfConf.data=row;
    console.log(row)
    this.dialog.open(FormComplaintComponent,dialfConf,).afterClosed().subscribe((val)=>{
      if(val==='Update'){
        this.getAllComplaint()
      }
    
    });
    
  }
  onCreate(){
  
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    this.dialog.open(FormComplaintComponent,dialfConf).afterClosed().subscribe((val)=>{
      if(val==='Save'){
        this.getAllComplaint()
      }
    
    });
}

}
