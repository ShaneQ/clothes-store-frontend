import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from "../../environments/environment";
import {AuthService} from "../auth.service";
import {NavbarService} from "../navbar.service";
import {AuthTwoService} from "../../auth/service/auth-two.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [AppService]
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean
  public isRegistrationPage: boolean;

  constructor(
    private _service: AppService, private _authService: AuthTwoService, private _navBarService: NavbarService){}

  logout() {
    this._authService.logout()
  }
  ngOnDestroy(): void {
    this._navBarService.navbarEvent.unsubscribe()
  }

  ngOnInit(): void {
    console.log("NAVBAR INIT");
    this.isRegistrationPage = false
    this._navBarService.navbarEvent.subscribe(data => this.sortEvents(data))
    console.log("NAVBAR - "+this._authService.isLoggedIn());
    this._authService.isLoggedIn().then(result => this.isLoggedIn = result);
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
