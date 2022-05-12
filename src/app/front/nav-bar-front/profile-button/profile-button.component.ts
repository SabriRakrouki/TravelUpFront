import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.css']
})
export class ProfileButtonComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  GoToProfile(){
    console.log("test")
    this.route.navigate(['/home/profile']);
  }
}
