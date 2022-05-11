import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Topic } from 'src/app/Models/Topic';
import { TopicService } from 'src/app/Service/topic.service';
import { TopicFormComponent } from './topic-form/topic-form.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  listTopic!: Topic[];
  dataSource!: MatTableDataSource<Topic>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private topicService:TopicService,private matdialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllTopic()
    this.displayedColumns = ['id', 'nameTopic', 'delete', 'update', 'details'];
    this.dataSource = new MatTableDataSource<Topic>(this.listTopic);

    
    this.ngAfterViewInit();
  }
  getAllTopic(){
    this.topicService.getAllTopic().subscribe({
      next:(res)=>{
        this.listTopic=res;
        this.dataSource = new MatTableDataSource<Topic>(this.listTopic);
        this.dataSource.paginator = this.paginator;
        
      },error:(err)=>{
        console.log(`erorr in geting tpoic: ${err}`)
      }
    })
  }
  deleteTopic(idNumber:any){
    this.topicService.deleteTopic(idNumber).subscribe({
    next: (res) => {
      this.getAllTopic();
      console.log("deleted")
    }, error: (err) => {
      console.log(err)
    }
  })

  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  onCreate() {
    const dialfConf = new MatDialogConfig();
    dialfConf.disableClose = true;
    dialfConf.autoFocus = true;
    dialfConf.width = "60%";
    this.matdialog.open(TopicFormComponent, dialfConf).afterClosed().subscribe((val) => {
      if (val === 'Save') {
        this.getAllTopic();
      }

    });
  }
  onUpdate(row: any) {

    const dialfConf = new MatDialogConfig();
    dialfConf.disableClose = true;
    dialfConf.autoFocus = true;
    dialfConf.width = "60%";
    dialfConf.data = row;
    console.log(row)
    this.matdialog.open(TopicFormComponent, dialfConf,).afterClosed().subscribe((val) => {
      if (val === 'Update') {
        this.getAllTopic()
      }

    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
