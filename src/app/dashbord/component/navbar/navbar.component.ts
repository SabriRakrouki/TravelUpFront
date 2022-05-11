import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';




declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "./admin",
    title: "Admin",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "./trip",
    title: "Trips",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "./domain",
    title: "Domain",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "./position",
    title: "Position",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "./entreprise",
    title: "Entreprise",
    icon: "icon-pin",
    class: "" },
    {
      path: "./employee",
      title: "Employee",
      icon: "icon-align-center",
      class: ""
    },
  {

    path: "./post",
    title: "Posts",

   

    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "./topic",
    title: "Topic",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "./comment",
    title: "Comment",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "./message",
    title: "Messages",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "./complaint",
    title: "Complaint",
    icon: "icon-align-center",
    class: ""
  }
];


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems!: any[];

ngOnInit(): void {
  this.menuItems=ROUTES.filter(menuItem=>menuItem)
}


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private tokenStorageService: TokenStorageService) {}
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href ='/admin';

  }
}
