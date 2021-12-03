import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {ProductService} from "../../product.service";
import {NavbarService} from "../../navbar.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  providers: [AppService, ProductService],
  styleUrls: ['./navbar-landing.component.scss']
})
export class NavbarLandingComponent implements OnInit,OnDestroy{

  displayAmount: number;
  isRegistrationPage: boolean = false

  constructor(
    private _service: AppService,
    private _router: Router,
    private _keycloak: KeycloakService,
    private _dataService: ProductService,
    private _navBarService: NavbarService
  ) {

  }

  ngOnDestroy(): void {
        this._navBarService.navbarEvent.unsubscribe()
    }

  ngOnInit(): void {
      this._navBarService.navbarEvent.subscribe(data => this.sortEvents(data))

  }
  sortEvents(data){
    if(data.toString() === "REGISTRATION"){
      this.isRegistrationPage = true
    }
  }

  register(): void {
    this._keycloak.register();
  }

  logout() {
    console.log('Logged Out');
    this._keycloak.logout(environment.baseUrl);
  }
}
