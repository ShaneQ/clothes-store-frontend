import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://ec2-34-242-16-133.eu-west-1.compute.amazonaws.com:8083/auth/',
  realm: 'secondClosetClub',
  clientId: 'frontEnd'
};

export const environment = {
  production: true,
  assets: {
    dotaImages: 'https://cdn-keycloak-angular.herokuapp.com/assets/images/dota-heroes/'
  },
  keycloakConfig,
  resourceUrl: 'http://ec2-34-242-16-133.eu-west-1.compute.amazonaws.com:8084/resource-server/api/public',
  baseUrl: 'http://secondclosetclub.s3-website-eu-west-1.amazonaws.com/'
};
