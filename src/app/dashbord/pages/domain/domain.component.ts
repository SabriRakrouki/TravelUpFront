import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Domain } from 'src/app/Models/Domain';
import { DomainService } from 'src/app/Service/domain.service';
import { DomainFormComponent } from './domain-form/domain-form.component';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
listDomains!:Domain[];
dataSource!:MatTableDataSource<Domain>;
displayedColumns!: string[] ;
length = 100;
pageSize = 10;
pageSizeOptions: number[] = [5, 10, 25, 100];
pageEvent!: PageEvent;
listData!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private domainService:DomainService,private diaglog:MatDialog) { }

  ngOnInit(): void {
    this.getAllDomain();
    this.displayedColumns=['id','nameDomain','delete','update','details'];
    this.dataSource=new MatTableDataSource<Domain>(this.listDomains);
    this.ngAfterViewInit();
   
  }
getAllDomain(){
  this.domainService.getAllDomain().subscribe((res)=>{
    this.listDomains=res;
    this.dataSource=new MatTableDataSource<Domain>(this.listDomains);
    this.dataSource.paginator = this.paginator;
    
  })
}
deleteDomain(idNumber:any){
this.domainService.deleteDomain(idNumber).subscribe({
  next:(res)=>{
    this.getAllDomain();
  },error:(err)=>{
    console.log(err)
  }
})
}


setPageSizeOptions(setPageSizeOptionsInput: string) {
  if (setPageSizeOptionsInput) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
onCreate(){
  
  const dialfConf=new MatDialogConfig();
  dialfConf.disableClose=true;
  dialfConf.autoFocus=true;
  dialfConf.width="60%";
  this.diaglog.open(DomainFormComponent,dialfConf).afterClosed().subscribe((val)=>{
    if(val==='Save'){
      this.getAllDomain();
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
  this.diaglog.open(DomainFormComponent,dialfConf,).afterClosed().subscribe((val)=>{
    if(val==='Update'){
      this.getAllDomain()
    }
  
  });

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}



}
