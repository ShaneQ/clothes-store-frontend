import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AppService} from './app.service';
import {Product} from './model/product';
import {environment} from "../environments/environment";
import {HttpParams} from "@angular/common/http";

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

  filterProducts(filterBySizes: string, filterByColors: string, filterBySeason: string, filterByCategory: string): Observable<Product[]>{
    let url = this.privateUrl+"/query"
    let params = new HttpParams();
    if(filterBySizes != null && filterBySizes != ''){
      params=params.set('filterBySize', filterBySizes);
    }
    if(filterByColors != null && filterByColors != ''){
      params=params.set('filterByColor', filterByColors);
    }

    if(filterBySeason != null && filterBySeason != ''){
      params=params.set('filterBySeason', filterBySeason);
    }

    if(filterByCategory != null && filterByCategory != ''){
      params=params.set('filterByCategory', filterByCategory);
    }
    return this._service.getFilteredProductResource(url, params);

  }

  getProduct(productId): Observable<Product> {
    return this._service.getProductResource(this.privateUrl + '/' + productId);
  }
}
