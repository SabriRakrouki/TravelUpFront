import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comment } from 'src/app/Models/Comment';
import { CommentService } from 'src/app/Service/comment.service';
import { CommentFormComponent } from './comment-form/comment-form.component';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  dataSource!:MatTableDataSource<Comment>;
  displayedColumns!: string[] ;
  listComment!:Comment[];
  search!:string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private commentService:CommentService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllComment()
    this.displayedColumns=['id', 'comment', 'user', 'post','delete','update','Details'];
   this.dataSource = new MatTableDataSource<Comment>(this.listComment);
    
  }
  getAllComment(){
    this.commentService.getAllComment().subscribe({
      next:(res)=>{
        this.listComment=res
        this.dataSource = new MatTableDataSource<Comment>(this.listComment);
      this.dataSource.paginator = this.paginator;
      },error:(err)=>{
      console.log("error getting Comment")

      }
    })
  }
  deleteComment(idComment:any){
    this.commentService.deleteComment(idComment).subscribe({
      next:(res)=>{
        console.log('comment canceled')
      },error:()=>{
        console.log('error delete comment')
      }
    })

  }
  onCreate(){
  
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="60%";
    this.dialog.open(CommentFormComponent,dialfConf).afterClosed().subscribe((val)=>{
      if(val==='Save'){
        this.getAllComment();
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
    this.dialog.open(CommentFormComponent,dialfConf,).afterClosed().subscribe((val)=>{
      if(val==='Update'){
        this.getAllComment()
      }
    
    });
  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
