import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../model/product";
import {ScriptService} from "../../script.service";
import {KeycloakService} from "keycloak-angular";
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls:['content.component.scss'],
  providers: [ScriptService, ProductService]
})
export class ContentComponent implements OnInit {

  public products$: Observable<Product[]>;
  displayAmount: number;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;
  constructor(
    private _script: ScriptService,
    private _keycloak: KeycloakService,
    private _dataService: ProductService
  ){}

  ngOnInit(){
    this._script.load('flickity').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
    this.getProducts();
    console.log(this.products$)
  }
  getProducts() {
    this.products$ = this._dataService.loadProducts()
  }

  register(): void{
    this._keycloak.register();
  }
}