import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BookingRequest } from '../model/bookingRequest';
import { PersonalInfo } from '../model/personalInfo';
import { UserInfo } from '../model/userInfo';
import { throwError } from 'rxjs';
import { AuthService } from '../module-auth/auth.service';
import {NotAuthenticatedError} from "../errors/not-authenticated-error";
import {NotFoundError} from "../errors/not-found-error";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public baseUri = environment.baseUrl;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService
  ) {}

  getResource(resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get(resourceUrl, { headers })
      .catch((e: any) => this.errorHandler(e));
  }

  postBookingResource(request: BookingRequest, resourceUrl): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body = JSON.stringify(request);

    return this._http
      .post<any>(resourceUrl, body, { headers: headers })
      .catch((e: any) => this.errorHandler(e));
  }

  getPublicProductsResource(resourceUrl): Observable<Product[]> {
    let headers: HttpHeaders;
    return this._http.get<Product[]>(resourceUrl, { headers });
  }

  getPublicProductResource(resourceUrl): Observable<Product> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    });
    return this._http
      .get<Product>(resourceUrl, { headers })
      .catch((e: any) =>this.errorHandler(e));
  }

  checkCredentials(): boolean {
    return Cookie.check('access_token');
  }

  logout(): void {
    //Cookie.delete('access_token');
    this._authService.logout();
  }

  getBookingsResource(resourceUrl: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<BookingRequest[]>(resourceUrl, { headers })
      .catch((e: any) => this.errorHandler(e));
  }

  getPersonalInfo(resourceUrl: string, fromPublic:boolean): Observable<PersonalInfo> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<PersonalInfo>(resourceUrl, { headers })
      .catch((e: any) => this.errorHandler(e, fromPublic));
  }

  postPersonalInfoResource(personalInfo: PersonalInfo, privateUrl: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body = JSON.stringify(personalInfo);
    return this._http
      .post<any>(privateUrl, body, { headers: headers })
      .catch((e: any) => this.errorHandler(e));
  }

  putPersonalInfoResource(personalInfo: PersonalInfo, privateUrl: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body = JSON.stringify(personalInfo);
    return this._http
      .put<any>(privateUrl, body, { headers: headers })
      .catch((e: any) => this.errorHandler(e));
  }

  getUserInfo(url: string): Observable<UserInfo> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<UserInfo>(url, { headers })
      .catch((e: any) => this.errorHandler(e));
  }

  hasUserRegistered(url: string): Observable<any> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    return this._http
      .get<any>(url, { headers })}

  getFilteredProductResource(
    url: string,
    myparams: HttpParams
  ): Observable<Product[]> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    });
    const options = { params: myparams, headers: headers };
    console.log(myparams);
    return this._http
      .get<Product[]>(url, options)
      .catch((e: any) => this.errorHandler(e));
  }

  errorHandler(error: any, fromPublic: boolean = false):Observable<any> {
    if (error.status === 0 && !fromPublic) {
      this._authService.redirectToLogin();
      return throwError(new NotAuthenticatedError(error));
    } else if (error.status === 401  && !fromPublic) {
      this._authService.redirectToLogin();
      return throwError(new NotAuthenticatedError(error));
    } else if (error.status === 404){
      return throwError(new NotFoundError(error));
    }
  }
}
