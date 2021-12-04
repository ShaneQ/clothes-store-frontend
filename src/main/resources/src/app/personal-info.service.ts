import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {AppService} from "./app.service";
import {Observable} from "rxjs/Observable";
import {PersonalInfo} from "./model/personalInfo";
import {UserInfo} from "./model/userInfo";

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private privateUrl = environment.resourceUrl +'/personal';

  constructor(private _service: AppService) { }

  getKeycloakUserInfo():Observable<UserInfo>{
    return this._service.getUserInfo(environment.resourceUrl+"/user/info")
  }

  getPersonalInfo():Observable<PersonalInfo>{
    return this._service.getPersonalInfo(this.privateUrl)
  }

  createPersonalInfo(personalInfo: PersonalInfo) : Observable<any> {
    return this._service.postPersonalInfoResource(personalInfo, this.privateUrl)
  }
  updatePersonalInfo(personalInfo: PersonalInfo) : Observable<any> {
    return this._service.putPersonalInfoResource(personalInfo, this.privateUrl+"/"+ personalInfo.id)
  }
}
