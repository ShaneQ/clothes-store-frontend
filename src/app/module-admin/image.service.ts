import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {AdminAppService} from "./admin-app.service";
import {Observable} from "rxjs";
import {HttpEvent, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageUrl = environment.resourceUrl +'admin/image';

  constructor(private _service: AdminAppService) { }

  addImage(formData: FormData): Observable<any>{
    return this._service.postImageResource(formData, this.imageUrl)
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    return this._service.pushFileToStorage(file, this.imageUrl)
  }
}
