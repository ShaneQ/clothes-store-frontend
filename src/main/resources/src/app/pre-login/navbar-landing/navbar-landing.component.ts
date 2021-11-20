import {Component} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  providers: [AppService, ProductService],
  styleUrls: ['./navbar-landing.component.scss']
})
export class NavbarLandingComponent {

  displayAmount: number;

  constructor(
    private _service: AppService,
    private _router: Router,
    private _keycloak: KeycloakService,
    private _dataService: ProductService
  ) {

  }

  register(): void {
    this._keycloak.register();
  }

}
