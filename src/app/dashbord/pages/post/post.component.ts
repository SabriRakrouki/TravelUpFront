import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Service/post.service';
import { PostFormComponent } from './post-form/post-form.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  listPosts!: Post[];
  dataSource!: MatTableDataSource<Post>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private postService: PostService, private matdialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'subject', 'content','datePost','topic','photo','delete', 'update', 'details'];
    this.dataSource = new MatTableDataSource<Post>(this.listPosts);

    this.getAllPosts();
    this.ngAfterViewInit();

  }
  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        this.listPosts = res
        this.dataSource = new MatTableDataSource<Post>(this.listPosts);
        this.dataSource.paginator = this.paginator;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  deletePost(idNumber: any) {
    this.postService.deletePost(idNumber).subscribe({
      next: (res) => {
        this.getAllPosts();
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
    this.matdialog.open(PostFormComponent, dialfConf).afterClosed().subscribe((val) => {
      if (val === 'Save') {
        this.getAllPosts();
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
    this.matdialog.open(PostFormComponent, dialfConf,).afterClosed().subscribe((val) => {
      if (val === 'Update') {
        this.getAllPosts()
      }

    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
