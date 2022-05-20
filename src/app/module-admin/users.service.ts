import { Injectable } from '@angular/core';
import { AdminAppService } from './admin-app.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserSettings } from './model/userSettings';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private adminUrl = environment.resourceUrl + 'admin';

  constructor(private _service: AdminAppService) {}

  getUsers(): Observable<User[]> {
    return this._service.getUsersResource(this.adminUrl + '/users');
  }
  getUser(userId): Observable<User> {
    return this._service.getUserResource(this.adminUrl + '/user/' + userId);
  }

  activateUser(id: number): Observable<any> {
    return this._service.updateUserStatus(
      this.adminUrl + '/users/user/' + id + '/activate'
    );
  }

  deactivateUser(id: number) {
    return this._service.updateUserStatus(
      this.adminUrl + '/users/user/' + id + '/deactivate'
    );
  }

  updateSettings(id: number, settings: UserSettings) {
    return this._service
      .updateSettings(this.adminUrl + '/users/user/' + id, settings)
      .subscribe();
  }
}
