import { AfterViewInit, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Complaint } from 'src/app/Models/Complaint';
import { ComplaintService } from 'src/app/Service/complaint.service';
import { ComplaintDetailsComponent } from '../complaint-details/complaint-details.component';
import { FormComplaintComponent } from '../form-complaint/form-complaint/form-complaint.component';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {jsPDF} from "jspdf";
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements AfterViewInit, OnInit {
  dataSource!: MatTableDataSource<Complaint>;
  displayedColumns!: string[];
  listComplaint!: Complaint[];
  type!: ChartType;
  labels!: Label[];
  datasets!: ChartDataSets[];
  options!: ChartOptions;
  colCount: number=3;
  colCountref: number=3;
  colCountwait: number=3;
  constructor(private complaintService: ComplaintService,
    private dialog: MatDialog, private detailsdialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllComplaint();
    this.displayedColumns = ['id', 'content', 'state', 'dateComplaint', 'employeId', 'delete', 'update', 'details'];
    this.dataSource = new MatTableDataSource<Complaint>(this.listComplaint);
    
  }
  getAllComplaint() {
    this.complaintService.getAllComplaints().subscribe((res) => {
      this.listComplaint = res;
      this.dataSource = new MatTableDataSource<Complaint>(this.listComplaint);
      this.colCount = this.calculacc(this.listComplaint);
    this.colCountref = this.calculref(this.listComplaint);
    this.colCountwait = this.calculwait(this.listComplaint);

    this.chart();
    })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  deleteComplaint(idcomplaint: number) {
    this.complaintService.deleteComplaint(idcomplaint).subscribe(() => {
      this.getAllComplaint();
    })
  }
  updateComplaint(row: any) {

    const dialfConf = new MatDialogConfig();
    dialfConf.disableClose = true;
    dialfConf.autoFocus = true;
    dialfConf.width = "60%";
    dialfConf.data = row;
    console.log(row)
    this.dialog.open(FormComplaintComponent, dialfConf,).afterClosed().subscribe((val) => {
      if (val === 'Update') {
        this.getAllComplaint()
      }

    });

  }
  onCreate() {

    const dialfConf = new MatDialogConfig();
    dialfConf.disableClose = true;
    dialfConf.autoFocus = true;
    dialfConf.width = "60%";
    this.dialog.open(FormComplaintComponent, dialfConf).afterClosed().subscribe((val) => {
      if (val === 'Save') {
        this.getAllComplaint()
      }

    });
  }
  detailsComplaint(row: any) {

    const detailsdialog = new MatDialogConfig();
    detailsdialog.disableClose = true;
    detailsdialog.autoFocus = true;
    detailsdialog.width = "60%";
    detailsdialog.data = row;
    console.log(row)
    this.dialog.open(ComplaintDetailsComponent, detailsdialog,).afterClosed().subscribe((val) => {
      this.getAllComplaint()
    });

  }


  calculacc(list: Complaint[]): number {
    let x: number = 0;
    list?.forEach((i) => {
      if (i.state === 'Accepted') {
        x++;
      }

    });
    return x;

  }



  calculref(list: Complaint[]): number {
    let x: number = 0;
    list?.forEach((i) => {
      if (i.state === 'Refused') {
        x++;
      }

    });
    return x;

  }
  calculwait(list: Complaint[]): number {
    let x: number = 0;
    list?.forEach((i) => {
      if (i.state === 'Waiting') {
        x++;
      }

    });
    return x;

  }

  chart() {
    this.type = 'bar';

    this.labels = ['Accepted', 'Refused', 'Waiting'];

    this.datasets = [
      {

        data: [this.colCount, this.colCountref, this.colCountwait],

        label: 'count',

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }];




    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };






  }
  @ViewChild('content') content!:ElementRef;
  makepdf(){
    let pdf = new jsPDF('p','mm',[812,792]);//portrait, milimetre
    
    pdf.html(this.content.nativeElement,{callback:(pdf)=>{pdf.save("list complaints.pdf")}});
    pdf.save();
    }
    


}
