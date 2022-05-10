import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailTripComponent } from './dashbord/pages/trip/detail-trip/detail-trip.component';

import { NavbarComponent } from './dashbord/component/navbar/navbar.component';
import { LoginComponent } from './dashbord/login/login.component';
import { EntrepriseComponent } from './dashbord/pages/entreprise/entreprise.component';

import { TripComponent } from './dashbord/pages/trip/trip.component';
import { UserComponent } from './dashbord/pages/user/user.component';
import { FrontComponent } from './front/front/front.component';
import { HomePageComponent } from './front/home-page/home-page.component';
import { LandingPageComponent } from './front/landing-page/landing-page.component';
import { IsAuthenticatedGuardGuard } from './Service/Auth/is-authenticated-guard.guard';
import { DomainComponent } from './dashbord/pages/domain/domain.component';


const routes: Routes = [{path:"dashbord",component:NavbarComponent,canActivate:[IsAuthenticatedGuardGuard],children:[
  {path:'user',component:UserComponent},
  {path:'trip',children:[
    {path:"",component:TripComponent},
    
    {path:'details/:id',component:DetailTripComponent}]},
  {path:'entreprise',component:EntrepriseComponent},
  {path:'domain',component:DomainComponent}

]

},{
  path:"admin",component:LoginComponent},
  {path:"",redirectTo:"travelup",pathMatch:"full"},
  {path:"travelup",component:LandingPageComponent,children:[
    {path:"",component:FrontComponent},{path:"home",component:HomePageComponent}
  ]}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
