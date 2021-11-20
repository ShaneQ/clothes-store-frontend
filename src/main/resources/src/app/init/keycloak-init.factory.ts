import { KeycloakService} from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8083/auth',
        realm: 'secondClosetClub',
        clientId: 'frontEnd'
      }
    });
}
