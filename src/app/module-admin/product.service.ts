import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAppService } from './admin-app.service';
import { Product } from './model/product';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = environment.resourceUrl + 'public/product';
  private adminProductUrl = environment.resourceUrl + 'admin/product';

  constructor(private _service: AdminAppService) {}

  loadProducts(): Observable<Product[]> {
    return this._service.getProductsResource(this.productUrl);
  }

  createProduct(product: Product): Observable<any> {
    return this._service.postProductResource(product, this.adminProductUrl);
  }

  updateProduct(product: Product): Observable<any> {
    return this._service.putProductResource(product, this.adminProductUrl);
  }

  getProduct(productId): Observable<Product> {
    return this._service.getProductResource(this.productUrl + '/' + productId);
  }

  hide(productId: number): Observable<any> {
    return this._service.putProductHideChangeResource(
      this.adminProductUrl + '/hide/' + productId
    );
  }

  unhide(productId: number): Observable<any> {
    return this._service.putProductHideChangeResource(
      this.adminProductUrl + '/unhide/' + productId
    );
  }

  delete(productId: number): Observable<any> {
    return this._service.deleteProductResource(
      this.adminProductUrl + '/' + productId
    );
  }

  filterProducts(
    filterBySizes: string,
    filterByColors: string,
    filterBySeason: string,
    filterByCategory: string,
    filterByName: string
  ): Observable<Product[]> {
    let url = this.productUrl + '/query';
    let params = new HttpParams();
    if (filterBySizes != null && filterBySizes != '') {
      params = params.set('filterBySize', filterBySizes);
    }
    if (filterByColors != null && filterByColors != '') {
      params = params.set('filterByColor', filterByColors);
    }

    if (filterBySeason != null && filterBySeason != '') {
      params = params.set('filterBySeason', filterBySeason);
    }

    if (filterByCategory != null && filterByCategory != '') {
      params = params.set('filterByCategory', filterByCategory);
    }
    if (filterByName != null && filterByName != '') {
      params = params.set('filterByName', filterByName);
    }
    return this._service.getFilteredProductResource(url, params);
  }

  findInventory() {
    return this._service.getInventoryResource(
      this.adminProductUrl + '/inventory'
    );
  }

  updateInventoryStatus(value, id: number, productId: number) {
    this._service.updateInventoryStatus(
      this.adminProductUrl + '/' + productId + '/inventory/' + id + '/' + value
    );
  }
}
