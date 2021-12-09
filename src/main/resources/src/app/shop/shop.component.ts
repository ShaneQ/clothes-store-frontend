import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers:[KeycloakService]
})
export class ShopComponent implements OnInit {

  constructor(private _keycloak: KeycloakService) { }

  ngOnInit(): void {
    this._keycloak.isLoggedIn().then((data => console.log(data)))
  }

}
