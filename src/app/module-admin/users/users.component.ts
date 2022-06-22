import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UsersService} from '../services/users.service';
import {memberships} from "../../model/arrays";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UsersService],
})
export class UsersComponent implements OnInit {
  memberships = memberships;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts;
  public users: User[];

  constructor(private _service: UsersService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      order: [[0, 'des']]
    };
    this._service.getUsers().subscribe((data) => (this.users = data));
  }

  activate(id: number) {
    this._service
    .activateUser(id)
    .subscribe(() =>
      this._service.getUsers().subscribe((data) => (this.users = data))
    );
  }

  updateUserSettings(id: number) {
    this._service
    .deactivateUser(id)
    .subscribe(() =>
      this._service.getUsers().subscribe((data) => (this.users = data))
    );
  }
}
