import {Component} from '@angular/core';
import {AppService} from './services/app.service';
import {NavbarService} from "./services/navbar.service";
import {AuthService} from "./module-auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService],
})

export class AppComponent {


  public isLoggedIn: boolean
  public isRegistrationPage: boolean;

  constructor(
    private _service: AppService, private _authService: AuthService, private _navBarService: NavbarService) {
  }

  logout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._navBarService.navbarEvent.unsubscribe()
  }

  ngOnInit(): void {
    this.isRegistrationPage = false
    this._navBarService.navbarEvent.subscribe(data => this.sortEvents(data))

  }

  sortEvents(data) {
    if (data.toString() === "REGISTRATION") {
      this.isRegistrationPage = true
    }
  }

}
