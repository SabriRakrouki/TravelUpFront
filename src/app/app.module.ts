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
import { UserComponent } from './dashbord/pages/user/user.component';
import { UserFormComponent } from './dashbord/pages/user/user-form/user-form.component';
import { LoginComponent } from './dashbord/login/login.component';
import { MaterialUiModule } from './MaterialUi/material-ui.module';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LocationPipe,
    NavbarComponent,
    LoginComponent,
    FormComponent,TripComponent,UserComponent,UserFormComponent

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
   MaterialUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
