import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/Service/Auth/authentication.service';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  siteKey:string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm!:FormGroup;
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private authService: AuthenticationService, private tokenStorage: TokenStorageService) {
    this.siteKey='6Ldxp8AfAAAAAADVGAy3vllm6bCGcE6QpYWt6dGr';
   }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
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
    const dialfConf=new MatDialogConfig();
    dialfConf.disableClose=true;
    dialfConf.autoFocus=true;
    dialfConf.width="80%";
   
    this.dialog.open(SignupComponent,dialfConf).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
}
