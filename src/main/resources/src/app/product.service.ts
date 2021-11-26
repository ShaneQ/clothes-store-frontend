import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AppService} from './app.service';
import {Product} from './model/product';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private publicUrl = environment.publicResourceUrl +'/product';
  private privateUrl = environment.resourceUrl +'/product';

  constructor(private _service: AppService) { }

  loadProducts(): Observable<Product[]>{
    return this._service.getProductsResource(this.publicUrl);

  }

  getProduct(productId): Observable<Product> {
    return this._service.getProductResource(this.privateUrl + '/' + productId);
  }
}
