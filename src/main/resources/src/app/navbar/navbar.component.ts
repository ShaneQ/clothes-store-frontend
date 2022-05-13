import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from "../../environments/environment";
import {AuthService} from "../auth.service";
import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [AppService]
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean
  public isRegistrationPage: boolean;

  constructor(
    private _service: AppService, private _authService: AuthService, private _navBarService: NavbarService){}

  logout() {
    this._authService.logout(environment.baseUrl);
  }
  ngOnDestroy(): void {
    this._navBarService.navbarEvent.unsubscribe()
  }

  ngOnInit(): void {
    this.isRegistrationPage = false
    this._navBarService.navbarEvent.subscribe(data => this.sortEvents(data))

    this._authService.loggedInEvent
    .subscribe((data: boolean) => {
      this.isLoggedIn = data
    });
  }

  login() {
    //this._authService.login()
  }

  sortEvents(data){
    if(data.toString() === "REGISTRATION"){
      this.isRegistrationPage = true
    }
  }
}
