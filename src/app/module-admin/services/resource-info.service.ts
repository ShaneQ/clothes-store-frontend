import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AdminAppService} from "./admin-app.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceInfoService {

  private adminUrl = environment.resourceUrl + 'admin/service-info';

  constructor(private _service: AdminAppService) {
  }

  getServiceInfo(): Observable<any> {
    return this._service.getServiceInfo(this.adminUrl + '/info');
  }
}
