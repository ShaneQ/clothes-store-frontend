import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Product} from './model/product';
import {Router} from '@angular/router';
import {environment} from "../environments/environment";
import {BookingRequest} from "./model/bookingRequest";
import {PersonalInfo} from "./model/personalInfo";

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class AppService {
  public clientId = "frontEnd";
  public redirectUri = environment.baseUrl + '/loading';
  public baseUri = environment.baseUrl

  constructor(
    private _http: HttpClient,
    private _router: Router){}

  retrieveToken(code){
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'newClientSecret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code', code);

    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this._http.post('http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token', params.toString(), { headers })
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')
      );
  }

  saveToken(token){
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    this._router.navigate(['/base/home']);
  }

  getResource(resourceUrl): Observable<any>{
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    return this._http.get(resourceUrl, { headers })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postBookingResource(request :BookingRequest, resourceUrl) : Observable<any>{
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body=JSON.stringify(request);

    return this._http.post<any>(resourceUrl, body,{ 'headers': headers });
  }

  getProductsResource(resourceUrl): Observable<Product[]>{
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    return this._http.get<Product[]>(resourceUrl, { headers })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProductResource(resourceUrl): Observable<Product>{
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    return this._http.get<Product>(resourceUrl, { headers })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  checkCredentials(): boolean{
    return Cookie.check('access_token');
  }

  logout(): void {
    Cookie.delete('access_token');
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    window.location.href = this.baseUri;
  }

  getBookingsResource(resourceUrl: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    return this._http.get<BookingRequest[]>(resourceUrl, { headers })
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPersonalInfo(resourceUrl: string):Observable<PersonalInfo> {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    return this._http.get<PersonalInfo>(resourceUrl, { headers })
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postPersonalInfoResource(personalInfo: PersonalInfo, privateUrl: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body=JSON.stringify(personalInfo);
    let observable = this._http.post<any>(privateUrl, body,{ 'headers': headers });
    observable.subscribe(data => console.log(data))
    return observable
  }

  putPersonalInfoResource(personalInfo: PersonalInfo, privateUrl: string) {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Cookie.get('access_token'),
    });
    const body=JSON.stringify(personalInfo);
    let observable = this._http.put<any>(privateUrl, body,{ 'headers': headers });
    observable.subscribe(data => console.log(data))
    return observable
  }
}
