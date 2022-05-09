import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTripComponent } from './dashbord/pages/trip/detail-trip/detail-trip.component';
import { TripComponent } from './dashbord/pages/trip/trip.component';

const routes: Routes = [{path:"trip",children:[{path:"",component:TripComponent},{path:'details/:id',component:DetailTripComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
