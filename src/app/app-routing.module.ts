import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './dashbord/component/navbar/navbar.component';
import { LoginComponent } from './dashbord/login/login.component';
import { EntrepriseComponent } from './dashbord/pages/entreprise/entreprise.component';
import { TripComponent } from './dashbord/pages/trip/trip.component';
import { UserComponent } from './dashbord/pages/user/user.component';

const routes: Routes = [{path:"dashbord",component:NavbarComponent,children:[
  {path:'user',component:UserComponent},
  {path:'trip',component:TripComponent},
  {path:'entreprise',component:EntrepriseComponent}

]

},{
  path:"admin",component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
