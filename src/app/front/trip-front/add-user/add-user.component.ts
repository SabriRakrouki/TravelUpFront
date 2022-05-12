import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
listUser!:Employee[]
  constructor() { }

  ngOnInit(): void {
   
  }
  AddUser(){

  }
  onClose(){

  }
}
