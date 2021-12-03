import {Component, OnInit} from '@angular/core';
import {ScriptService} from '../../script.service';
import {KeycloakService} from 'keycloak-angular';
import {Observable} from "rxjs";
import {Product} from "../../model/product";
import {ProductService} from "../../product.service";

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ProductService]
})
export class LandingComponent implements OnInit {
  displayAmount: number;
  noWrap = true;
  constructor(
    private _keycloak: KeycloakService,
    private _dataService: ProductService
    ){}

  ngOnInit(){

  }

  register(): void{
    this._keycloak.register();
  }
}
