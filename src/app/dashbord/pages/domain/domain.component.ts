import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Domain } from 'src/app/Models/Domain';
import { DomainService } from 'src/app/Service/domain.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
listDomains!:Domain[];
dataSource!:MatTableDataSource<Domain>;
displayedColumns!: string[] ;


  constructor(private domainService:DomainService,private diaglog:MatDialog) { }

  ngOnInit(): void {
    this.getAllDomain();
    this.displayedColumns=['id','domainName'];
    this.dataSource=new MatTableDataSource<Domain>(this.listDomains);
  }
getAllDomain(){
  this.domainService.getAllDomain().subscribe((res)=>{
    this.listDomains=res;
  })
}





}
