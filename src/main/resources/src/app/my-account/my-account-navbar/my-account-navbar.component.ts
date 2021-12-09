import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html'
})
export class MyAccountNavbarComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('Logged Out');
    this._authService.logout(environment.baseUrl);
  }

}
