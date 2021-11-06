import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {ProductService} from "../../product.service";
import {Observable} from "rxjs";
import {Product} from "../../model/product";

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  providers: [AppService, ProductService],
  styleUrls: ['./navbar-landing.component.scss']
})
export class NavbarLandingComponent implements OnInit {
  public products$: Observable<Product[]>;
  productCount: number;

  displayAmount: number;

  constructor(
    private _service: AppService,
    private _router: Router,
    private _keycloak: KeycloakService,
    private _dataService: ProductService
  ) {
    this.productCount = 0;
    if (!this.displayAmount) {
      this.displayAmount = 10;
    }
  }

  register(): void {
    this._keycloak.register();
  }

  getProducts() {
    this.products$ = this._dataService.loadProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
