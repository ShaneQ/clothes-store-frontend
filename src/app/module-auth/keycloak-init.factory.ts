import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.authUrl,
        realm: 'secondClosetClub',
        clientId: 'frontEnd',
      },
      initOptions: {
        onLoad: 'check-sso'
      },
    });
}
