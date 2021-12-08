import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html'
})
export class MyAccountNavbarComponent implements OnInit {

  constructor(private _keycloak: KeycloakService) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('Logged Out');
    this._keycloak.logout(environment.baseUrl);
  }

}
