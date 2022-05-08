import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/Service/Auth/authentication.service';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm!:FormGroup;
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private authService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        window.location.href ='/dashbord';
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  CreateAucc(){
    const dialogRef = this.dialog.open(SignupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
