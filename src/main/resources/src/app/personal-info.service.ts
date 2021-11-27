import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {AppService} from "./app.service";
import {Observable} from "rxjs/Observable";
import {PersonalInfo} from "./model/personalInfo";

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private privateUrl = environment.resourceUrl +'/personal';

  constructor(private _service: AppService) { }

  getPersonalInfo():Observable<PersonalInfo>{
    return this._service.getPersonalInfo(this.privateUrl)
  }

  createPersonalInfo(personalInfo: PersonalInfo) : Observable<any> {
    return this._service.postPersonalInfoResource(personalInfo, this.privateUrl)
  }
  updatePersonalInfo(personalInfo: PersonalInfo) : Observable<any> {
    return this._service.postPersonalInfoResource(personalInfo, this.privateUrl+"/"+ personalInfo.id)
  }
}
