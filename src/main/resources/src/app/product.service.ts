import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AppService} from './app.service';
import {Product} from './model/product';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = environment.publicResourceUrl +'/product';

  constructor(private _service: AppService) { }

  loadProducts(): Observable<Product[]>{
    return this._service.getProductsResource(this.productUrl);

  }

  getProduct(productId): Observable<Product> {
    return this._service.getProductResource(this.productUrl + '/' + productId);
  }
}
