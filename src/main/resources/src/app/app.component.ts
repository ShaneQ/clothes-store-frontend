import {Component} from '@angular/core';
import {AppService} from './app.service';
import {AuthService} from "./auth.service";
import {NavbarService} from "./navbar.service";
import {environment} from "../environments/environment";
import {AuthTwoService} from "../auth/service/auth-two.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService],
})

export class AppComponent {


  public isLoggedIn: boolean
  public isRegistrationPage: boolean;

  constructor(
    private _service: AppService, private _authService: AuthTwoService, private _navBarService: NavbarService){}

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

  sortEvents(data){
    if(data.toString() === "REGISTRATION"){
      this.isRegistrationPage = true
    }
  }

}
