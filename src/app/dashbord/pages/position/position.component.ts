import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Position } from 'src/app/Models/Postion';
import { PositionService } from 'src/app/Service/position.service';
import { PositionFormComponent } from './position-form/position-form.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  listPosition!: Position[];
  dataSource!: MatTableDataSource<Position>;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private positionService: PositionService, private diaglog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPosition();
    this.displayedColumns = ['id', 'namePosition', 'delete', 'update', 'details'];
    this.dataSource = new MatTableDataSource<Position>(this.listPosition);

  }
  getAllPosition() {
    this.positionService.getAllPosition().subscribe({
      next: (res) => {
        this.listPosition = res;
        this.dataSource = new MatTableDataSource<Position>(this.listPosition);

      }, error(err) {
        console.log(err)
      }
    })
  }
  deletePosition(idPosition: any) {
    this.positionService.deletePostiion(idPosition).subscribe({
      next: (res) => {
        this.getAllPosition()
        console.log("Position deleted")
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onCreate() {

    const dialfConf = new MatDialogConfig();
    dialfConf.disableClose = true;
    dialfConf.autoFocus = true;
    dialfConf.width = "30%";
    this.diaglog.open(PositionFormComponent, dialfConf).afterClosed().subscribe((val) => {
      if (val === 'Save') {
        this.getAllPosition();
      }

    });
  }
  onUpdate(row: any) {

    const dialfConf = new MatDialogConfig();
    dialfConf.disableClose = true;
    dialfConf.autoFocus = true;
    dialfConf.width = "30%";
    dialfConf.data = row;
    console.log(row)
    this.diaglog.open(PositionFormComponent, dialfConf,).afterClosed().subscribe((val) => {
      if (val === 'Update') {
        this.getAllPosition()
      }

    });


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

