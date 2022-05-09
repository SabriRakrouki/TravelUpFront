import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './dashbord/component/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TripComponent } from './dashbord/pages/trip/trip.component';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog';
import { FormComponent } from './dashbord/pages/trip/form/form.component'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocationPipe } from './utile/LocationPipe';
import {MatCardModule} from '@angular/material/card'; 
import { DetailTripComponent } from './dashbord/pages/trip/detail-trip/detail-trip.component';
import { ProgramFormComponent } from './dashbord/pages/trip/detail-trip/program-form/program-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LocationPipe,
    NavbarComponent,
    TripComponent,
    FormComponent,
    DetailTripComponent,
    ProgramFormComponent,
    
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    
    MatRadioModule,
    HttpClientModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,MatPaginatorModule,MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
