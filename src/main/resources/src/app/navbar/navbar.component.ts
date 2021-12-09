import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from "../../environments/environment";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [AppService]
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean
  public isRegistrationPage: boolean;

  constructor(
    private _service: AppService, private _authService: AuthService){}

  logout() {
    this._authService.logout(environment.baseUrl);
  }

  ngOnInit(): void {
    this.isRegistrationPage = false
    this._authService.loggedInEvent
    .subscribe((data: boolean) => {
      this.isLoggedIn = data
    });
  }

  login() {
    this._authService.login()
  }
}
