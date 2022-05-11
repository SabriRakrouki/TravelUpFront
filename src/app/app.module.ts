import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './dashbord/component/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { TripComponent } from './dashbord/pages/trip/trip.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './dashbord/pages/trip/form/form.component';
import { LocationPipe } from './utile/LocationPipe';


import { DetailTripComponent } from './dashbord/pages/trip/detail-trip/detail-trip.component';
import { ProgramFormComponent } from './dashbord/pages/trip/detail-trip/program-form/program-form.component';

import { UserComponent } from './dashbord/pages/user/user.component';
import { UserFormComponent } from './dashbord/pages/user/user-form/user-form.component';
import { LoginComponent } from './dashbord/login/login.component';
import { MaterialUiModule } from './MaterialUi/material-ui.module';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseComponent } from './dashbord/pages/entreprise/entreprise.component';
import { FormEntrepriseComponent } from './dashbord/pages/entreprise/form-entreprise/form-entreprise.component';
import { NavBarFrontComponent } from './front/nav-bar-front/nav-bar-front.component';
import { LandingPageComponent } from './front/landing-page/landing-page.component';
import { HomePageComponent } from './front/home-page/home-page.component';
import { FrontComponent } from './front/front/front.component';
import { SignupComponent } from './front/signup/signup.component';

import { NgxCaptchaModule } from 'ngx-captcha';
import { DomainComponent } from './dashbord/pages/domain/domain.component';
import { DomainFormComponent } from './dashbord/pages/domain/domain-form/domain-form.component';

import { PositionComponent } from './dashbord/pages/position/position.component';
import { PositionFormComponent } from './dashbord/pages/position/position-form/position-form.component';
import { ProfileButtonComponent } from './front/nav-bar-front/profile-button/profile-button.component';
import { MessageComponent } from './front/message/message.component';
import { PostComponent } from './dashbord/pages/post/post.component';
import { PostFormComponent } from './dashbord/pages/post/post-form/post-form.component';
import { TopicComponent } from './dashbord/pages/topic/topic.component';
import { CommentComponent } from './dashbord/pages/comment/comment.component';
import { TopicPipe } from './utile/TopicPipe';
import { TopicFormComponent } from './dashbord/pages/topic/topic-form/topic-form.component';
import { CommentFormComponent } from './dashbord/pages/comment/comment-form/comment-form.component';





import { ComplaintComponent } from './dashbord/pages/complaint/complaint/complaint.component';
import { FormComplaintComponent } from './dashbord/pages/complaint/form-complaint/form-complaint/form-complaint.component';
import { ComplaintDetailsComponent } from './dashbord/pages/complaint/complaint-details/complaint-details.component';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LocationPipe,
    TopicPipe,
    NavbarComponent,
    LoginComponent,
    FormComponent,
    TripComponent,

    FormComponent,
    DetailTripComponent,
    ProgramFormComponent,
    

    UserComponent,
    UserFormComponent,
     EntrepriseComponent,
     FormEntrepriseComponent,
     NavBarFrontComponent,
     LandingPageComponent,
     HomePageComponent,
     FrontComponent,
     SignupComponent,

     DomainComponent,
     DomainFormComponent,
     PositionComponent,
     PositionFormComponent,
     ProfileButtonComponent,
     MessageComponent,
     PostComponent,
     PostFormComponent,
     TopicComponent,
     CommentComponent,
     TopicFormComponent,
     CommentFormComponent,

     ComplaintComponent,
     FormComplaintComponent,
     ComplaintDetailsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   MaterialUiModule,

   NgxCaptchaModule,

   ChartsModule,
   CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
