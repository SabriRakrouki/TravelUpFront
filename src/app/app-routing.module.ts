import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailTripComponent } from './dashbord/pages/trip/detail-trip/detail-trip.component';

import { NavbarComponent } from './dashbord/component/navbar/navbar.component';
import { LoginComponent } from './dashbord/login/login.component';
import { ComplaintComponent } from './dashbord/pages/complaint/complaint/complaint.component';
import { EntrepriseComponent } from './dashbord/pages/entreprise/entreprise.component';

import { TripComponent } from './dashbord/pages/trip/trip.component';
import { UserComponent } from './dashbord/pages/user/user.component';
import { FrontComponent } from './front/front/front.component';
import { HomePageComponent } from './front/home-page/home-page.component';
import { LandingPageComponent } from './front/landing-page/landing-page.component';
import { IsAuthenticatedGuardGuard } from './Service/Auth/is-authenticated-guard.guard';
import { DomainComponent } from './dashbord/pages/domain/domain.component';
import { PositionComponent } from './dashbord/pages/position/position.component';
import { MessageComponent } from './front/message/message.component';
import { PostComponent } from './dashbord/pages/post/post.component';
import { TopicComponent } from './dashbord/pages/topic/topic.component';
import { CommentComponent } from './dashbord/pages/comment/comment.component';
import { ProfileUSerComponent } from './front/profile-user/profile-user.component';
import { InvitationComponent } from './front/invitation/invitation.component';
import { TripFrontComponent } from './front/trip-front/trip-front.component';



const routes: Routes = [{
  path: "dashbord", component: NavbarComponent, children: [
    { path: 'user', component: UserComponent },
    {
      path: 'trip', children: [
        { path: "", component: TripComponent },
        { path: 'details/:id', component: DetailTripComponent }]
    },
    {path:'post',component:PostComponent},
    { path: 'entreprise', component: EntrepriseComponent },
    { path: 'domain', component: DomainComponent },
    {path:'position',component:PositionComponent},
    {path:'topic',component:TopicComponent},
    {path:'comment',component:CommentComponent},
    {path:'complaint',component:ComplaintComponent}

  ]

}, {
  path: "admin", component: LoginComponent
},
{path:"home",component:FrontComponent,children:[
  {path:'forum',component:HomePageComponent},
  {path:'message',component:MessageComponent},
  {path:'profile',component:ProfileUSerComponent},
  {path:'invite',component:InvitationComponent}
  ,{path:'trip',component:TripFrontComponent}
]},
{ path: "", redirectTo: "travelup", pathMatch: "full" },
{
  path: "travelup", component: LandingPageComponent, children: [
    { path: "", component: FrontComponent }, { path: "home", component: HomePageComponent }
  ]
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
