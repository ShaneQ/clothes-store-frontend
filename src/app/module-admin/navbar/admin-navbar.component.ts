import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  providers: [AppService]
})
export class AdminNavbarComponent implements OnInit {


  constructor(
    private _service: AppService, private _keycloak: KeycloakService){}

  logout() {
    console.log('Logged Out');
    this._keycloak.logout(environment.baseUrl);
  }

  ngOnInit(): void {
  }
}
