import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig  } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Entreprise } from 'src/app/Models/Entreprise';
import { EntrepriseService } from 'src/app/Service/entreprise.service';
import {MatPaginator} from '@angular/material/paginator';
import { FormComponent } from '../trip/form/form.component';
import { FormEntrepriseComponent } from './form-entreprise/form-entreprise.component';
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements AfterViewInit,OnInit {
  dataSource!:MatTableDataSource<Entreprise>;
  displayedColumns!: string[] ;
  listEntreprise!:Entreprise[];
  constructor(private entrepriseService:EntrepriseService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllEntreprise();
   this.displayedColumns=['id', 'resgistrationNumber', 'capacity','username','email','phoneNumber','dateCreation','delete','update'];
   this.dataSource = new MatTableDataSource<Entreprise>(this.listEntreprise);
  }
  getAllEntreprise(){
    this.entrepriseService.getAllEntreprises().subscribe((res)=>{this.listEntreprise=res;
      this.dataSource = new MatTableDataSource<Entreprise>(this.listEntreprise);
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  deleteEntreprise(identreprise:number){

    
    this.entrepriseService.deleteEntreprise(identreprise).subscribe(()=>{
      this.getAllEntreprise();
    })
  }
  updateEntreprise(row:any){
  
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    dialfConf.data=row;
    console.log(row)
    this.dialog.open(FormEntrepriseComponent,dialfConf,).afterClosed().subscribe((val)=>{
      if(val==='Update'){
        this.getAllEntreprise()
      }
    
    });
    
  }
  onCreate(){
  
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    this.dialog.open(FormEntrepriseComponent,dialfConf).afterClosed().subscribe((val)=>{
      if(val==='Save'){
        this.getAllEntreprise()
      }
    
    });
}}
