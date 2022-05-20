import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  public getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  register() {
    let newLocation = window.location.href;
    if (newLocation === environment.baseUrl) {
      newLocation = environment.baseUrl + '/browser';
    }
    this.keycloakService.register({ redirectUri: newLocation }).then();
  }

  logout() {
    this.keycloakService.logout(environment.baseUrl).then();
  }
}
