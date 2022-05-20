import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Product } from './model/product';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from './model/user';
import { BookingRequest } from './model/bookingRequest';
import { UserSettings } from './model/userSettings';
import { Inventory } from './model/inventory';

@Injectable()
export class AdminAppService {
  public redirectUri = environment.baseUrl + '/loading';
  public baseUri = environment.baseUrl;

  constructor(private _http: HttpClient, private _router: Router) {}

  getResource(resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  getProductsResource(resourceUrl): Observable<Product[]> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<Product[]>(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  postProductResource(product: Product, resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body = JSON.stringify(product);

    return this._http.post<any>(resourceUrl, body, { headers: headers });
  }

  postImageResource(formData: FormData, resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });

    return this._http.post<any>(resourceUrl, formData, { headers: headers });
  }

  pushFileToStorage(file: File, resourceUrl): Observable<HttpEvent<{}>> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', resourceUrl, data, {
      headers: headers,
      reportProgress: true,
      responseType: 'text',
    });
    return this._http.request(newRequest);
  }

  putProductResource(product: Product, resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body = JSON.stringify(product);

    return this._http.put<any>(resourceUrl, body, { headers: headers });
  }

  getProductResource(resourceUrl): Observable<Product> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<Product>(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  getUsersResource(resourceUrl): Observable<User[]> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<User[]>(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  getBookingsResource(resourceUrl): Observable<BookingRequest[]> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<BookingRequest[]>(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  updateBookingStatus(resourceUrl) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    this._http
      .post<any>(resourceUrl, {}, { headers: headers })
      .subscribe((event) => {});
  }

  getUserResource(resourceUrl): Observable<User> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<User>(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  deleteProductResource(resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http.delete(resourceUrl, { headers });
  }

  putProductHideChangeResource(resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });

    return this._http.put(resourceUrl, { headers });
  }

  checkCredentials(): boolean {
    return Cookie.check('access_token');
  }

  logout(): void {
    Cookie.delete('access_token');
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    window.location.href = this.baseUri;
  }

  updateUserStatus(resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });

    return this._http.put(resourceUrl, { headers });
  }

  getFilteredProductResource(
    url: string,
    myparams: HttpParams
  ): Observable<Product[]> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    });
    const options = { params: myparams, headers: headers };
    return this._http
      .get<Product[]>(url, options)
      .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  errorHandler(error: any): void {
    if (error.status === 0) {
      console.log('SHOULD I LOG OUT');
    } else if (error.status === 404) {
    } else {
      console.log(error);
    }
  }

  deactivateUser(resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });

    return this._http.put(resourceUrl, { headers });
  }

  updateSettings(resourceUrl: string, settings: UserSettings) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body = JSON.stringify(settings);

    return this._http.put<any>(resourceUrl, body, { headers: headers });
  }

  getInventoryResource(resourceUrl: string): Observable<Inventory[]> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<Inventory[]>(resourceUrl, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  updateInventoryStatus(resourceUrl) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    this._http
      .post<any>(resourceUrl, {}, { headers: headers })
      .subscribe((event) => {});
  }
}
