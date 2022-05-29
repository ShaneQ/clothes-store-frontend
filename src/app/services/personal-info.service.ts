import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';
import { PersonalInfo } from '../model/personalInfo';
import { UserInfo } from '../model/userInfo';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  private privateUrl = environment.resourceUrl + 'private/personal';
  private registrationUrl = environment.resourceUrl + 'registration/personal';

  constructor(private _service: AppService) {}

  getKeycloakUserInfo(): Observable<UserInfo> {
    return this._service.getUserInfo(
      environment.resourceUrl + 'registration/user/info'
    );
  }

  getPersonalInfo(): Observable<PersonalInfo> {
    return this._service.getPersonalInfo(this.privateUrl);
  }

  createPersonalInfo(personalInfo: PersonalInfo): Observable<any> {
    return this._service.postPersonalInfoResource(
      personalInfo,
      this.registrationUrl
    );
  }
  updatePersonalInfo(personalInfo: PersonalInfo): Observable<any> {
    return this._service.putPersonalInfoResource(
      personalInfo,
      this.privateUrl+"/"
    );
  }

  hasUserRegistered() {
    return this._service.hasUserRegistered(
      environment.resourceUrl + 'registration/personal/exists'
    );
  }
  isUserRegistered() {
    let check = false;
    this.hasUserRegistered().subscribe(
      () => (check = true),
      (err) => (check = false)
    );
    return check;
  }
}
